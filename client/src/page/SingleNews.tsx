import { Link, useParams } from "react-router-dom";
import * as React from "react";
import { Comment, NewsSingle } from "../typing";
import axiosInstance from "../utils/axiosInstance";
import { Typography, Box, Container, Paper, Skeleton, Divider, TextField, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../Auth/AuthProvider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function SingleNews() {
  const { newsId } = useParams();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [news, setNews] = React.useState<NewsSingle | null>();
  const [comments, setComments] = React.useState<Comment[]>([]);
  const { user } = useAuth();
  const formRef = React.useRef<HTMLFormElement>(null);

  const getNews = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance("/news/" + newsId);
      setNews(data);
      setComments(data.comments);
    } catch (error) {
      setNews(null);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getNews();

    window.scrollTo(0, 0);
  }, [newsId]);

  if (loading) {
    return SingleNewsSkeleton();
  }

  const handleAddComment = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const target = e.target as typeof e.target & {
      comment: { value: string };
    };
    setComments((prevValue) => [{ comment: target.comment.value, user: { username: user?.username, email: user?.email }, news: news?.id }, ...prevValue]);
    const prevComment = [...comments];
    try {
      await axiosInstance.post("/comment/" + newsId, { user: user.username, comment: target.comment.value });
      formRef.current?.reset();
    } catch (error) {
      console.log("something wrong!");
      setComments(prevComment);
    }
  };

  return news === null ? (
    <Typography variant="h6" textAlign={"center"}>
      Article Not found!
    </Typography>
  ) : (
    <Container component="section" maxWidth="md">
      <Paper sx={{ padding: 1.5 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom sx={{ fontSize: { xs: 30, md: 50 } }}>
          {news?.title}
        </Typography>
        <Box maxWidth={"100%"} maxHeight={"250px"} overflow={"hidden"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <img src={news?.imageUrl.replace("image/upload/", "")} width={"100%"} />
        </Box>
        <Box display={"flex"} gap={1.5} my={2}>
          <AccountCircle sx={{ fontSize: 55 }} />
          <Box>
            <Typography variant="h6">{news?.author.username}</Typography>
            <Typography>{news?.author.email}</Typography>
          </Box>
        </Box>
        <Box component="article" mb={5}>
          <Typography component={"pre"} whiteSpace={"pre-wrap"}>
            {news?.article}
          </Typography>
        </Box>
        <Divider>Comments</Divider>
        <Box component={"form"} ref={formRef} onSubmit={handleAddComment} sx={{ my: 5 }}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          <TextField name="comment" label="what do you think!" fullWidth autoComplete="off" />
          <Button type="submit" variant="contained" sx={{ mt: 1.5 }} endIcon={<SendIcon />}>
            send
          </Button>
        </Box>
        <Box component={"section"}>
          {comments.map((comment, i) => (
            <React.Fragment key={i}>
              <Divider />
              <Box>
                <Box display={"flex"} gap={1.5} my={2}>
                  <AccountCircle sx={{ fontSize: 45 }} />
                  <Box>
                    <Typography variant="h5">{comment.user.username}</Typography>
                    <Typography variant="h6">{comment.user.email}</Typography>
                    <Typography>{comment.comment}</Typography>
                  </Box>
                </Box>
              </Box>
            </React.Fragment>
          ))}
        </Box>
        <Divider />
        <Box component={"section"} my={5}>
          <Typography gutterBottom variant="h5">
            Releted News
          </Typography>
          <Box
            display={"flex"}
            padding={1.5}
            gap={1.5}
            sx={{ flexDirection: { xs: "column", sm: "row" }, overflowY: "hidden", overflowX: { xs: "hidden", sm: "auto" }, scrollSnapType: "x", "&::-webkit-scrollbar": { display: "hidden" } }}
          >
            {news?.related_news.map((item) => (
              <Card sx={{ minWidth: { xs: "full", sm: 300 }, maxWidth: { xs: "full", sm: 300 }, scrollSnapAlign: "start" }} key={item.id}>
                <CardMedia sx={{ height: 140 }} image={item.imageUrl.replace("image/upload/", "")} title="banner" />
                <CardContent>
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
                    to={"/news/" + item.id}
                    gutterBottom
                    variant="h5"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "5",
                      WebkitBoxOrient: "vertical",
                      textDecoration: "none",
                    }}
                  >
                    {item.article}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
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
