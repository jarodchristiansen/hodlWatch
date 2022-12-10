import glob from "glob";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = process.env.BASE_URL;

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

  const pagesDir = "pages/**/*.tsx";
  let pagesPaths = await glob.sync(pagesDir);

  pagesPaths = pagesPaths
    .filter((path) => !path.includes("["))
    .filter((path) => !path.includes("/_"))
    .filter((path) => !path.includes("404"));

  const dynamicPaths = [`${BASE_URL}/newsfeed`, `${BASE_URL}/user/[id]`];

  const allPaths = [...pagesPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/1" xmlns:news="http://www.google.com/schemas/sitemap-news/1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <script/>

  <url>
  <loc>https://hodl-watch.vercel.app/</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
  </url>
  

  <url>
  <loc>https://hodl-watch.vercel.app/news</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
  </url>


  <url>
  <loc>https://hodl-watch.vercel.app/education</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
  </url>

  <url>
  <loc>https://hodl-watch.vercel.app/education/fibonacci-retracement-indicator</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
  </url>


  <url>
  <loc>https://hodl-watch.vercel.app/education/what-is-bitcoin</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
  </url>

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
