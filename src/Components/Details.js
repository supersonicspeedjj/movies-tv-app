import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import Paper from "@mui/material/Paper";
import YouTube from "react-youtube";
function Details() {
  const { title } = useParams();
  const { id } = useParams();
  const { year } = useParams();
  const [poster, setposter] = useState([]);
  const [ytid, setytid] = useState();
  const [desc, setdesc] = useState("");
  const [category, setcategory] = useState("");
  const [should, setshould] = useState(false);  
  useEffect(() => {
    // eslint-disable-next-line

    loader();
    // eslint-disable-next-line
  }, []);
  async function loader() {
    try {
      setshould(false);
      const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=119048c4`;
      const url1 = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAbaxLNXK4HlcZ3Pg6zzMNJzThzNsgoxDo&q=${title}+${year}+official+trailer`;
      const response = await fetch(url);
      const response_yt = await fetch(url1);
      const data = await response.json();
      const data_yt = await response_yt.json();
      //console.log(data)
      setposter(data.Poster);
      setdesc(data.Plot);
      setcategory(data.Genre);
      setytid(data_yt.items[0].id.videoId);
      console.log(category);
      setshould(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          fontFamily="sans-serif"
          fontWeight="bolder"
        >
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       { should?(  <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "lightgray",
            borderRadius: "20px",
            padding: "20px",
            margin: "20px",
          }}
        >
        
        
         <img
            src={poster}
            alt={title}
            style={{
              height: "400px",
              width: "300px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <div style={{ marginLeft: "20px" }}>
            <Typography
              marginBottom={"-10px"}
              marginTop={"-30px"}
              textAlign={"left"}
            >
              <h1>Plot</h1>
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              fontFamily="sans-serif"
              textAlign="left"
              marginBottom="10px"
            >
              {desc}
            </Typography>
            <Typography
              variant="h6"
              fontFamily="sans-serif"
              textAlign="left"
              marginTop="-10px"
            >
              <h3>Genre - {category}</h3>
            </Typography>
            <h2 >Watch the Trailer</h2>
            <YouTube videoId={ytid} />;
          
          </div>
        </Paper>):(
            <div>
              <Skeleton variant="rounded" width={1200} height={450} animation="wave" sx={{ bgcolor: 'black.900' }} />
             

            </div>
          )}
      </Box>
    </div>
  );
}

export default Details;
