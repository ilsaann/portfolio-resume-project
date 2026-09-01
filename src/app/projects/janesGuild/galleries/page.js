// Browse/search across every published gallery in the Guild - separate
// from an individual member's About Me page (which shows just their own
// galleries). Links out to the artist's page since there's no standalone
// single-gallery route yet.
import { connectDB } from '../../../../lib/db.js';
import { Gallery } from '../../../../models/Gallery.js';
import ProjectsHeader from '../../../../components/ProjectsHeader';
import Footer from '../../../../components/Footer';
import GuildGalleriesBrowser from '../../../../components/jane/gallery/GuildGalleriesBrowser';
import styles from '../../../styles/GuildGalleries.module.css';

export default async function GuildGalleriesPage() {
  await connectDB();

  const docs = await Gallery.find({ isPublished: true })
    .populate('artist', 'name profilePicture image')
    .sort({ createdAt: -1 })
    .lean();

  const galleries = docs
    .filter((g) => g.artist)
    .map((g) => ({
      id: g._id.toString(),
      title: g.title,
      location: g.location,
      coverImage: g.photos?.[0]?.filepath || null,
      artistId: g.artist._id.toString(),
      artistName: g.artist.name || 'Guild Member',
    }));

  return (
    <div className={styles.page}>
      <ProjectsHeader
        title="Guild Galleries"
        aboutHref="/projects/janesGuild"
        aboutLabel="Jane's Guild"
      />
      <main className={styles.main}>
        <GuildGalleriesBrowser galleries={galleries} />
      </main>
      <Footer />
    </div>
  );
}
