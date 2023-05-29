import { User } from "./Auth/AuthProvider";

export interface News {
  id: string;
  title: string;
  article: string;
  imageUrl: string;
  createdAt: number;
  updatedAt: number;
  categories: "technology" | "sport" | "politics" | "war" | "economy" | "technology";
  author: string;
}

export interface Comment {
  id?: number;
  comment: string;
  news?: string;
  user: User;
}

export interface NewsSingle {
  id: string;
  title: string;
  article: string;
  imageUrl: string;
  createdAt: number;
  updatedAt: number;
  categories: "technology" | "sport" | "politics" | "war" | "economy" | "technology";
  author: {
    username: string;
    email: string;
    password: string;
  };
  comments: Comment[];
  related_news: News[];
}
