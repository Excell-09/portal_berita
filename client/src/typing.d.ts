export interface News {
  id: string;
  title: string;
  article: string;
  imageUrl: string;
  createdAt: number;
  updatedAt: number;
  categories: "technology" | "sport" | "politics" | "war" | "economy" | "technology";
  author: {
    name: string;
  };
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
}
