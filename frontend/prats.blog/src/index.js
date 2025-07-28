export default {
  async fetch(request, env) {
    // If you want to add API routes, handle them here
    // Example:
    // if (new URL(request.url).pathname.startsWith("/api/")) { ... }

    // Serve static assets (your React app)
    return env.ASSETS.fetch(request);
  },
};
