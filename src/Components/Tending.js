import { useState,useEffect } from "react";

import React from 'react'
import Cards from "./Cards";
import Grid from '@mui/material/Grid';
function Tending() {
    const [trendtv,settv]=useState([]);
    const [should,setshould]=useState(false);
      useEffect(() => {
        // eslint-disable-next-line 
        
      
        fetchData();
      },[] );
      async function fetchData() {
          try {
            function getStrBeforeColon(str) {
                for (var i = 0; i < str.length; i++) {
                  if (str[i] === ':') {
                    return str.slice(0, i);
                  }
                }
                return str;
              }
            const url1 = `https://trend-api-git-master-supersonicspeedjj.vercel.app`;
            const data = await fetch(url1);
            const processed_data = await data.json();
            
          const text=processed_data.map((itera)=>itera.text);
          const images=[];
         //   console.log(imgdata)
          for(let i=0;i<10;i++){
            const data=await fetch ( `http://www.omdbapi.com/?s=${getStrBeforeColon(text[i])}&apikey=119048c4`)
            const processed_data = await data.json()
           images.push(processed_data.Search[0].Poster);
            
           
         }
         settv(images);
         setshould(true)
          } 
           
          catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        let j=0;
      return (
        <div style={{display:'flex',flexDirection:"row"}}>
    
           {should&&Array.from(Array(10)).map((_, index) => (
        <Grid item xs={4} sm={5} md={5} key={index} style={{margin:"auto"}}>
    {/* //{console.log(trendtv)} */}
         <Cards image={trendtv[index]}/>
         
        </Grid>
           ))}
        </div>
      )
    }
    

export default Tending



  