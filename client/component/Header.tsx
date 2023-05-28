"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from "@mui/material/Menu"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { AccountCircle } from '@mui/icons-material';
import { Drawer } from '@mui/material';

export default function Header() {
    const [anchorElUserNav, setAnchorElUserNav] = React.useState<null | HTMLElement>(null);
    const [isNavOpen, setIsNavOpen] = React.useState<boolean>(false);
    const user = null

    const handleCloseMenu = () =>{
        setAnchorElUserNav(null);    }

    const handleOpenMenu = (e:React.MouseEvent<HTMLElement>) =>{
        setAnchorElUserNav(e.currentTarget)
    }

  return (
      <AppBar position="static">
        <Toolbar >
        <Box sx={{flexGrow:1, display:{ md:"flex", xs:"none"}}}>

          <Typography
            variant="h6"
            noWrap
            fontWeight={700}
            sx={{display:"inline"}}
            >
            <Link style={{textDecoration:"none", color:"white" }} href={"/"} >
            News App
            </Link>
          </Typography>
         
          </Box>
          <Box sx={{flexGrow:1, display:{ md:"none"}}}>
          <Tooltip title="Menu">
          <IconButton
            onClick={()=> setIsNavOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
          <Typography
            variant="h6"
            noWrap
            fontWeight={700}
            sx={{display:"inline"}}
          >
            <Link style={{textDecoration:"none", color:"white" }} href={"/"} >
            News App
            </Link>
          </Typography>
          <Drawer anchor="left" open={isNavOpen} onClose={()=> setIsNavOpen(false)} sx={{display:{md:"none"}}}>
            
            <List sx={{width:200}}>
                <ListItem disablePadding>
                    <ListItemButton  >
                    <Tooltip title="Menu">
            <IconButton
            onClick={()=> setIsNavOpen(false)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={"Home"}/>
                    </ListItemButton>
                </ListItem>
                {user ? 
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={"Create News"}/>
                    </ListItemButton>
                </ListItem>:
                <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary={"Login"}/>
                </ListItemButton>
            </ListItem>
                }
            </List>
          </Drawer>
          </Box>

            {user ? <Box>
              <Button variant="text" sx={{color:"white"}}>Home</Button>
          <Tooltip title="profile">
            <IconButton
                size="large"
                onClick={handleOpenMenu}
                color="inherit"
                >
                <AccountCircle fontSize={"large"} />
            </IconButton>
            </Tooltip>
              <Menu 
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUserNav}
              open={Boolean(anchorElUserNav)}
              onClose={handleCloseMenu}
              keepMounted
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
              >
                <MenuItem sx={{bgcolor:"red",color:"white"}}>Logout</MenuItem>
              </Menu>
            </Box> :<>
            <Box sx={{display:{md:"none",xs:"block"}}}>
                <Button sx={{color:"white"}} variant="outlined">Register</Button>
            </Box>
            <Box sx={{display:{md:"block",xs:"none"}}}>
                <Button sx={{color:"white"}} variant="text">Home</Button>
                <Button sx={{color:"white"}} variant="text">Login</Button>
                <Button sx={{color:"white"}} variant="outlined">Register</Button>
            </Box>
            </>
            
        }
          
        </Toolbar>
      </AppBar>
  );
}
