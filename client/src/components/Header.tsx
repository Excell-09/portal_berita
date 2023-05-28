import "../index.css";
import * as React from "react";
import { useAuth } from "../Auth/AuthProvider";
import { AppBar, Box, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Tooltip, Menu, MenuItem, Button } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

const PAGES = [
  { display: "Home", to: "/", notDisabled: true },
  { display: "Create", to: "/create", notDisabled: true },
  { display: "Register", to: "/register" },
  { display: "Login", to: "/login" },
];

export default function Header() {
  let { user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = React.useState<boolean>(false);
  const [pages, setPages] = React.useState([...PAGES]);

  React.useEffect(() => {
    const isNeedDelete = pages.find((item) => item.display === "Login" || item.display === "Register");
    if (user && isNeedDelete) {
      setPages((prevValue) => prevValue.filter((item) => item.notDisabled === true));
      return;
    }
    setPages([...PAGES]);
  }, [user]);

  const styleLinkLogo = {
    flexGrow: 1,
    textDecoration: "none",
    fontWeight: 700,
    color: "white",
  };
  const styleLink = {
    textDecoration: "none",
    fontWeight: 600,
    color: "white",
  };

  const handleCloseNavMenu = () => setIsNavOpen(false);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElUser(e.currentTarget);

  return (
    <AppBar>
      <Toolbar>
        <IconButton onClick={() => setIsNavOpen(true)} size="large" edge="start" color="inherit" aria-label="menu" sx={{ display: { md: "none" } }}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography component={Link} variant="h6" sx={styleLinkLogo} to={"/"}>
          News App
        </Typography>
        <Drawer open={isNavOpen} onClose={() => setIsNavOpen(false)} sx={{ display: { md: "none" } }}>
          <List sx={{ width: 200 }}>
            <ListItem>
              <IconButton onClick={handleCloseNavMenu} size="large" edge="start" color="inherit" aria-label="menu" sx={{ display: { md: "none" } }}>
                <MenuIcon fontSize="large" />
              </IconButton>
            </ListItem>
            <ListItem component={NavLink} to={"/"} onClick={handleCloseNavMenu}>
              <ListItemText>Home</ListItemText>
            </ListItem>
            <ListItem component={NavLink} to={"/create"} onClick={handleCloseNavMenu}>
              <ListItemText>Create</ListItemText>
            </ListItem>
            {!user && (
              <>
                <ListItem component={NavLink} to={"/login"} onClick={handleCloseNavMenu}>
                  <ListItemText>Login</ListItemText>
                </ListItem>
                <ListItem component={NavLink} to={"/register"} onClick={handleCloseNavMenu}>
                  <ListItemText>Register</ListItemText>
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {pages.map(({ display, to }) => (
            <Typography component={NavLink} to={to} key={display} onClick={handleCloseNavMenu} sx={styleLink}>
              {display}
            </Typography>
          ))}
        </Box>

        {user ? (
          <Box sx={{ ml: 3 }}>
            <Tooltip title="profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} size="large" color="inherit">
                <AccountCircle fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                sx={{ bgcolor: "red", color: "white", fontWeight: 600 }}
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button variant="outlined" sx={{ display: { md: "none" } }}>
            <Typography component={NavLink} to={"/register"} sx={styleLink}>
              Register
            </Typography>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
