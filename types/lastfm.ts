interface RecentTracksWrapper {
  recenttracks: RecentTracks
  error?: string
  message?: string
}

interface RecentTracks {
  track: Track[]
  '@attr': RecentTracksAttr
}

interface RecentTracksAttr {
  user: string
  totalPages: string
  page: string
  perPage: string
  total: string
}

interface Track {
  artist: Artist
  streamable: string
  image: Image[]
  mbid: string
  album: Album
  name: string
  '@attr': TrackAttr
  url: string
  date: TrackDate
}

interface Artist {
  mbid: string
  '#text': string
}

interface Image {
  size: string
  '#text': string
}

interface Album {
  mbid: string
  '#text': string
}

interface TrackAttr {
  nowplaying: string
}

interface TrackDate {
  uts: string
  '#text': string
}
