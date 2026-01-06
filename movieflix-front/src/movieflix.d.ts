export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  imageUrl: string;
  categories: {
    id: number;
    name: string;
  }[];
  streamings: {
    id: number;
    name: string;
  }[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Streaming {
  id: number;
  name: string;
  imageUrl: string;
}