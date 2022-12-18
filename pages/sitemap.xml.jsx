import glob from "glob";
import { GET_POSTS } from "@/helpers/queries/posts";
import client from "../apollo-client";

const Sitemap = () => {
  return null;
};

const getSiteTitle = async (context) => {
  const result = await client.query({
    query: GET_POSTS,
    variables: {
      filter: "Education",
    },
  });

  return { data: result };
};

export const getServerSideProps = async ({ res, context }) => {
  const BASE_URL = process.env.BASE_URL;

  let data = null;

  const response = await getSiteTitle(context); // any async promise here.
  data = response?.data?.data?.getPosts;

  let postPaths;

  if (data) {
    postPaths = data.map((post) => {
      return `${BASE_URL}/${post.section.toLowerCase()}${post.slug}`;
    });
  }

  const pagesDir = "pages/**/*.tsx";
  let pagesPaths = await glob.sync(pagesDir);

  pagesPaths = pagesPaths
    .filter((path) => !path.includes("["))
    .filter((path) => !path.includes("/_"))
    .filter((path) => !path.includes("404"));

  const dynamicPaths = [`${BASE_URL}/newsfeed`, `${BASE_URL}/user/[id]`];

  const allPaths = [...pagesPaths, ...postPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/1" xmlns:news="http://www.google.com/schemas/sitemap-news/1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <script/>

  <url>
  <loc>https://hodl-watch.vercel.app/</loc>
  <lastmod>2022-12-18T21:49:11.415Z</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
  </url>

  <url>
  <loc>https://hodl-watch.vercel.app/news</loc>
  <lastmod>2022-12-18T21:49:11.415Z</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
  </url>

  <url>
  <loc>https://hodl-watch.vercel.app/education</loc>
  <lastmod>2022-12-18T21:49:11.415Z</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
  </url>


  ${allPaths
    .map((url) => {
      return `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
      `;
    })
    .join("")}

    </urlset>
   
    `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
