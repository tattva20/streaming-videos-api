// Vercel Serverless Function for Video Comments API
// Supports: GET /api/v1/videos/{id}/comments

// Sample usernames for comments
const usernames = [
  "MovieFan99", "CinemaLover", "FilmBuff2024", "VideoViewer", "StreamingPro",
  "ContentCreator", "WatchParty", "BingeWatcher", "ScreenTime", "MovieNight",
  "TechReviewer", "AnimationFan", "DocuLover", "ShortFilmPro", "VFXEnthusiast"
];

// Sample comment messages
const commentMessages = [
  "This is an amazing video! The animation quality is outstanding.",
  "I love how the story unfolds. Great character development!",
  "The visual effects in this are mind-blowing. How did they do that?",
  "Been watching this on repeat. It never gets old!",
  "The soundtrack perfectly complements the visuals. Masterpiece!",
  "This reminds me why I love open source media projects.",
  "Incredible work by the entire team. Truly inspiring!",
  "The lighting and textures are so realistic. Amazing technical achievement!",
  "First time watching this and I'm blown away. Subscribing for more!",
  "This deserves way more views. Sharing with all my friends!",
  "The attention to detail here is remarkable. Every frame is perfect.",
  "Can't believe this is available for free. What a gem!",
  "The pacing is perfect. Not a single boring moment.",
  "This is what quality content looks like. Take notes, Hollywood!",
  "Watching this with my family. Everyone loves it!"
];

// Generate comments for a video based on its ID
function generateComments(videoId) {
  // Use video ID to seed consistent comments per video
  const seed = videoId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const numComments = 5 + (seed % 11); // 5-15 comments per video

  const comments = [];
  const now = new Date();

  for (let i = 0; i < numComments; i++) {
    // Generate pseudo-random but consistent values based on seed and index
    const messageIndex = (seed + i * 7) % commentMessages.length;
    const usernameIndex = (seed + i * 11) % usernames.length;

    // Generate timestamps going back in time (newest first)
    const minutesAgo = i * 15 + (seed % 30) + i * (seed % 10);
    const createdAt = new Date(now.getTime() - minutesAgo * 60 * 1000);

    // Generate a valid UUID for each comment
    const commentId = `${videoId.substring(0, 8)}-${seed.toString(16).padStart(4, '0')}-4${i.toString().padStart(3, '0')}-a000-${(seed + i).toString(16).padStart(12, '0')}`;

    comments.push({
      id: commentId,
      message: commentMessages[messageIndex],
      created_at: createdAt.toISOString(),
      author: {
        username: usernames[usernameIndex]
      }
    });
  }

  return comments;
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

  // Get video ID from URL path
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Video ID is required' });
    return;
  }

  // Validate UUID format (basic check)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    res.status(400).json({ error: 'Invalid video ID format' });
    return;
  }

  // Generate comments for this video
  const comments = generateComments(id.toLowerCase());

  // Return response matching VideoCommentsMapper expected format
  res.status(200).json({
    items: comments
  });
};
