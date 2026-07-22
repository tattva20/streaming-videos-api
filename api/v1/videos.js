// Vercel Serverless Function for Videos API with Pagination
// Supports: GET /api/v1/videos?limit=10&after_id=UUID

// Base video templates
const videoTemplates = [
  {
    title: "Big Buck Bunny",
    description: "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnail_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/330px-Big_buck_bunny_poster_big.jpg",
    duration: 596.0
  },
  {
    title: "Elephant Dream",
    description: "The first Blender open movie project. Two men navigate through a surreal, mechanical world.",
    url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8",
    thumbnail_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/330px-Elephants_Dream_s5_both.jpg",
    duration: 653.0
  },
  {
    title: "For Bigger Blazes",
    description: "HBO GO now works with Chromecast. Streaming entertainment has never been easier.",
    url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8",
    thumbnail_url: "https://picsum.photos/seed/blazes/640/360",
    duration: 15.0
  },
  {
    title: "Sintel",
    description: "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales.",
    url: "https://test-streams.mux.dev/pts_shift/master.m3u8",
    thumbnail_url: "https://picsum.photos/seed/sintel/640/360",
    duration: 888.0
  },
  {
    title: "Tears of Steel",
    description: "A group of warriors and scientists battle to protect their city against robots in a future Amsterdam.",
    url: "https://test-streams.mux.dev/tos_ismc/main.m3u8",
    thumbnail_url: "https://picsum.photos/seed/tearsofsteel/640/360",
    duration: 734.0
  }
];

// Generate 90 videos by repeating the templates with unique IDs
const videos = [];
for (let i = 1; i <= 90; i++) {
  const template = videoTemplates[(i - 1) % videoTemplates.length];
  const suffix = Math.ceil(i / videoTemplates.length);
  const suffixText = suffix > 1 ? ` ${suffix}` : '';

  videos.push({
    id: `550e8400-e29b-41d4-a716-4466554400${i.toString().padStart(2, '0')}`,
    title: `${template.title}${suffixText}`,
    description: template.description,
    url: template.url,
    thumbnail_url: template.thumbnail_url,
    duration: template.duration
  });
}

module.exports = (req, res) => {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Parse query parameters
  const { limit = '10', after_id } = req.query;
  const pageLimit = parseInt(limit, 10);

  // Find starting index based on after_id (case-insensitive comparison for UUID)
  let startIndex = 0;
  if (after_id) {
    const normalizedAfterId = after_id.toLowerCase();
    const afterIndex = videos.findIndex(v => v.id.toLowerCase() === normalizedAfterId);
    if (afterIndex === -1) {
      res.status(400).json({ error: 'Invalid after_id' });
      return;
    }
    startIndex = afterIndex + 1;
  }

  // Get paginated videos
  const paginatedVideos = videos.slice(startIndex, startIndex + pageLimit);

  // Return response
  res.status(200).json({
    videos: paginatedVideos
  });
};
