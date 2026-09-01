"use client";

import { signIn } from "next-auth/react";
import {useState} from "react";
import { Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Divider, 
  FormControlLabel, 
  FormGroup, 
  TextField, 
  Typography,
  Checkbox } from "@mui/material";
import styles from "../styles/Login.module.css"
import ProjectsHeader from './../../components/ProjectsHeader.js'


const darkTextSx ={
 color:' rgb(54, 12, 27)',
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: 1.8,
}

const accordionSx = {
    maxWidth: '700px',
    fontFamily: 'var(--font-italiana), serif !important', 
    background:'#96b1b8f2',
    margin: 0,
    borderRadius: '10px',
};

const accordionDetailsSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px',
}

const accordionTypographySx = {
   fontFamily: 'var(--font-italiana), serif !important',
    fontWeight: 600, 
    color: 'rgba(91, 64, 116, 0.85)', 
    WebkitTextStroke: '.5px rgba(192, 174, 211, 0.95)', 
    paintOrder: 'stroke fill',
    fontSize: { xs: '14px', sm: '16px' },           // responsive sizing
    padding: '4px 8px',
}

export default function LoginPage() {
  const { page, intro, signIn, signInButton, signUp} = styles;
  const [joinAsMember, setJoinAsMember] = useState(false);

  const handleJoinChanged = () => {
    setJoinAsMember(!joinAsMember)
  }

  return (
    <div className={page}>
      <ProjectsHeader title="Jane's Guild" />
      
    <div className={signIn}> 
        <div className={intro}>
          <h1>Ahhh... A Connoisseur I see...</h1>
            <p>
              Fill in the following information 
              to browse the guild and
              engage with the creative community
              </p>
            <p>
              <strong>
                {'Join the Guild ' }
              </strong>
               to create a personalized 'About Me' page, galleries, and more </p>
        </div>

      <Accordion defaultExpanded sx={accordionSx}>
        <AccordionSummary >
          <Typography sx={accordionTypographySx}> Already Joined?</Typography>
        </AccordionSummary>
          <AccordionDetails sx={accordionDetailsSx}>
            <h1>Sign In: </h1>
             <button onClick={() => signIn("google")} className={signInButton}>
              Sign in with Google
            </button>
        </AccordionDetails>
      </Accordion>
      <Divider orientation='horizontal' />
      <div className={signUp}>

         <FormGroup>
          <TextField variant="standard" label="First Name"></TextField>
          <TextField variant="standard" label="Last Name"></TextField>
           <TextField variant="standard" label="Email"></TextField>
             <FormControlLabel control={<Checkbox checked={joinAsMember}
               onChange={handleJoinChanged}/>} label="Join As Member?" />
          {joinAsMember && 
          <>
          <TextField variant="standard" label="Invite Code"/>
          </>
          }
         
      </FormGroup>
      <Divider orientation='horizontal' />
      <h1>Sign In</h1>
       <button onClick={() => signIn("google")}>
      Sign in with Google
    </button>
      </div>
     </div>
    </div>
   
  );
}
