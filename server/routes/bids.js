import express from 'express';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Bid from '../models/Bid.js';
import Gig from '../models/Gig.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateBid = [
  body('gigId').notEmpty().withMessage('Gig ID is required')
    .isMongoId().withMessage('Invalid Gig ID'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('bidAmount').isNumeric().withMessage('Bid amount must be a number')
    .isFloat({ min: 0 }).withMessage('Bid amount must be a positive number'),
];

// POST /api/bids - Submit a bid for a gig (authenticated freelancers only)
router.post('/', auth, validateBid, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { gigId, message, bidAmount } = req.body;

    // Check if gig exists and is open
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found',
      });
    }

    if (gig.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'This gig is no longer accepting bids',
      });
    }

    // Prevent bidding on own gigs
    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot bid on your own gig',
      });
    }

    // Create new bid
    const bid = new Bid({
      gigId,
      freelancerId: req.user._id,
      message,
      bidAmount,
    });

    await bid.save();

    // Populate references
    await bid.populate([
      { path: 'freelancerId', select: 'name email' },
      { path: 'gigId', select: 'title budget status' },
    ]);

    res.status(201).json({
      success: true,
      message: 'Bid submitted successfully',
      bid,
    });
  } catch (error) {
    console.error('Submit bid error:', error);
    
    // Handle duplicate bid error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a bid for this gig',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit bid',
      error: error.message,
    });
  }
});

// GET /api/bids/:gigId - Get all bids for a specific gig (owner only)
router.get('/:gigId', auth, async (req, res) => {
  try {
    const { gigId } = req.params;

    // Check if gig exists and user is the owner
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found',
      });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view bids for this gig',
      });
    }

    // Get all bids for this gig
    const bids = await Bid.find({ gigId })
      .populate('freelancerId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bids.length,
      bids,
    });
  } catch (error) {
    console.error('Get bids error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bids',
      error: error.message,
    });
  }
});

// GET /api/bids/my-bids/all - Get all bids made by authenticated user
router.get('/my-bids/all', auth, async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user._id })
      .populate('gigId', 'title budget status')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bids.length,
      bids,
    });
  } catch (error) {
    console.error('Get my bids error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your bids',
      error: error.message,
    });
  }
});

// PATCH /api/bids/:bidId/hire - The "Hire" logic (Atomic update)
router.patch('/:bidId/hire', auth, async (req, res) => {
  const session = await mongoose.startSession();
  
  try {
    await session.startTransaction();

    const { bidId } = req.params;

    // Find the bid with session
    const bid = await Bid.findById(bidId)
      .populate('gigId')
      .session(session);

    if (!bid) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Bid not found',
      });
    }

    const gig = bid.gigId;

    // Verify user is the gig owner
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to hire for this gig',
      });
    }

    // Check if gig is still open
    if (gig.status !== 'open') {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'This gig is no longer open for hiring',
      });
    }

    // ATOMIC OPERATIONS:
    // 1. Update the chosen bid status to 'hired'
    bid.status = 'hired';
    await bid.save({ session });

    // 2. Update gig status to 'assigned'
    gig.status = 'assigned';
    await gig.save({ session });

    // 3. Update all other bids for this gig to 'rejected'
    await Bid.updateMany(
      {
        gigId: gig._id,
        _id: { $ne: bid._id }, // Exclude the hired bid
        status: 'pending', // Only update pending bids
      },
      {
        $set: { status: 'rejected' },
      },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();

    // Populate the bid for response
    await bid.populate('freelancerId', 'name email');

    res.json({
      success: true,
      message: 'Freelancer hired successfully',
      bid,
      gig: {
        id: gig._id,
        title: gig.title,
        status: gig.status,
      },
    });
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    console.error('Hire bid error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to hire freelancer',
      error: error.message,
    });
  } finally {
    session.endSession();
  }
});

export default router;
