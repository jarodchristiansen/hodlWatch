import Post from "../../db/models/post";
import * as fs from "fs";

export default async function handler(request, response) {
  const BASE_URL = process.env.BASE_URL;

  let query1 = await Post.find({});

  let postPaths = query1.map((post) => {
    return `${BASE_URL}/${post.section.toLowerCase()}${post.slug}`;
  });

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

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/1" xmlns:news="http://www.google.com/schemas/sitemap-news/1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      <script/>
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
      </urlset>
       
      `;

  //   response.setHeader("Content-Type", "text/xml");
  //   response.write(sitemap);
  //   response.end();
  response.status(200).send({ data: sitemap });
}
