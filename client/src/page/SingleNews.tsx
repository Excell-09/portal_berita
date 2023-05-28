import { useParams } from "react-router-dom";
import * as React from "react";
import { NewsSingle } from "../typing";
import axiosInstance from "../utils/axiosInstance";
import { Typography, Box, Container, Paper, Skeleton, Divider } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function SingleNews() {
  const { newsId } = useParams();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [news, setNews] = React.useState<NewsSingle | null>();

  const getNews = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance("/news/" + newsId);
      console.log(data);
      setNews(data);
    } catch (error) {
      setNews(null);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getNews();
  }, []);

  if (loading) {
    return SingleNewsSkeleton();
  }

  return news === null ? (
    <Typography variant="h6" textAlign={"center"}>
      Article Not found!
    </Typography>
  ) : (
    <Container component="section" maxWidth="md">
      <Paper sx={{ padding: 1.5 }}>
        <Box maxWidth={"100%"} maxHeight={"200px"} overflow={"hidden"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <img src={"https://res.cloudinary.com/dit4qh80d/" + news?.imageUrl} width={"100%"} />
        </Box>
        <Box display={"flex"} gap={1.5} my={2}>
          <AccountCircle sx={{ fontSize: 55 }} />
          <Box>
            <Typography variant="h6">{news?.author.username}</Typography>
            <Typography>{news?.author.email}</Typography>
          </Box>
        </Box>
        <Box component="article">
          <Typography component={"pre"} whiteSpace={"pre-wrap"}>
            {news?.article}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Paper>
    </Container>
  );
}

const SingleNewsSkeleton = () => {
  return (
    <Container component="section" maxWidth="md">
      <Paper sx={{ padding: 1.5 }}>
        <Box>
          <Skeleton variant="rectangular" width={"100%"} height={"200px"} />
        </Box>
        <Box display={"flex"} gap={1.5} my={2}>
          <Skeleton variant="circular">
            <AccountCircle sx={{ fontSize: 55 }} />
          </Skeleton>
          <Box maxWidth={"200px"} flexGrow={1}>
            <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width="100%" />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="60%" />
          </Box>
        </Box>
        <Box component="article">
          <Skeleton variant="text" width={"100%"} />
          <Skeleton variant="text" width={"100%"} />
          <Skeleton variant="text" width={"100%"} />
          <Skeleton variant="text" width={"100%"} sx={{ mt: 1.5 }} />
          <Skeleton variant="text" width={"100%"} />
          <Skeleton variant="text" width={"100%"} />
          <Skeleton variant="text" width={"100%"} sx={{ mt: 1.5 }} />
          <Skeleton variant="text" width={"100%"} />
          <Skeleton variant="text" width={"100%"} />
        </Box>
      </Paper>
    </Container>
  );
};
