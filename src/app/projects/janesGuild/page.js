import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route.js'
import ProjectsHeader from './../../../components/ProjectsHeader'
import Footer from './../../../components/Footer'
import styles from './../../styles/JanesGuild.module.css'
import {Divider} from '@mui/material';

// For Janes Guild page check headers for role,
// Admin Dashboard if Admin available
// Browse Galleries -guild's galleries or My galleries if guild
// Browse Guild  -guild's about pages

export default async function page() {

    const { body, janeMain }= styles;
    const session = await getServerSession(authOptions);

  return (
    <div className={body}>
      <ProjectsHeader title="Jane's Guild" />
      {/* WIREFRAME: the banner/map sections below are still literal
          placeholder <divs> - see backlog. The signed-in-state and join
          CTAs are now real links instead of placeholder text. */}
      <div className={janeMain}>
        <div>banner of featured artwork scrolling</div>
        <div>glass of description of Jane and the Guild if no one signed in</div>
        {session?.user?.id ? (
          <div>
            <Link href={`/projects/janesGuild/member/${session.user.id}`} className="glowOnHover">
              {session.user.isApproved ? 'Go to my About Me page' : 'View my (pending approval) About Me page'}
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/login" className="glowOnHover">Join as a connoisseur or join the guild</Link>
          </div>
        )}
        <Divider orientation="horizontal" />
        <div>Maybe sooner rather than later a map</div>
      </div>
      <Footer />
    </div>
  )
}
