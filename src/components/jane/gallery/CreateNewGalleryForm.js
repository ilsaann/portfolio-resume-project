// Gallery creation form - wired to the real createGallery/addPhotoToGallery
// GraphQL mutations and /api/upload (see handleSubmit below).
'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Switch,
  MenuItem,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Stack,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { graphqlRequest } from '../../../lib/graphqlClient';

const MAX_IMAGES = 6;

export default function CreateNewGallery({ onCreated }) {
  const [formData, setFormData] = useState({
    galleryTitle: '',
    description: '',
    location: '',
    captionsOn: true,
    themeOption: 'jane',
    galleryVariant: 'masonry',
    images: [],
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const CREATE_GALLERY = `
    mutation CreateGallery($title: String!, $description: String, $location: String, $photoCount: Int!, $theme: Theme) {
      createGallery(title: $title, description: $description, location: $location, photoCount: $photoCount, theme: $theme) {
        id
      }
    }
  `;

  const ADD_PHOTO = `
    mutation AddPhoto($galleryId: ID!, $filename: String!, $filepath: String!, $caption: String) {
      addPhotoToGallery(galleryId: $galleryId, filename: $filename, filepath: $filepath, caption: $caption) {
        id
      }
    }
  `;

  const PUBLISH_GALLERY = `
    mutation PublishGallery($id: ID!) {
      publishGallery(id: $id) {
        id
        isPublished
      }
    }
  `;

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const { createGallery } = await graphqlRequest(CREATE_GALLERY, {
        title: formData.galleryTitle,
        description: formData.description,
        location: formData.location || null,
        photoCount: formData.images.length,
        theme: formData.themeOption,
      });
      const galleryId = createGallery.id;

      for (const img of formData.images) {
        const uploadForm = new FormData();
        uploadForm.append('file', img.file);
        uploadForm.append('galleryId', galleryId);

        const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadForm });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadJson.error || 'Image upload failed');
        }

        await graphqlRequest(ADD_PHOTO, {
          galleryId,
          filename: uploadJson.filename,
          filepath: uploadJson.filepath,
          caption: img.caption || null,
        });
      }

      await graphqlRequest(PUBLISH_GALLERY, { id: galleryId });

      formData.images.forEach((img) => {
        if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
      });

      onCreated?.(galleryId);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'var(--font-italiana), serif' }}>
        Create Gallery
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Gallery Title"
          value={formData.galleryTitle}
          onChange={(e) => setFormData(prev => ({ ...prev, galleryTitle: e.target.value }))}
          fullWidth
        />

        <TextField
          label="Description (optional)"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          fullWidth
          multiline
          minRows={2}
        />

        <TextField
          label="Location (optional)"
          helperText="Where can customers show up in person to see or buy this work?"
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
          disabled={!formData.galleryTitle.trim() || formData.images.length === 0 || submitting}
          startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : null}
        >
          {submitting ? 'Creating...' : 'Create Gallery'}
        </Button>
      </Stack>
    </Box>
  );
}