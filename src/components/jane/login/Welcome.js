'use client'
import React from 'react'
import {Button, Divider } from '@mui/material'

// welcome modal that pops up on initial load
// if user isn't signed in
//
// BUG: `welcomeContent` below is never imported/declared - there's no
// `styles` import in this file at all. This throws
// "welcomeContent is not defined" if this component is ever rendered.
// Currently not imported anywhere, so it's a latent bug, not a live one.
// The three buttons (Connoisseur/Guild Member/Sign Up) also have no
// onClick handlers yet.
export default function Welcome() {
  return (
    <div className={welcomeContent}>
        <h1>Welcome</h1>
        <Button>Connoisseur</Button>
        <Button>Guild Member</Button>
        <Divider />
        <Button>Sign Up</Button>
    </div>
  )
}


