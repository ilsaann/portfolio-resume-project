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
    // Where customers could show up locally to purchase/support the
    // artist - the core "online gallery that informs customers where to
    // show up" idea behind Jane's Guild in the first place.
    location: String,
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    photos: [photoSchema],
    // Optional per-gallery override - when unset, the frontend falls back
    // to the artist's own User.theme (galleries "auto align to the theme
    // of the About Me" page by default).
    theme: {
      type: String,
      enum: ['jane', 'academia', 'turtle'],
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
