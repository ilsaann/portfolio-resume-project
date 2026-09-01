import Link from 'next/link';
import Typography from '@mui/material/Typography';
import styles from '../styles/Projects.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PROJECTS = [
  {
    key: 'janes-guild',
    title: "Jane's Guild",
    description:
      'An online gallery for local artists and makers — build an about-me page, a photo gallery, and an interactive resume, then point customers to where to find you in person.',
    meta: 'In development',
    href: '/guild',
    external: false,
  },
  {
    key: 'rolling-stoners',
    title: 'Rolling Stoners',
    description:
      'A run/walk club site with event scheduling, calendar exports, member sign-in, and an admin panel for posting events, workouts, and photos.',
    meta: 'View site',
    href: 'https://rolling-stoners.vercel.app',
    external: true,
  },
];

export default function ProjectsPage() {
  return (
    <div className={styles.projectsContainer}>
      <Header activeSection="projects" />
      <div className={styles.projects}>
        <Typography variant="h4" className={styles.heading} sx={{ fontFamily: 'var(--font-italiana), serif !important', fontWeight: 600 }}>
          Projects
        </Typography>
        <div className={styles.cardGrid}>
          {PROJECTS.map((project) => (
            <Link
              key={project.key}
              href={project.href}
              className={`${styles.projectCard} glowOnHover`}
              {...(project.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Typography variant="h6" className={styles.projectTitle}>
                {project.title}
              </Typography>
              <Typography variant="body2" className={styles.projectDescription}>
                {project.description}
              </Typography>
              <span className={styles.projectMeta}>{project.meta}</span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
