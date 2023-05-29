import { Container, Box, TextField } from "@mui/material";
import DisplayAlert from "../components/DisplayAlert";
import SendIcon from "@mui/icons-material/Send";
import useAlert from "../atom/errorState";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../Auth/AuthProvider";
import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const category = ["technology", "sport", "politics", "war", "economy", "technology"];

export default function CreateNews() {
  const { setAlert } = useAlert();
  const { user } = useAuth();
  const cookie = document.cookie.split("=");
  const indexCsrfToken = cookie.indexOf("csrftoken");
  const csrfToken = cookie[indexCsrfToken + 1];
  const [selectedPostImage, setSelectedPostImage] = React.useState<string | ArrayBuffer | null | undefined>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [textAreaArticle, setTextAreaArticle] = React.useState("");

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e?.target?.files && e?.target?.files[0]) {
      reader.readAsDataURL(e?.target.files[0]);
      reader.onload = (readerEvent) => {
        setSelectedPostImage(readerEvent.target?.result);
      };
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ message: null, status: null });

    if (!user) {
      return setAlert({ message: "You need login, if you want post news!", status: "error" });
    }
    const target = e.target as typeof e.target & {
      title: { value: string };
      article: { value: string };
      category: { value: string };
    };
    try {
      await axiosInstance.post(
        "/news",
        {
          title: target.title.value,
          article: target.article.value,
          imageUrl: selectedPostImage,
          categories: target.category.value,
          author: user.username,
        },
        {
          headers: { "X-CSRFToken": csrfToken },
        }
      );
      window.location.replace(window.location.origin + "/");
      return;
    } catch (error) {
      setAlert({ message: "Something wrong, try again!", status: "error" });
    }
    setLoading(false);
  };
  return (
    <Container component={"section"} maxWidth="md">
      <Box component={"form"} gap={2} display={"flex"} flexDirection={"column"} onSubmit={handleSubmit}>
        <DisplayAlert />
        <TextField
          inputProps={{
            minLength: 50,
          }}
          required
          name="title"
          label="Title"
          fullWidth
        />
        <TextField
          required
          name="banner"
          type="file"
          fullWidth
          helperText="Banner"
          onChange={addImageToPost}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          name="article"
          multiline
          rows={10}
          label="Article"
          fullWidth
          helperText={`${textAreaArticle.length < 100 ? "minimum" + String(100 - textAreaArticle.length) : textAreaArticle.length} characters`}
          inputProps={{
            minLength: 100,
          }}
          onChange={(e) => setTextAreaArticle(e.target.value)}
        />
        <TextField
          required
          name="category"
          select
          label="Category"
          defaultValue="Technology"
          SelectProps={{
            native: true,
          }}
        >
          {category.map((value, i) => (
            <option key={i} value={value}>
              {value.toUpperCase()}
            </option>
          ))}
        </TextField>
        <LoadingButton loading={loading} type="submit" endIcon={<SendIcon />} variant="contained">
          Post
        </LoadingButton>
      </Box>
    </Container>
  );
}
