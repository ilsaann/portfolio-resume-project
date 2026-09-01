// this is to be the form to fill out to create the gallery,
// select for mui gallery image list type: with skeletons
// we will need to be able to upload up to 6 images
// we will want to show previews with editable captions
// switch for captions off or on, that remains editable to the 
    //builder
// gallery summary intake for now just render below the gallery 
    // however maybe edit position in the future

// gallery page theme, auto align to the theme of the 'About Me'
// we need a location chip for where someone could show up to (auto fill from profile if available)
// obtain creative service


//
// NOTE: not imported/rendered by any page yet - orphaned from the UI for now.
'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const MAX_IMAGES = 6;

// Admin demo data - delete this when real backend exists
const ADMIN_DEMO = {
  galleryTitle: "Jane's Guild Showcase",
  location: "Atlanta, GA",
  captionsOn: true,
  themeOption: "jane",
  galleryVariant: "masonry",
  images: [
    { previewUrl: "https://via.placeholder.com/400x600/1a3c47/230ad2?text=Drawing+1", caption: "Jane's first showcase drawing" },
    { previewUrl: "https://via.placeholder.com/600x400/1a3c47/230ad2?text=Drawing+2", caption: "Second drawing preview" },
    { previewUrl: "https://via.placeholder.com/400x600/1a3c47/230ad2?text=Drawing+3", caption: "Third drawing preview" },
  ],
};

export default function CreateNewGallery({ isAdmin = false }) {
  const [formData, setFormData] = useState(isAdmin ? ADMIN_DEMO : {
    galleryTitle: '',
    location: '',
    captionsOn: true,
    themeOption: 'jane',
    galleryVariant: 'masonry',
    images: [],
  });
  const [error, setError] = useState('');

  const handleFiles = (event) => {
    const files = Array.from(event.target.files || []);
    const available = MAX_IMAGES - formData.images.length;

    if (files.length > available) {
      setError(`Only ${available} more image(s) allowed.`);
      return;
    }

    // NOTE: local preview only (createObjectURL) - files are never actually
    // uploaded anywhere (no Cloudinary/S3/Supabase Storage/etc).
    const newImages = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      caption: '',
    }));

    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    setError('');
  };

  const removeImage = (index) => {
    const img = formData.images[index];
    if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    console.log('Create gallery:', formData);
    // TODO: POST to backend
    alert('Gallery created! (demo)');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'var(--font-italiana), serif' }}>
        {isAdmin ? 'Admin Gallery Creator' : 'Create Gallery'}
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Gallery Title"
          value={formData.galleryTitle}
          onChange={(e) => setFormData(prev => ({ ...prev, galleryTitle: e.target.value }))}
          fullWidth
        />

        <TextField
          label="Location (optional)"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          fullWidth
        />

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>Captions:</Typography>
            <Switch
              checked={formData.captionsOn}
              onChange={(e) => setFormData(prev => ({ ...prev, captionsOn: e.target.checked }))}
            />
          </Stack>

          <TextField
            select
            label="Theme"
            value={formData.themeOption}
            onChange={(e) => setFormData(prev => ({ ...prev, themeOption: e.target.value }))}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="jane">Jane</MenuItem>
            <MenuItem value="academia">Dark Academia</MenuItem>
            <MenuItem value="turtle">Turtle</MenuItem>
          </TextField>

          <TextField
            select
            label="Layout"
            value={formData.galleryVariant}
            onChange={(e) => setFormData(prev => ({ ...prev, galleryVariant: e.target.value }))}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="masonry">Masonry</MenuItem>
            <MenuItem value="quilted">Quilted</MenuItem>
            <MenuItem value="woven">Woven</MenuItem>
          </TextField>
        </Stack>

        <div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            hidden
          />
          <label htmlFor="image-upload">
            <Button variant="outlined" component="span" startIcon={<AddPhotoAlternateIcon />}>
              {formData.images.length === 0 ? 'Add Images' : `Add More Images (${MAX_IMAGES - formData.images.length} left)`}
            </Button>
          </label>
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </div>

        {formData.images.length > 0 && (
          <ImageList
            variant={formData.galleryVariant}
            cols={formData.galleryVariant === 'standard' ? 3 : 0}
            gap={8}
            sx={{ m: 0 }}
          >
            {formData.images.map((img, index) => (
              <ImageListItem key={img.previewUrl || index}>
                <img
                  src={img.previewUrl}
                  alt=""
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
                <ImageListItemBar
                  title={
                    <TextField
                      value={img.caption}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[index].caption = e.target.value;
                        setFormData(prev => ({ ...prev, images: newImages }));
                      }}
                      placeholder="Caption"
                      size="small"
                      fullWidth
                    />
                  }
                  actionIcon={
                    <IconButton onClick={() => removeImage(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}

        <Box sx={{ p: 2, border: '1px solid rgba(230, 210, 247, 0.3)', borderRadius: 2 }}>
          <Typography variant="h6">Preview</Typography>
          <Typography>Title: {formData.galleryTitle || 'Untitled'}</Typography>
          <Typography>Location: {formData.location || 'None'}</Typography>
          <Typography>Images: {formData.images.length}/{MAX_IMAGES}</Typography>
          <Typography>Captions: {formData.captionsOn ? 'On' : 'Off'}</Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={!formData.galleryTitle.trim() || formData.images.length === 0}
        >
          Create Gallery
        </Button>
      </Stack>
    </Box>
  );
}