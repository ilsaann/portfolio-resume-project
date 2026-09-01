import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  caption: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    photos: [photoSchema],
    theme: {
      type: String,
      enum: ['minimal', 'dark', 'vibrant', 'classic', 'modern'],
      default: 'modern',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    photoCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

export const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
