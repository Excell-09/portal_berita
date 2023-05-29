import { Grid, Typography } from "@mui/material";
import NewsCard, { NewsCardSkeleton } from "./NewsCard";
import * as React from "react";
import axiosInstance from "../utils/axiosInstance";
import { News } from "../typing";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

export default function NewsContainer() {
  const [news, setNews] = React.useState<News[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  let [searchParams] = useSearchParams();
  const { user } = useAuth();

  const fetchNews = async () => {
    setLoading(true);

    try {
      const news = await axiosInstance<News[]>("/news?category=" + searchParams.get("category"));
      setNews(news.data);
    } catch (error) {
      return error;
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchNews();
  }, [searchParams]);

  if (loading) {
    return (
      <Grid container spacing={1.5}>
        {[1, 2, 3].map((_, i) => (
          <Grid key={i} item xs={12}>
            <NewsCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container gap={1.5}>
      {news.length === 0 ? (
        <Typography variant="h6" textAlign={"center"}>
          No any news with this category!
        </Typography>
      ) : (
        news.map((item, i) => (
          <Grid key={i} item xs={12}>
            <NewsCard getterNews={news} setterNews={setNews} title={item.title} imageUrl={item.imageUrl.replace("image/upload/", "")} id={item.id} article={item.article} isCurrentAuthor={item.author === user?.user_id} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
