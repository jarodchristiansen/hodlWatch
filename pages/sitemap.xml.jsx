const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = process.env.BASE_URL;

  let result = await fetch(`${BASE_URL}/api/sitemap`);
  let data = await result.json();

  let sitemap = "";

  if (data.data) {
    sitemap = data.data;
  }

  // Will need else condition
  //   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  //   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/1" xmlns:news="http://www.google.com/schemas/sitemap-news/1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  //   <script/>
  //   ${allPaths
  //     .map((url) => {
  //       return `
  //         <url>
  //           <loc>${url}</loc>
  //           <lastmod>${new Date().toISOString()}</lastmod>
  //           <changefreq>monthly</changefreq>
  //           <priority>1.0</priority>
  //         </url>
  //       `;
  //     })
  //     .join("")}
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
