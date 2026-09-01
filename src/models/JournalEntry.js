import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mood: {
      type: String,
      enum: ['happy', 'sad', 'neutral', 'excited', 'anxious', 'calm'],
    },
    tags: [String],
    isPrivate: {
      type: Boolean,
      default: true,
    },
    entryDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const JournalEntry = mongoose.models.JournalEntry || mongoose.model('JournalEntry', journalEntrySchema);
