'use client';
import React from 'react';
import { 
  Box, 
  Breadcrumbs, 
  Link, 
  Avatar,
  Typography 
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Image from 'next/image';
import styles from '../app/styles/Header.module.css';

//TODO: lets have my name center here same style I think and make the paper larger 

export default function Header({ activeSection = 'about' }) {
  return (
    <Box className={styles.header}>
      {/* Profile picture - top left */}
      <Avatar 
        className={styles.profilePic}
        alt="Ilsa Hampton"
        src="/ilsaProfPic.png" // replace with your image path
      >
        IH
      </Avatar>

      <h1 className={styles.nameHeading}>
          <span className={styles.nameText}>Ilsa Hampton</span>
        </h1>

      {/* Menu - top right */}
      <Box className={styles.menuContainer}>
        <Breadcrumbs 
          className={styles.breadcrumbs}
          separator={<NavigateNextIcon sx={{ fontSize: 16, color: 'inherit' }} />}
          aria-label="page navigation"
          sx={{fontFamily: 'var(--font-italiana), serif !important' }}
        >
          <Link 
            href="/"
            className={`${styles.menuLink} ${
              activeSection === 'about' ? styles.active : ''
            }`}
            underline="none"
          >
            About
          </Link>
          <Link 
            href="/resume"
            className={`${styles.menuLink} ${
              activeSection === 'resume' ? styles.active : ''
            }`}
            underline="none"
          >
            Resume
          </Link>
          <Link 
            href="#"
            className={styles.menuLink}
            underline="none"
          >
            Projects
          </Link>
        </Breadcrumbs>
      </Box>
    </Box>
  );
}

