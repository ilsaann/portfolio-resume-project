'use client';
import React, { useState } from 'react';
import { Avatar, Button, Divider, Menu, MenuList, MenuItem} from '@mui/material'
import styles from "./../app/styles/ProjectMenu.module.css"
import { useRouter } from 'next/navigation';

// we will have them toggle themes in the menu
// mode switch in menu too
export default function ProjectMenu() {
  const router = useRouter();
  // dead: `menu` doesn't exist in ProjectMenu.module.css (only inside a
  // commented-out block there) - resolves to undefined, so
  // className={menu} below has no effect. The popup's background is set
  // entirely via the inline sx props instead.
  const { menuButton, menu } = styles;
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleJaneClicked = () => {
    // navigate to jane page
    handleClose();
    router.push('/projects/janesGuild');
  }

  const handleRollingStonersClicked = () => {
    handleClose();
    window.open('https://rolling-stoners.vercel.app', '_blank', 'noopener,noreferrer');
  }


  // if Signed In this changes to ProfileAvatar labeled profile
  //    when clicked modal pops up where you can edit first name , last name
  //    if role is guildMember then can edit theme
  
  return (<>
   <Button 
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      className={menuButton}
      sx={{ textTransform: 'none', lineHeight: '1.5' }}
    >
    Projects
   </Button>
    <Menu
       id="basic-menu"
       disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
        list: {
            'aria-labelledby': 'basic-button',
            sx: {
              backgroundColor: 'rgba(230, 210, 247, 0.85)',
            },
          },
          paper: {
            sx: {
              backgroundColor: 'rgba(230, 210, 247, 0.85)',
            },
          },
        }}
        className={menu}
    >
        {/* TODO: no onClick - doesn't route to /login (or anywhere) yet */}
        <MenuItem >
        <Avatar />
        <Button >
            Sign Up/ Login
        </Button>
        </MenuItem>
    <Divider orientation="horizontal" />
    <MenuItem
      onClick={handleJaneClicked}
    >
      <Avatar src="/janes-guild-logo-removebg.png" /> Jane's Guild
    </MenuItem>
    <MenuItem
      onClick={handleRollingStonersClicked}
    >
      <Avatar>RS</Avatar> Rolling Stoners
    </MenuItem>
    </Menu>
  </>
   
  )
}
