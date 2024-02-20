import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import { Link } from 'react-router-dom';

function ResponsiveAppBar() {
  






  return (
    <AppBar position="static" style={{color:'black',backgroundColor:"#f57c00"}} >
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <TheaterComedyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 ,fontSize:"3rem"}} />
          <Link to={"/"} style={{textDecoration:"none"}}>

          <Typography
            variant="h6"
            noWrap
            component="a"
            
            
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
            >
           Watch Compass
          </Typography>
            </Link>

         
           
          <TheaterComedyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'quicksand',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Watch Compass
          </Typography>
    
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;