'use-client'

import React from 'react'
import ProjectsHeader from './../../../components/ProjectsHeader'
import Footer from './../../../components/Footer'
import styles from './../../styles/JanesGuild.module.css'
import {Divider} from '@mui/material';

// For Janes Guild page check headers for role,
// Admin Dashboard if Admin available
// Browse Galleries -guild's galleries or My galleries if guild
// Browse Guild  -guild's about pages 

export default function page() {

    const { body, janeMain }= styles;

    // const renderAbout
  return (
    <div className={body}>
      <ProjectsHeader title="Jane's Guild" />
      <div className={janeMain}>
        <div>banner of featured artwork scrolling</div>
        <div>glass of description of Jane and the Guild if no one signed in</div>
        <div>if signed in serve custom about</div>
        <div>call to actions to join as a connoisseur or join guild</div>
        <Divider orientation="horizontal" />
        <div>Maybe sooner rather than later a map</div>
      </div>
      <Footer />
    </div>
  )
}
