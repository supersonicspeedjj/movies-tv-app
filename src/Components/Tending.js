import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import React from "react";
import Cards from "./Cards";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import clevertap from "clevertap-web-sdk";

function Tending() {
  
  const [trendtv, settv] = useState([]);
  const [should, setshould] = useState(false);
  const [titles, settitles] = useState([]);
  const [movies,setmovies] = useState([]);
  const [movti,setmovti] = useState([]);
  const [year_s,setyaer_s] = useState([]);
  const [year_m,setyaer_m] = useState([]);
  const [id,setid] = useState([]);
  const [idm,setidm] = useState([]);
  const navigate = useNavigate();


 

  useEffect(() => {
    // eslint-disable-next-line

    fetchData();
  }, []);

  const handleFocus = () => {
    clevertap.event.push('Charged');
    navigate("/particular/tv"); 
  
  };

  const handleFocus2 = () => {
    
    navigate("/particular/movies"); 
    
  };



  async function fetchData() {
    try {

      function getStrBeforeColon(str) {
        for (var i = 0; i < str.length; i++) {
          if (str[i] === ":" || str[i] === "|") {
            return str.slice(0, i);
          }
        }
        return str;
      }


      const url1 = `https://trend-api-git-master-supersonicspeedjj.vercel.app`;
      const url2 = `https://trend-api-git-master-supersonicspeedjj.vercel.app/movies`;
  
      const [dataResponse, movieResponse] = await Promise.all([
        fetch(url1),
        fetch(url2),
      ]);
  
      const [data, datam] = await Promise.all([
        dataResponse.json(),
        movieResponse.json(),
      ]);
  
      const text = data.map((itera) => itera.text);
      const text_m = datam.map((itera) => itera.text);
  
      settitles(text);
      setmovti(text_m);
  
      const fetchImageAndIdData = async (titlesArray, setImagesFunc, setIdFunc, setyaer_s) => {
        const imageAndIdRequests = titlesArray.slice(0, 10).map(async (title) => {
          const response = await fetch(
            `https://www.myapifilms.com/imdb/idIMDB?title=${getStrBeforeColon(
              title
            )}&token=e78c39cc-2fa5-46e3-96ea-74c9e5e09f16`
          );
          const imageData = await response.json();
  
          return {
           idIMDB: imageData.data.movies[0]?.idIMDB || null,
    urlPoster: imageData.data.movies[0]?.urlPoster || null,
    year: imageData.data.movies[0]?.year || null,
          };
        });
        
        
        const imageAndIdData = await Promise.all(imageAndIdRequests);
        const ids = imageAndIdData.map((item) => item.idIMDB);
        const images = imageAndIdData.map((item) => item.urlPoster);
        const year = imageAndIdData.map((item)=>item.year);
        setImagesFunc(images);
        setIdFunc(ids);
        setyaer_s(year);
      };
  
      await Promise.all([
        fetchImageAndIdData(text, settv, setid,setyaer_s),
        fetchImageAndIdData(text_m, setmovies, setidm,setyaer_m),
      ]);
  
      setshould(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  
  
  return (
    <>
    
      <div style={{textAlign:"left",marginLeft:"37px",fontFamily:"sans-serif",}}>
    
        <h1 >Discover the Most Popular TV Shows Today</h1>

    
      </div>
     
      
      <div style={{textAlign: "right", marginTop:"10px", marginBottom:"20px",marginRight:"10px"}}>
          <Button style={{fontSize:"1.2rem", width:"fit-content"}} onClick={handleFocus}>Load More</Button>
        </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
  {should ? ( 
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 40 }}
      style={{ marginLeft: "10px", marginRight: "20px" }}
      sx={{
        justifyContent: 'center', 
        '@media (max-width: 600px)': { 
          '& > *': {
            m: 1,
            width: '100%',
          },
        },
      }}
    >
      {Array.from(Array(10)).map((_, index) => (
        <Grid item xs={3} sm={4} md={4} key={index}>
         
          <Cards image={trendtv[index]} title={titles[index]} id={id[index]} year={year_s[index]} />

        </Grid>
      ))}
    </Grid>
  ) : ( 
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 40 }}
      style={{ marginLeft: "10px", marginRight: "20px" }}
      sx={{
       
        
       '@media (max-width: 600px)': { 
         '& > *': {
           m: 1,
           width: '100%',
           marginLeft:"100px"
         },
       },
     }}
    >
      {Array.from(Array(10)).map((_, index) => (
        <Grid item xs={3} sm={4} md={4} key={index} >
          <Stack spacing={1}>
            <Skeleton variant="rounded" width={120} height={160} animation="wave" sx={{ width: '100%' }}/>
            <Skeleton variant="rounded" width={120} height={50} animation="wave" sx={{ width: '100%' }}/>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )}
</div>


<div style={{textAlign:"left",marginLeft:"37px",fontFamily:"sans-serif",}}>
    
        <h1 style={{}}>Discover Trending Movies </h1> 
        <div style={{textAlign: "right", marginTop:"10px", marginBottom:"20px",marginRight:"10px"}}>
          <Button style={{fontSize:"1.2rem", width:"fit-content"}} onClick={handleFocus2}>Load More</Button>
        </div>

    
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
  {should ? ( 
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 40 }}
      style={{ marginLeft: "10px", marginRight: "20px",marginBottom:"20px" }}
      sx={{
        justifyContent: 'center', 
        '@media (max-width: 600px)': { 
          '& > *': {
            m: 1,
            width: '100%',
          },
        },
      }}
    >
      {Array.from(Array(10)).map((_, index) => (
        <Grid item xs={3} sm={4} md={4} key={index}>
          <Cards image={movies[index]} title={movti[index]} id={idm[index]} year={year_m[index]}/>
        </Grid>
      ))}
    </Grid>
  ) : ( 
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 40 }}
      style={{ marginLeft: "10px", marginRight: "20px",marginBottom:"20px" }}
      sx={{
       
        
        '@media (max-width: 600px)': {
          '& > *': {
            m: 1,
            width: '100%',
            marginLeft:"100px"
          },
        },
      }}
    >
      {Array.from(Array(10)).map((_, index) => (
        <Grid item xs={3} sm={4} md={4} key={index}>
          <Stack spacing={1}>
            <Skeleton variant="rounded" width={120} height={160} animation="wave" sx={{ width: '100%' }} />
            <Skeleton variant="rounded" width={120} height={50} animation="wave"  sx={{ width: '100%' }}/>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )}
</div>

    </>
  );
}

export default Tending;
