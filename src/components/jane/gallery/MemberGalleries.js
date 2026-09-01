'use client';

import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import Gallery from './Gallery';
import CreateNewGalleryForm from './CreateNewGalleryForm';
import { graphqlRequest } from '../../../lib/graphqlClient';
import styles from '../../../app/styles/MemberProfile.module.css';

const ADD_PHOTO = `
  mutation AddPhoto($galleryId: ID!, $filename: String!, $filepath: String!) {
    addPhotoToGallery(galleryId: $galleryId, filename: $filename, filepath: $filepath) {
      id
    }
  }
`;

const REMOVE_PHOTO = `
  mutation RemovePhoto($galleryId: ID!, $photoId: ID!) {
    removePhotoFromGallery(galleryId: $galleryId, photoId: $photoId) {
      id
    }
  }
`;

export default function MemberGalleries({ galleries, memberTheme, isOwner }) {
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreated = () => {
    setShowForm(false);
    // Re-run the server component's data fetch so the change shows up
    // without a full page reload.
    router.refresh();
  };

  const handleAddPhoto = async (galleryId, file) => {
    setBusy(true);
    setError('');
    try {
      const uploadForm = new FormData();
      uploadForm.append('file', file);
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
      });
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDeletePhoto = async (galleryId, photoId) => {
    setBusy(true);
    setError('');
    try {
      await graphqlRequest(REMOVE_PHOTO, { galleryId, photoId });
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Stack spacing={3} className={styles.galleriesSection}>
      {error && <p className={styles.emptyState}>{error}</p>}

      {galleries.length === 0 && !showForm && (
        <p className={styles.emptyState}>
          {isOwner ? "You haven't published any galleries yet." : 'No published galleries yet.'}
        </p>
      )}

      {galleries.map((gallery) => (
        <Gallery
          key={gallery.id}
          galleryTitle={gallery.title}
          galleryImages={(gallery.photos || []).map((p) => ({ img: p.filepath, caption: p.caption, id: p.id }))}
          themeOption={gallery.theme || memberTheme}
          editable={isOwner}
          onAddPhoto={(file) => handleAddPhoto(gallery.id, file)}
          onDeleteImage={(item) => handleDeletePhoto(gallery.id, item.id)}
        />
      ))}

      {isOwner && !showForm && (
        <Button className={styles.createButton} variant="contained" onClick={() => setShowForm(true)} disabled={busy}>
          + Create Gallery
        </Button>
      )}

      {isOwner && showForm && (
        <CreateNewGalleryForm onCreated={handleCreated} />
      )}
    </Stack>
  );
}
