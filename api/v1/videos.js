// Vercel Serverless Function for Videos API with Pagination
// Supports: GET /api/v1/videos?limit=10&after_id=UUID

const videos = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Big Buck Bunny",
    description: "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/330px-Big_buck_bunny_poster_big.jpg",
    duration: 596.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "Elephant Dream",
    description: "The first Blender open movie project. Two men navigate through a surreal, mechanical world.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/330px-Elephants_Dream_s5_both.jpg",
    duration: 653.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "For Bigger Blazes",
    description: "HBO GO now works with Chromecast. Streaming entertainment has never been easier.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    duration: 15.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    title: "Sintel",
    description: "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    duration: 888.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    title: "Tears of Steel",
    description: "A group of warriors and scientists battle to protect their city against robots in a future Amsterdam.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
    duration: 734.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    title: "Big Buck Bunny 2",
    description: "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/330px-Big_buck_bunny_poster_big.jpg",
    duration: 596.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    title: "Elephant Dream 2",
    description: "The first Blender open movie project. Two men navigate through a surreal, mechanical world.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/330px-Elephants_Dream_s5_both.jpg",
    duration: 653.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    title: "For Bigger Blazes 2",
    description: "HBO GO now works with Chromecast. Streaming entertainment has never been easier.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    duration: 15.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    title: "Sintel 2",
    description: "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    duration: 888.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    title: "Tears of Steel 2",
    description: "A group of warriors and scientists battle to protect their city against robots in a future Amsterdam.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
    duration: 734.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    title: "Big Buck Bunny 3",
    description: "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/330px-Big_buck_bunny_poster_big.jpg",
    duration: 596.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    title: "Elephant Dream 3",
    description: "The first Blender open movie project. Two men navigate through a surreal, mechanical world.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/330px-Elephants_Dream_s5_both.jpg",
    duration: 653.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    title: "For Bigger Blazes 3",
    description: "HBO GO now works with Chromecast. Streaming entertainment has never been easier.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    duration: 15.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    title: "Sintel 3",
    description: "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    duration: 888.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440015",
    title: "Tears of Steel 3",
    description: "A group of warriors and scientists battle to protect their city against robots in a future Amsterdam.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
    duration: 734.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440016",
    title: "Big Buck Bunny 4",
    description: "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/330px-Big_buck_bunny_poster_big.jpg",
    duration: 596.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440017",
    title: "Elephant Dream 4",
    description: "The first Blender open movie project. Two men navigate through a surreal, mechanical world.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/330px-Elephants_Dream_s5_both.jpg",
    duration: 653.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440018",
    title: "For Bigger Blazes 4",
    description: "HBO GO now works with Chromecast. Streaming entertainment has never been easier.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    duration: 15.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440019",
    title: "Sintel 4",
    description: "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    duration: 888.0
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440020",
    title: "Tears of Steel 4",
    description: "A group of warriors and scientists battle to protect their city against robots in a future Amsterdam.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
    duration: 734.0
  }
];

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
