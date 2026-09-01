// Real "About Me" page for a Guild member - [slug] is the Mongo _id for
// now (see TODO backlog: switch to a chosen username/slug later). Reuses
// the same InteractiveResume/Card/Gallery/ProjectsHeader/Footer components
// as Ilsa's own site, driven by this member's own data instead of
// hardcoded content.
import { notFound } from 'next/navigation';
import Typography from '@mui/material/Typography';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../api/auth/[...nextauth]/route.js';
import { connectDB } from '../../../../../lib/db.js';
import { User } from '../../../../../models/User.js';
import { Gallery } from '../../../../../models/Gallery.js';
import ProjectsHeader from '../../../../../components/ProjectsHeader';
import Footer from '../../../../../components/Footer';
import InteractiveResume from '../../../../../components/InteractiveResume';
import MemberGalleries from '../../../../../components/jane/gallery/MemberGalleries';
import styles from '../../../../styles/MemberProfile.module.css';

export default async function MemberPage({ params }) {
  const { slug } = await params;

  await connectDB();

  let member = null;
  try {
    member = await User.findById(slug).lean();
  } catch {
    // invalid ObjectId format
    member = null;
  }

  if (!member || !member.isApproved) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const isOwner = session?.user?.id === member._id.toString();

  const galleryDocs = await Gallery.find(
    isOwner ? { artist: member._id } : { artist: member._id, isPublished: true }
  ).lean();
  const galleries = galleryDocs.map((g) => ({
    id: g._id.toString(),
    title: g.title,
    description: g.description,
    location: g.location,
    theme: g.theme,
    photos: (g.photos || []).map((p) => ({ id: p._id.toString(), filepath: p.filepath, caption: p.caption })),
  }));

  return (
    <div className={styles.page} data-theme={member.theme}>
      <ProjectsHeader
        title={member.name || 'Guild Member'}
        // NextAuth's adapter stores the Google avatar under `image`, not
        // our own `profilePicture` field - .lean() returns raw stored
        // fields regardless of schema, so this picks either up. Once a
        // member sets a custom profilePicture via updateProfile, that
        // takes precedence.
        avatarSrc={member.profilePicture || member.image || undefined}
        avatarAlt={member.name || 'Guild Member'}
        aboutHref="/projects/janesGuild"
        aboutLabel="Jane's Guild"
      />
      <main className={styles.main}>
        {member.bio && (
          <section className={styles.paper}>
            <Typography variant="h4" className={styles.name}>
              {member.name || 'Guild Member'}
            </Typography>
            <p className={styles.bio}>{member.bio}</p>
          </section>
        )}

        {(member.skills?.length > 0 || member.experience?.length > 0) && (
          <InteractiveResume skills={member.skills || []} experience={member.experience || []} />
        )}

        <MemberGalleries
          galleries={galleries}
          memberTheme={member.theme}
          isOwner={isOwner}
        />
      </main>
      <Footer
        heading={`Contact ${member.name || 'this member'}`}
        email={member.email}
        linkedin={null}
        extraLink={null}
      />
    </div>
  );
}
