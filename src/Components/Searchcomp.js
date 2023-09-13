import Button from "@mui/material/Button";
import * as React from "react";
import { useState,useEffect } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
//import { Card } from "@mui/material";
import Cards from "./Cards";

function Searchcomp() {
  const [message, setmessage] =useState("");
  const [title, settitle]=useState("");
  const [image,setimage]=useState([]);
  
  const changer = (event) => {
    setmessage(event.target.value);
  };
  
  async function caller() {
    try {
      console.log(message)
      const response = await fetch(
        `http://www.omdbapi.com/?s=${message}&apikey=119048c4`
      );
        
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
    // const img=data.Search.map((itera)=>itera.image)
      const titles=data.Search.map((itera)=>itera.Title);
      const images=data.Search.map((itera)=>itera.Poster);
      settitle(titles)
      setimage(images)
      //console.log(titles)
      // console.log(response)
      // console.log(data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  

  
  return (
    <div>
      <TextField label="search" onChange={changer} />
      <Button variant="contained" endIcon={<SearchIcon />} onClick={caller}>
        search
      </Button>
      <div style={{display:"flex",flexDirection:"row"}}>
        <Cards title={title[0]} image={image[0]}></Cards>
      </div>
     
    </div>
  );
}

export default Searchcomp;
