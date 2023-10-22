import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Cards(props) {
  return (
    <Link to={`/particular/${props.title}/${props.year}/${props.id}`}>
    <Card sx={{  maxWidth: 345, minHeight:280 ,maxHeight:500,boxShadow: 5,marginBottom:"10px" ,backgroundColor:"#D3D3D3", '@media (max-width: 767px)': {
    maxHeight: 'none', 
  }
    }}>
      <CardActionArea>
        <CardMedia
        sx={{ maxHeight:"500px",'@media (max-width: 767px)': {
          maxHeight: 'none', 
        }}}
          component="img"
          
          image={props.image}
          alt="poster"
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
           <div style={{fontWeight:"bolder",fontFamily:"sans-serif",textDecoration:"none"}}> {props.title}</div> 
           
          </Typography>
         
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}