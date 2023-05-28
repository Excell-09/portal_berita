import { Box, Container, ButtonGroup, Button } from "@mui/material";
import NewsContainer from "../components/NewsContainer";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  let [_, setSearchParams] = useSearchParams();

  return (
    <Container component="section" maxWidth="md">
      <Box mb={3}>
        <ButtonGroup sx={{ display: "flex", overflowX: "auto" }}>
          {["all", "sport", "politics", "war", "economy", "technology"].map((item, i) => (
            <Button variant="contained" sx={{ px: 2, flexShrink: 0 }} onClick={() => setSearchParams("category=" + item)} key={i}>
              {item}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <NewsContainer />
    </Container>
  );
}
