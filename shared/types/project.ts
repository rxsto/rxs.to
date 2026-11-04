export interface Project {
  title: string;
  description: string;
  url: string;
  state: 'active' | 'discontinued';
  image?: string;
}
