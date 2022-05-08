interface YouTubeStore {
  latestVideo: YouTubeVideo
}

interface YouTubeVideo {
  id: string,
  snippet: YouTubeVideoSnippet,
  statistics: YouTubeVideoStatistics
}

interface YouTubeVideoSnippet {
  title: string,
  description: string,
  thumbnails: YouTubeVideoSnippetThumbnails
}

interface YouTubeVideoSnippetThumbnails {
  maxres: YouTubeVideoSnippetThumbnail
}

interface YouTubeVideoSnippetThumbnail {
  url: string
}

interface YouTubeVideoStatistics {
  viewCount: number,
  likeCount: number
}
