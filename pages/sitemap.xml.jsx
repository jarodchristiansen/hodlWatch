import { GET_POSTS } from "@/helpers/queries/posts";
import client from "../apollo-client";
import * as fs from "fs";

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

  //   const response = await getSiteTitle(context); // any async promise here.

  //   data = response?.data?.data?.getPosts;

  //   let postPaths;

  //   if (data) {
  //     postPaths = data.map((post) => {
  //       return `${BASE_URL}/${post.section.toLowerCase()}${post.slug}`;
  //     });
  //   }

  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "sitemap.xml.jsx",
        "404.js",
        "auth.jsx",
        "_app.js",
        "_document.jsx",
        "api",
        "index.tsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${BASE_URL}/${staticPagePath.replace(".js", "")}`;
    });

  const dynamicPaths = [...postPaths];

  const allPaths = [...staticPaths, ...dynamicPaths];

  // const staticPaths = fs
  //   .readdirSync("pages")
  //   .filter((staticPage) => {
  //     return ![
  //       "api",
  //       "product",
  //       "_app.js",
  //       "_document.js",
  //       "404.js",
  //       "sitemap.xml.js",
  //     ].includes(staticPage);
  //   })
  //   .map((staticPagePath) => {
  //     return `${BASE_URL}/${staticPagePath}`;
  //   });

  //   let query1 = await Post.find({});

  //   let postPaths = query1.map((post) => {
  //     return `${BASE_URL}/${post.section.toLowerCase()}${post.slug}`;
  //   });

  //   console.log({ postPaths });

  //   const pagesDir = "pages/**/*.tsx";
  //   let pagesPaths = await glob.sync(pagesDir);

  //   pagesPaths = pagesPaths
  //     .filter((path) => {
  //       console.log({ path });

  //       return ![
  //         "sitemap.xml.jsx",
  //         "404.js",
  //         "auth.jsx",
  //         "_app.js",
  //         "_document.jsx",
  //         "api",
  //         // "index.tsx",
  //         // "pages/education/[...slug].tsx",
  //       ].includes(path);
  //     })
  //     .map((staticPagePath) => {
  //       return `${BASE_URL}/${staticPagePath.replace(".js" && "/index.tsx", "")}`;
  //     });

  //   //   pagesPaths = pagesPaths
  //   //     .filter((path) => !path.includes("["))
  //   //     .filter((path) => !path.includes("/_"))
  //   //     .filter((path) => !path.includes("404"));

  //   const dynamicPaths = [...postPaths];

  //   const allPaths = [...pagesPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/1" xmlns:news="http://www.google.com/schemas/sitemap-news/1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <script/>
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
  //   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  //   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/1" xmlns:news="http://www.google.com/schemas/sitemap-news/1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  //   <script/>
  //   <url>
  //   <loc>https://hodl-watch.vercel.app/</loc>
  //   <changefreq>monthly</changefreq>
  //   <priority>1.0</priority>
  //   </url>

  //   <url>
  //   <loc>https://hodl-watch.vercel.app/news</loc>
  //   <changefreq>monthly</changefreq>
  //   <priority>1.0</priority>
  //   </url>
  //   <url>
  //   <loc>https://hodl-watch.vercel.app/education</loc>
  //   <changefreq>monthly</changefreq>
  //   <priority>1.0</priority>
  //   </url>
  //   <url>
  //   <loc>https://hodl-watch.vercel.app/education/fibonacci-retracement-indicator</loc>
  //   <changefreq>monthly</changefreq>
  //   <priority>1.0</priority>
  //   </url>
  //   <url>
  //   <loc>https://hodl-watch.vercel.app/education/what-is-bitcoin</loc>
  //   <changefreq>monthly</changefreq>
  //   <priority>1.0</priority>
  //   </url>
  //   </urlset>

  //   `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
