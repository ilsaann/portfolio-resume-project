'use client'
import React from 'react'
import {Button, Divider } from '@mui/material'

// welcome modal that pops up on initial load 
// if user isn't signed in
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


