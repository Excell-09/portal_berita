import { Box, Typography, Paper, Skeleton, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { News } from "../typing";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../Auth/AuthProvider";

type Props = {
  id: string;
  title: string;
  imageUrl: string;
  article: string;
  isCurrentAuthor: boolean;
  getterNews: News[];
  setterNews: React.Dispatch<React.SetStateAction<News[]>>;
};

export default function NewsCard({ id, title, imageUrl, article, isCurrentAuthor, setterNews, getterNews }: Props) {
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeleteNews = async () => {
    setLoading(true);
    const prevNews = [...getterNews];
    setterNews((prevValue) => prevValue.filter((item) => item.id !== id));
    try {
      await axiosInstance.delete("/news/" + id, { data: { author: user?.username } });
    } catch (error) {
      setterNews(prevNews);
      return error;
    }
    setLoading(false);
  };
  return (
    <Paper elevation={3} sx={{ display: "flex", p: 2, minHeight: 150, flexWrap: { xs: "wrap", sm: "nowrap" }, gap: 2 }}>
      <Box sx={{ mx: "auto" }}>
        <img loading="lazy" width={"200px"} height={"150px"} style={{ objectFit: "cover", objectPosition: "center" }} src={imageUrl} alt="banner" />
      </Box>
      <Box>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          component={Link}
          to={"/news/" + id}
          fontSize={16}
          fontWeight={700}
          variant="h6"
        >
          {title}
        </Typography>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
          mb={1.1}
          fontSize={14}
        >
          {article}
        </Typography>
        {isCurrentAuthor && (
          <>
            <Button onClick={() => navigate("/update/" + id)} disabled={loading}>
              Update
            </Button>
            <Button disabled={loading} onClick={handleDeleteNews} color="error">
              delete
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
}

export function NewsCardSkeleton() {
  return (
    <Paper elevation={3} sx={{ display: { xs: "block", sm: "flex" }, p: 2, minHeight: 150, gap: 2 }}>
      <Skeleton variant="rounded" width={"200px"} height={"150px"} sx={{ mx: "auto" }} />
      <Box sx={{ flexGrow: 1, mt: 1.5 }}>
        <Skeleton variant="text" sx={{ fontSize: "2rem", width: "100%" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
      </Box>
    </Paper>
  );
}
