'use client';

import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import Gallery from './Gallery';
import CreateNewGalleryForm from './CreateNewGalleryForm';
import styles from '../../../app/styles/MemberProfile.module.css';

export default function MemberGalleries({ galleries, memberTheme, isOwner }) {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleCreated = () => {
    setShowForm(false);
    // Re-run the server component's data fetch so the new gallery shows up
    // without a full page reload.
    router.refresh();
  };

  return (
    <Stack spacing={3} className={styles.galleriesSection}>
      {galleries.length === 0 && !showForm && (
        <p className={styles.emptyState}>
          {isOwner ? "You haven't published any galleries yet." : 'No published galleries yet.'}
        </p>
      )}

      {galleries.map((gallery) => (
        <Gallery
          key={gallery.id}
          galleryTitle={gallery.title}
          galleryImages={(gallery.photos || []).map((p) => ({ img: p.filepath, caption: p.caption }))}
          themeOption={gallery.theme || memberTheme}
          editable={false}
        />
      ))}

      {isOwner && !showForm && (
        <Button className={styles.createButton} variant="contained" onClick={() => setShowForm(true)}>
          + Create Gallery
        </Button>
      )}

      {isOwner && showForm && (
        <CreateNewGalleryForm onCreated={handleCreated} />
      )}
    </Stack>
  );
}
