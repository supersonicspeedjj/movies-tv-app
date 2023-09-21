import Button from "@mui/material/Button";
import * as React from "react";
import { useState, useRef } from "react"; // Import useRef
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Cards from "./Cards";
import Grid from '@mui/material/Grid';
import alter from "./cinema.jpg"
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

function Searchcomp(props) {
  const [message, setmessage] = useState("");
  const [title, settitle] = useState("");
  const [image, setimage] = useState([]);
  const [results, setresults] = useState(1);
  const [load, setload] = useState(false);
  const [id,setid] = useState([]);
  const [year,setyear] = useState([]);
  const navigate = useNavigate(); // Initialize navigate from React Router
  const inputRef = useRef(null); // Create a ref for the text field

  const handleChange = (event) => {
    setmessage(event.target.value);
  };

  const handleFocus = () => {
    navigate("/search"); // Redirect to /search when the text field is focused
    
  };
  
  async function caller() {
    try {
      console.log(message);
      props.changer();
      const response = await fetch(
        `http://www.omdbapi.com/?s=${message}&apikey=119048c4&plot=full`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();

      const titles = data.Search.map((itera) => itera.Title);
      const images = data.Search.map((itera) => itera.Poster);
      const imdb = data.Search.map((itera) => itera.imdbID);
      const yt = data.Search.map((itera)=>itera.Year);
      setyear(yt);
      console.log(data);
      settitle(titles);
      setimage(images);
      setid(imdb)
      setresults(data.totalResults > 10 ? 10 : data.totalResults);
      setload(true);

      // Set focus back to the text field
     
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <div>
      
      <TextField
        label="search"
        onChange={handleChange}
        onFocus={handleFocus} // Redirect to /search when the text field is focused
        inputRef={inputRef} // Pass the ref to the text field
      />
      <Button variant="contained" startIcon={<SearchIcon />} onClick={caller}>
        search
      </Button>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 20 }} style={{ marginLeft: '10px', marginRight: '20px' }}>
          {load && Array.from(Array(results)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Cards image={image[index] === "N/A" ? alter : image[index]} title={title[index]} id={id[index]} year={year[index]}/>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Searchcomp;
