import React from 'react';
import styles from '../app/styles/Footer.module.css';
import MailOutlineTwoToneIcon from '@mui/icons-material/MailOutlineTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';


export default function Footer() {
  return (
    <div className={styles.footer}>
      {/* Row 1: heading */}
      <div className={styles.heading}>
        <h2 >Contact Me</h2>
      </div>

      {/* Row 2: email + LinkedIn */}
      <div className={styles.contactRow}>
        <p className={styles.email}>
          <MailOutlineTwoToneIcon sx={{margin: '4px 8px'}}/>
          <a href="mailto:hamptonilsa96@gmail.com">
              {`hamptonilsa96@gmail.com`}
          </a>
        </p>
        <p className={styles.linkedin}>
            <AccountCircleTwoToneIcon sx={{margin: '4px 8px'}}/>
          <a
            href="https://linkedin.com/in/iarhampton"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>

      {/* Row 3: education */}
      <div className={styles.education}>
        <p>
          <a
            href="https://galvanize.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Galvanize: Operation Level-Up Graduate
          </a>
        </p>
      </div>
    </div>
  );
}

