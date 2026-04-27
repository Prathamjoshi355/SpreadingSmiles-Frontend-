declare module './prerender/blog-routes.js' {
  export function getBlogRoutes(): string[];
}

declare module './prerender/blog-sitemap.js' {
  export function getSitemapLastmod(): string | Date;
}
