'use client';
import React from 'react';
import { 
  Avatar,  
  Box, 
  Breadcrumbs, 
  Divider,
  Link, 
  Typography,
  
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styles from '../app/styles/ProjectsHeader.module.css';
import ProjectMenu from './ProjectMenu';

const { logo, header, title: headerTitle, link, breadMenu, projMenu } = styles;

// Reused for any /projects/* page - the Jane's Guild landing page and
// login page use the defaults (Guild logo, "About Creator" link to the
// site root); member About Me pages pass their own avatar/name/link so
// this same header works for both without duplicating it.
export default function ProjectsHeader({
  title,
  avatarSrc = '/janes-guild-logo-removebg.png',
  avatarAlt = "Jane's Guild",
  aboutHref = '/',
  aboutLabel = 'About Creator',
}) {
  return (
    <Box className={header}>
       <Avatar
        className={logo}
        src={avatarSrc}
        alt={avatarAlt}
        sx={{
    '& .MuiAvatar-img': {
      objectFit: 'cover !important',
      objectPosition: 'center !important'
    }
  }}
        />
         <h1 className={headerTitle}>{title}</h1>
         {/* breadcumbs and menu together in div all the way right */}
         <div className={breadMenu}>
            <Breadcrumbs 
          className={styles.breadcrumbs}
          separator={<NavigateNextIcon sx={{ fontSize: 16, color: 'inherit' }} />}
          aria-label="page navigation"
          sx={{fontFamily: 'var(--font-italiana), serif !important' }}
        >
            <Link
            href={aboutHref}
            className={link}
            underline="none"
          >
            {aboutLabel}
          </Link>
           </Breadcrumbs>
           <Divider orientation="vertical" variant="middle" flexItem />
        <ProjectMenu />
         </div>
         
    </Box>
  )
}

    