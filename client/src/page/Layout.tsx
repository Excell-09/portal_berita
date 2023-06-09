import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Box from "@mui/material/Box";

export default function Layout() {
  return (
    <>
      <Header />
      <Box sx={{ py: 10 }} component={"main"}>
        <Outlet />
      </Box>
    </>
  );
}
