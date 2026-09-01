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

//get project title from project menu

export default function ProjectsHeader({ title }) {
  return (
    <Box className={header}>
       <Avatar 
        className={logo}
        src="/janes-guild-logo-removebg.png" 
        alt="Jane's Guild"
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
            href="/"
            className={link}
            underline="none"
          >
            About Creator
          </Link>
           </Breadcrumbs>
           <Divider orientation="vertical" variant="middle" flexItem />
        <ProjectMenu />
         </div>
         
    </Box>
  )
}

    