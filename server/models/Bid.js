import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required: [true, 'Gig ID is required'],
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Freelancer ID is required'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  bidAmount: {
    type: Number,
    required: [true, 'Bid amount is required'],
    min: [0, 'Bid amount must be a positive number'],
  },
  status: {
    type: String,
    enum: ['pending', 'hired', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

// Compound index to prevent duplicate bids from same freelancer on same gig
bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;
