export interface Color {
  hex: string;
  name: string;
  rgb?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Palette {
  id: string;
  title: string;
  colors: Color[];
  likes: number;
  tags: string[];
  createdAt: string;
  author: string;
}
