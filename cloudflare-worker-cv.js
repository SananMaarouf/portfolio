/**
 * Cloudflare Worker for serving CV downloads from R2
 * 
 * R2 Binding: CV_BUCKET
 * Route: sanan.no/download/*
 */

// Route mapping: URL path -> R2 object key
const ROUTES = {
  '/download/cv-en': {
    key: 'sanan_maarouf_cv_en.pdf',
    filename: 'Sanan_Maarouf_CV_EN.pdf'
  },
  '/download/cv-no': {
    key: 'sanan_maarouf_cv_nb.pdf',
    filename: 'Sanan_Maarouf_CV_NO.pdf'
  }
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Only handle GET requests
    if (request.method !== 'GET') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    // Check if path exists in routes
    const route = ROUTES[path];
    if (!route) {
      return new Response('Not Found', { 
        status: 404,
        headers: { 'X-Robots-Tag': 'noindex, nofollow, nosnippet' }
      });
    }

    try {
      // Fetch object from R2
      const object = await env.CV_BUCKET.get(route.key);
      
      if (!object) {
        return new Response('File Not Found', { 
          status: 404,
          headers: { 'X-Robots-Tag': 'noindex, nofollow, nosnippet' }
        });
      }

      // Stream the PDF with appropriate headers
      const headers = new Headers({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${route.filename}"`,
        'X-Robots-Tag': 'noindex, nofollow, nosnippet',
        'Cache-Control': 'private, max-age=600',
        'Content-Length': object.size,
      });

      return new Response(object.body, { headers });

    } catch (error) {
      console.error('Error fetching from R2:', error);
      return new Response('Internal Server Error', { 
        status: 500,
        headers: { 'X-Robots-Tag': 'noindex, nofollow, nosnippet' }
      });
    }
  }
};
