import React from 'react';
import styles from '../styles/Resume.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InteractiveResume from '../../components/InteractiveResume';

const SkillsObjects = [
  { id: 'frontend', label: 'Frontend', content: 'React, Redux, HTML, CSS, JavaScript, TypeScript, Next.js, Material UI, Ramda, Lodash' },
  { id: 'backend', label: 'Backend', content: 'Node.js, Express, GraphQL, SQL, PostgreSQL, MongoDB' },
  { id: 'devtools', label: 'Developer Tools', content: 'Git, Docker, Azure, Atlassian Suite, Visual Studio Code, pnpm, npm' },
  { id: 'core', label: 'Core', content: 'Adaptability and Resilience, Communication and Collaboration, Training and Mentoring, Leadership and Team Management, Attention to Detail and Problem Solving' },
];

const ExperienceObjects = [
    {
      title: 'UI/UX Platform Software Engineer',
      company: 'MFGx',
      dates: '2022-2026',
      summary: 'As a software engineer at MFGx, I was responsible for developing features and maintainging the platform Fuuz using React, Javascript, Typescript , and GraphQL. I collaborated with cross-functional teams to design and implement new features, optimize performance, and ensure the scalability of our applications. I also contributed to code reviews, participated in agile ceremonies, and mentored junior developers.',
      bullets: [
        "Applied competencies as a UI/UX Full Stack Engineer in React.js, JavaScript, TypeScript, Redux, GraphQL, MongoDB, Docker, and Git to improve Fuuz's low/no-code solution for building responsive screens and applications",
        "Refactored and developed backend code using GraphQL, MongoDB, TypeScript, and JavaScript to implement CRUD operations in the platform, ensuring seamless integration with frontend features",
        "Developed a configurable Time Series chart and added 5 different configurable Gauge charts that are rendered as a configurable screen element using React, Javascript, Typescript, and Fusion Charts",
        "Led collaboration across cross-functional teams to ensure a cohesive and intuitive user experience, delivering impactful features, bug fixes, and optimizations promptly",
        "Utilized Microsoft Teams for clear communication and leveraged the Atlassian tool suite to enhance productivity and maintain agile methodologies",
        "Volunteered for an extra role on the Security team, where I audited packages for reported vulnerabilities used in the frontend and their impact on the platform"
        ],
        media: [{
        image: '/timeSeriesConfigurationScreen.png', // image url
        title: 'Coding',
        tag: '',
        caption: '',
        },
        {
        image: '/timeSeriesChartPreview.png',
        title: 'Coding',
        tag: '',
        caption: 'preview of the time series chart configuration screen and rendered chart',
        }
    ]
    }, {
      title: 'Software Engineering Immersive Resident',
      company: 'Galvanize',
      dates: '2022-2023',
      summary: 'As a software engineering immersive resident at Galvanize, I facilitated the learning and development of 30 students in a rigorous software engineering program. I provided mentorship, guidance, and support to help students succeed in their coursework and projects. I also collaborated with instructors and staff to create a positive and inclusive learning environment.',
      bullets: [
        "Facilitated adult learning by tutoring, guiding, and mentoring a class of 30 students in full-stack application development with JavaScript, HTML, CSS, and SQL in over 12 different projects and weekly assignments",
        "Provided direct assistance in troubleshooting local environments (Windows, MAC OS,, Linux, and Virtual Machines), code errors, and other technical challenges, while fostering a supportive learning environment",
        ],
      media: [{
        image: '', // image url
        title: 'Coding',
        tag: '',
        caption: '',
        },]
    }, {
        title: 'Medical Team Lead',
        company: 'United States Army',
        dates: '2017-2022',
        summary: 'As a medical team lead in the United States Army, I was responsible for managing, instructing, and leading teams of medical professionals. I ensured the delivery of high-quality medical care to soldiers, while maintaining compliance with safety standards and protocols.',
        bullets: [
            "Created educational material, curriculum, and tests to standardize training  and readiness for medics, successfully training over 60 medics within the organization",
            "Treatment  Team Leader, instructed and mentored a team of 5 while facilitating communication to ensure quality care and the safe transfer of patients",
            "Fort Bragg Medical Simulation Training Center Instructor, instructed over 24 cycles of courses ranging from 3 days to 2 weeks, credentialed 300 medical professionals ",
        ],
          media: [
            {
        image: '/instructordMSTC.png', // image url
        title: 'Mdical Simulation Training Instructor',
        tag: '',
        caption: 'teaching a prolonged field care course to advanced medical teams',
        },
        {
        image: '/bloodTraining.png', // image url
        title: 'Medical Training',
        tag: '',
        caption: 'practicing blood trasnfusions, taking a liter from a donor and giving it back to the individual',
        },
    ]
    },
];

export default function Page() {
  return (
    <div className={styles.resumeContainer}>
      <Header activeSection="resume" />
      <div className={styles.resume}>
        <InteractiveResume skills={SkillsObjects} experience={ExperienceObjects} />
      </div>
      <Footer />
    </div>
  );
}
