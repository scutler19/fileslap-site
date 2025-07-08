import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/success', '/cancel', '/subscribe'],
    },
    sitemap: 'https://fileslap.com/sitemap.xml',
  }
} 