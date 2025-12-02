# Streaming Videos API - Vercel Deployment

This is a serverless API built for Vercel that provides dynamic pagination for video content, following the Essential Feed architecture pattern.

## Features

- **Dynamic Pagination**: Supports `?limit=10&after_id=UUID` query parameters
- **5 Videos**: Configured with 2 videos per page for testing (3 pages total)
- **CORS Enabled**: Ready for cross-origin requests from iOS app
- **Serverless**: No server management required

## Quick Start

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

This will open your browser for authentication. Follow the prompts to sign in with:
- GitHub
- GitLab
- Bitbucket
- Or Email

### 3. Deploy to Production

```bash
cd /Users/octaviorojas/Development/streaming-videos-api
vercel --prod
```

**During deployment, answer the prompts:**

```
? Set up and deploy "~/Development/streaming-videos-api"? [Y/n] y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [y/N] n
? What's your project's name? (streaming-videos-api) [Press Enter]
? In which directory is your code located? ./ [Press Enter]
```

### 4. Get Your Production URL

After deployment completes, Vercel will output:

```
✅ Production: https://streaming-videos-api-xxxxx.vercel.app
```

**Copy this URL** and share it with Claude to update the iOS app!

## API Endpoints

### Get Videos (Paginated)

```
GET /v1/videos?limit=10&after_id=UUID
```

**Parameters:**
- `limit` (optional): Number of videos per page (default: 10)
- `after_id` (optional): UUID of the last video from previous page

**Response:**
```json
{
  "videos": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Big Buck Bunny",
      "description": "A large and lovable rabbit...",
      "url": "https://...",
      "thumbnail_url": "https://...",
      "duration": 596.0
    }
  ]
}
```

## Testing the API

Once deployed, test your API:

```bash
# Get first page (2 videos)
curl "https://YOUR-URL.vercel.app/v1/videos?limit=2"

# Get second page (2 more videos)
curl "https://YOUR-URL.vercel.app/v1/videos?limit=2&after_id=550e8400-e29b-41d4-a716-446655440002"
```

## Local Development

To test locally before deploying:

```bash
vercel dev
```

This starts a local server at `http://localhost:3000`

## Video Data

The API contains 5 sample videos:
1. Big Buck Bunny
2. Elephant Dream
3. For Bigger Blazes
4. Sintel
5. Tears of Steel

All videos are from Google's test video collection.

## Troubleshooting

### Vercel CLI not found after installation

If `vercel` command isn't found, add npm global bin to your PATH:

```bash
export PATH="$PATH:$(npm config get prefix)/bin"
```

Or restart your terminal.

### Deployment fails

Ensure you're in the correct directory:
```bash
pwd
# Should output: /Users/octaviorojas/Development/streaming-videos-api
```

## Next Steps

After deployment:
1. Copy your production URL
2. Share it with Claude
3. Claude will update the iOS app to use your new API
4. Test pagination in the app!
