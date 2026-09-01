// BUG: 'use-client' (hyphen) is not the Next.js client-component directive -
// it should be 'use client'. Not currently harmful since nothing here needs
// client-side interactivity, but will silently fail to opt into the client
// boundary the moment this file needs useState/onClick/etc.
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

    // dead: leftover placeholder, never finished
    // const renderAbout
  return (
    <div className={body}>
      <ProjectsHeader title="Jane's Guild" />
      {/* WIREFRAME: every section below is a literal placeholder <div> with
          plain-English text as its content, not real markup/components yet.
          Kept as-is intentionally as a content outline - see backlog for
          the real components each one needs (featured-artwork carousel,
          about blurb, auth-gated custom-about, join CTAs, map). */}
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
