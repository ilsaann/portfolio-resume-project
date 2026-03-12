import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header"
import styles from "./page.module.css";



// This landing is going to be displayed when the About section is displayed
export default function Home() {
  return (

    <div className={styles.page}>
      <Header activeSection="about" />
      <main className={styles.main}>
        {/* Paper with intro text */}
        <section className={styles.paper}>
          <div className={styles.introText}>
            <p>
                I'm an Artist, Army Veteran, and Software Engineer.
            </p>
            <p>
                I built this tool to share the various projects I am working on and am
              working towards creating the space for others to do the same.
            </p>
            <p>
                Thank you for visiting!
            </p>
          </div>
        </section>

        {/* Footer at bottom */}
        <Footer className={styles.footer} />
      </main>
    </div>
  );
}


