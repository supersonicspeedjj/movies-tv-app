import React, { memo, useEffect } from 'react'
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "./Cards";
import Grid from "@mui/material/Grid";
const Particular = memo(() => {
    
    const [titles_tv, settitles_tv] = useState([]);
    const [trendtv, settv] = useState([]);
    const {type} = useParams();
    const [id,setid] = useState([]);
    const [year_s,setyaer_s] = useState([]);
   
    const [should, setshould] = useState(false);
    function getStrBeforeColon(str) {
        for (var i = 0; i < str.length; i++) {
          if (str[i] === ":") {
            return str.slice(0, i);
          }
        }
        return str;
      }


    useEffect( () => {
       // eslint-disable-next-line
        fetchData();
        // eslint-disable-next-line
    }, []);
    
    async function fetchData() {
        setshould(false);
        if(type==="movies"){
            const url = `https://trend-api-git-master-supersonicspeedjj.vercel.app/movies`;
            const response = await fetch(url);
            const data = await response.json();
            const text = data.map((itera) => itera.text);
            settitles_tv(text);
      
            const fetchImageAndIdData = async (titlesArray, setImagesFunc, setIdFunc, setyaer_s) => {
                const imageAndIdRequests = titlesArray.map(async (title) => {
                  const response = await fetch(
                    `https://www.myapifilms.com/imdb/idIMDB?title=${getStrBeforeColon(
                      title
                    )}&token=15ae760f-f258-4187-9094-ea43a5284e4f`
                  );
                  const imageData = await response.json();
          
                  return {
                    idIMDB: imageData.data.movies[0].idIMDB,
                    urlPoster: imageData.data.movies[0].urlPoster,
                    year: imageData.data.movies[0].year,
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
                   
                  ]);
                  setshould(true);
        }
        else if(type==="tv"){
            const url = `https://trend-api-git-master-supersonicspeedjj.vercel.app`;
            const response = await fetch(url);
            const data = await response.json();
            const text = data.map((itera) => itera.text);
            settitles_tv(text);
          
            const fetchImageAndIdData = async (titlesArray, setImagesFunc, setIdFunc, setyaer_s) => {
                const imageAndIdRequests = titlesArray.map(async (title) => {
                  const response = await fetch(
                    `https://www.myapifilms.com/imdb/idIMDB?title=${getStrBeforeColon(
                      title
                    )}&token=15ae760f-f258-4187-9094-ea43a5284e4f`
                  );
                  const imageData = await response.json();
          
                  return {
                    idIMDB: imageData.data.movies[0].idIMDB,
                    urlPoster: imageData.data.movies[0].urlPoster,
                    year: imageData.data.movies[0].year,
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
                   
                  ]);
                  setshould(true);
        }
    
    }
  return (
    <div>
      

{should ? ( 
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 37.5 }}
      style={{ marginLeft: "10px", marginRight: "20px",marginTop:"20px" ,marginBottom:"20px" }}
    >
      {Array.from(Array(25)).map((_, index) => (
        <Grid item xs={3} sm={4} md={4} key={index}>
         
          <Cards image={trendtv[index]} title={titles_tv[index]} id={id[index]} year={year_s[index]} />

        </Grid>
      ))}
    </Grid>
  ) : ( 
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 37.5 }}
      style={{ marginLeft: "10px", marginRight: "20px",marginTop:"20px",marginBottom:"20px" }}
    >
      {Array.from(Array(25)).map((_, index) => (
        <Grid item xs={3} sm={4} md={4} key={index} >
          <Stack spacing={1}>
            <Skeleton variant="rounded" width={120} height={160} animation="wave" />
            <Skeleton variant="rounded" width={120} height={50} animation="wave" />
          </Stack>
        </Grid>
      ))}
    </Grid>
  )}


    </div>
  )
});

export default Particular
