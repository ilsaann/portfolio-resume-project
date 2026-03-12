// For now this is "you"; later it can be any user profile

export const profile = {
  username: "ilsa",
  displayName: "Ilsa Hampton",
  bio: "Software engineer & former Army paramedic, building interactive portfolios.",
  sections: [
    {
      id: "experience",
      title: "Experience",
      layout: "cards",
      items: [
        {
          id: "army-paramedic",
          type: "experience",
          title: "Army Paramedic (Airborne Infantry)",
          period: "2017–2022",
          description: "High-pressure emergency care, leadership, and training.",
          media: [],
        },
        {
          id: "mfgx-fuuz",
          type: "experience",
          title: "Level 2 Software Engineer – MFGx (Fuuz)",
          period: "2022–2025",
          description:
            "UI/UX and security for low/no-code application designer.",
          media: [
            {
              id: "fuuz-ui-screenshot",
              type: "image",
              title: "Fuuz UI mock",
              src: "/images/fuuz-ui.png", // later Cloudinary URLs
            },
          ],
        },
      ],
    },
  ],
};
