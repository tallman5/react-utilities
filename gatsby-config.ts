import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    description: 'Reusable components and scripts.',
    siteName: 'example.com',
    siteUrl: `http://localhost:8000`,
    title: `Utilities Test Site`,
  },
  graphqlTypegen: true,
  plugins: [
  ]
};

export default config;
