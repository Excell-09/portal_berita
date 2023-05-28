import { Box, Typography, Paper, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  imageUrl: string;
  article: string;
};

export default function NewsCard({ id, title, imageUrl, article }: Props) {
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
            WebkitLineClamp: "5",
            WebkitBoxOrient: "vertical",
          }}
          fontSize={14}
        >
          {article}
        </Typography>
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
