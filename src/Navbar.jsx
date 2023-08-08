import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
          //  color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" href='/activities'>My Activities</Button>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
