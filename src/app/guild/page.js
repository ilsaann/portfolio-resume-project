import Typography from '@mui/material/Typography';
import styles from '../styles/Guild.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function GuildPage() {
  return (
    <div className={styles.page}>
      <Header activeSection="projects" />
      <main className={styles.main}>
        <section className={styles.paper}>
          <span className={styles.badge}>In development</span>
          <Typography variant="h4" className={styles.title}>
            Jane&apos;s Guild
          </Typography>
          <p>
            Jane&apos;s Guild is a home for local artists and makers to build
            their own about-me page, photo gallery, and interactive resume —
            an online storefront that points customers to where to find you
            and support your work in person.
          </p>
          <p>
            Members will be able to join, get approved, and customize their
            page with a handful of themes. Need something more than the
            built-in options? Custom page work is available on commission.
          </p>
          <p>
            This page is the front door for the Guild while it&apos;s being
            built — member sign-up, galleries, and Stripe/map integration are
            in progress.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
