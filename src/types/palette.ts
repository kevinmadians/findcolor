
export interface Color {
  hex: string;
  rgb?: string;
  name?: string;
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

export interface Category {
  id: string;
  name: string;
}
