import React from 'react';
import styles from '../app/styles/Footer.module.css';
import MailOutlineTwoToneIcon from '@mui/icons-material/MailOutlineTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

// Props default to Ilsa's own contact info so the existing / and /resume
// pages render unchanged - member About Me pages pass their own email/
// linkedin/extraLink instead.
export default function Footer({
  heading = 'Contact Me',
  email = 'hamptonilsa96@gmail.com',
  linkedin = 'https://linkedin.com/in/iarhampton',
  extraLink = { label: 'Galvanize: Operation Level-Up Graduate', href: 'https://galvanize.com' },
}) {
  return (
    <div className={styles.footer}>
      {/* Row 1: heading */}
      <div className={styles.heading}>
        <h2>{heading}</h2>
      </div>

      {/* Row 2: email + LinkedIn */}
      <div className={styles.contactRow}>
        {email && (
          <p className={styles.email}>
            <MailOutlineTwoToneIcon sx={{margin: '4px 8px'}}/>
            <a href={`mailto:${email}`}>
                {email}
            </a>
          </p>
        )}
        {linkedin && (
          <p className={styles.linkedin}>
              <AccountCircleTwoToneIcon sx={{margin: '4px 8px'}}/>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        )}
      </div>

      {/* Row 3: extra link (education, portfolio, etc.) */}
      {extraLink?.href && (
        <div className={styles.education}>
          <p>
            <a
              href={extraLink.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {extraLink.label}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
