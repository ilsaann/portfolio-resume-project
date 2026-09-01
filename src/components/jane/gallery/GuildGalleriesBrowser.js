'use client';

import React, { useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import Link from 'next/link';
import styles from '../../../app/styles/GuildGalleries.module.css';

export default function GuildGalleriesBrowser({ galleries }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return galleries;
    return galleries.filter((g) =>
      [g.title, g.artistName, g.location].some((field) => field?.toLowerCase().includes(q))
    );
  }, [galleries, query]);

  return (
    <>
      <div className={styles.searchRow}>
        <TextField
          fullWidth
          label="Search by title, artist, or location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.emptyState}>
          {galleries.length === 0 ? 'No published galleries yet.' : 'No galleries match your search.'}
        </p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((gallery) => (
            <Link
              key={gallery.id}
              href={`/projects/janesGuild/member/${gallery.artistId}`}
              className={`${styles.card} glowOnHoverDeep`}
            >
              {gallery.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className={styles.coverImage} src={gallery.coverImage} alt={gallery.title} />
              )}
              <div className={styles.cardBody}>
                <h3 className={styles.galleryTitle}>{gallery.title}</h3>
                <p className={styles.artistName}>by {gallery.artistName}</p>
                {gallery.location && <p className={styles.location}>📍 {gallery.location}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
