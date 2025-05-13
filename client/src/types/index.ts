export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  technologies: string[];
  projectUrl: string;
}

export interface App {
  id: number;
  name: string;
  category: string;
  price: string | null;
  priceLabel: string;
  description: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  isPaid: boolean;
  features?: string[];
  screenshots?: string[];
  developer?: string;
  releaseDate?: string;
  version?: string;
  size?: string;
  website?: string;
}
