interface Project {
  title: string
  slogan: string
  description: string
  cover: string
  status: ProjectStatus
  featured: boolean
  url: string
  color: string
}

enum ProjectStatus {
  TBA,
  ACTIVE,
  FINISHED
}
