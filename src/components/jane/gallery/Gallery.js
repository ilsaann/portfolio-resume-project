// screenshot and scrape protection on "published" Galleries

// properties:
    // Gallery Title: string

    // Gallery Images: array of objects [{img:url, caption: string}]

    // CaptionsOn: Switch for Captions on or off: title bar props MUI

    // GalleryImages: the gallery img list 
     
    // galleryVariant: options from MUI: Standard (default), Quilted (variant: 'quilted'), Woven, Masonry
    
    // themeOption: Theme options x3 and Light and Dark modes:
        //Dark Acadamia clean and stars more blue

        //Turtle browns with forest greens

        //Jane more explore vibe but dark more green/blue


// if edit switch is on in this view, 
//      you can delete img + caption pair by selecting,
//       can edit photo with click + upload different photo,

// optional location tag for where their creative offerings are
// this displays once then regular connoisseur view of their jane
// but with edit switch
// with edit mode editable sections are given a gold highlight
// we want save all changes button and/or autosave if not too costly
//      when pushed it toggles edit switch off

'use client';

import React, { useMemo, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Gallery.module.css';

export default function Gallery({
  galleryTitle,
  galleryImages = [],
  captionsOn = true,
  themeOption = 'jane',
  themeMode = 'dark',
  galleryVariant = 'masonry',
  editable = false,
  onDeleteImage,
  onReplaceImage,
  onAddPhoto,
}) {
  const [editing, setEditing] = useState(false);
  const fileInputId = `add-photo-${React.useId()}`;

  const handleAddPhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) onAddPhoto?.(file);
    event.target.value = '';
  };

  const themeClass = useMemo(() => {
    if (themeOption === 'turtle') return styles.themeTurtle;
    if (themeOption === 'academia') return styles.themeAcademia;
    return styles.themeJane;
  }, [themeOption]);

  return (
    <section className={`${styles.galleryShell} ${themeClass} ${themeMode === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>{galleryTitle}</h2>
        {editable && (
          <div className={styles.headerActions}>
            {editing && onAddPhoto && (
              <>
                <input
                  id={fileInputId}
                  type="file"
                  accept="image/*"
                  onChange={handleAddPhotoChange}
                  hidden
                />
                <label htmlFor={fileInputId} className={styles.editToggle}>
                  + Add Photo
                </label>
              </>
            )}
            <button className={styles.editToggle} onClick={() => setEditing(v => !v)}>
              {editing ? 'Done' : 'Edit'}
            </button>
          </div>
        )}
      </div>

      <ImageList variant={galleryVariant} cols={galleryVariant === 'standard' ? 3 : 0} gap={12} sx={{ m: 0 }}>
        {galleryImages.map((item) => (
          <ImageListItem key={item.img} className={editing ? styles.editItem : ''}>
            <img
              src={item.img}
              alt={item.caption || galleryTitle}
              loading="lazy"
            />

            {captionsOn && (
              <ImageListItemBar
                title={item.caption}
                position="bottom"
              />
            )}

            {editing && (
              <div className={styles.editActions}>
                <IconButton onClick={() => onReplaceImage?.(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDeleteImage?.(item)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </section>
  );
}
