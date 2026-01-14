import express from 'express';
import { body, validationResult } from 'express-validator';
import Gig from '../models/Gig.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateGig = [
  body('title').trim().notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('budget').isNumeric().withMessage('Budget must be a number')
    .isFloat({ min: 0 }).withMessage('Budget must be a positive number'),
];

// GET /api/gigs - Fetch all open gigs with optional search
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = { status: 'open' };

    // Add text search if search query provided
    if (search && search.trim()) {
      query.$text = { $search: search.trim() };
    }

    const gigs = await Gig.find(query)
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: gigs.length,
      gigs,
    });
  } catch (error) {
    console.error('Get gigs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gigs',
      error: error.message,
    });
  }
});

// POST /api/gigs - Create new job post (authenticated users only)
router.post('/', auth, validateGig, async (req, res) => {
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

    const { title, description, budget } = req.body;

    // Create new gig
    const gig = new Gig({
      title,
      description,
      budget,
      ownerId: req.user._id,
    });

    await gig.save();

    // Populate owner info
    await gig.populate('ownerId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Gig created successfully',
      gig,
    });
  } catch (error) {
    console.error('Create gig error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create gig',
      error: error.message,
    });
  }
});

// GET /api/gigs/my-gigs - Get all gigs posted by authenticated user
router.get('/my-gigs', auth, async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: gigs.length,
      gigs,
    });
  } catch (error) {
    console.error('Get my gigs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your gigs',
      error: error.message,
    });
  }
});

// GET /api/gigs/:id - Get single gig details
router.get('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate('ownerId', 'name email');

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found',
      });
    }

    res.json({
      success: true,
      gig,
    });
  } catch (error) {
    console.error('Get gig error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gig',
      error: error.message,
    });
  }
});

export default router;
