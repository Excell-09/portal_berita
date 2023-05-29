import { Box, Container, TextField, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { NewsSingle } from "../typing";
import * as React from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../Auth/AuthProvider";
import useAlert from "../atom/errorState";

export default function UpdateNews() {
  const { newsId } = useParams();
  const [news, setNews] = React.useState<NewsSingle | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [enableUpdate, setEnableUpdate] = React.useState(true);
  const { user } = useAuth();
  const [article, setArticle] = React.useState("");
  const [title, setTitle] = React.useState("");
  const { ComponentAlert, setAlert } = useAlert();

  const navigate = useNavigate();

  const getNewsById = async () => {
    try {
      const { data } = await axiosInstance<NewsSingle>("/news/" + newsId);
      setNews(data);
      setArticle(data.article);
      setTitle(data.title);
    } catch (error) {
      navigate("/");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getNewsById();
  }, []);

  React.useEffect(() => {
    if (loading) return;
    if (news?.article.replace(/\s/g, "") !== article.replace(/\s/g, "") || news?.title.replace(/\s/g, "") !== title.replace(/\s/g, "")) {
      setEnableUpdate(false);
    }
  }, [article, title, loading]);

  const handleSaveUpdate = async () => {
    setLoading(true);
    setAlert({ message: null, status: null });

    const data_request = {
      title: title,
      article: article,
      imageUrl: news?.imageUrl,
      categories: news?.categories,
      author: user?.username,
    };

    if (user?.username !== news?.author.username) {
      setAlert({ message: "you are not author in this article!", status: "error" });
      return;
    }

    try {
      await axiosInstance.put("/news/" + newsId, data_request);
      setAlert({ message: "Update News Success!", status: "success" });
      window.location.replace(window.location.origin + "/");
    } catch (error) {
      setAlert({ message: "Something wrong, try again!", status: "error" });
    }
    setLoading(false);
  };

  return (
    <Container component={"section"} maxWidth="md">
      <Box component={"form"}>
        <ComponentAlert />
        <Typography variant="h4" sx={{ fontSize: { xs: 25 } }} textAlign={"center"} gutterBottom>
          Update Your Article
        </Typography>
        <TextField disabled={loading} onChange={({ target }) => setTitle(target.value)} label="Title" value={loading ? "Loading..." : title} fullWidth sx={{ mb: 2.5 }} />
        <TextField disabled={loading} onChange={({ target }) => setArticle(target.value)} multiline label="Article" value={loading ? "loading..." : article} fullWidth />
        <Button disabled={loading || enableUpdate} sx={{ mt: 3 }} variant="contained" onClick={handleSaveUpdate}>
          {loading ? "Loading..." : "Save"}
        </Button>
      </Box>
    </Container>
  );
}
