import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";



const fetchtrending = createAsyncThunk("fetchtrending", async () => {
  // const response = await fetch(`https://trend-api-git-master-supersonicspeedjj.vercel.app` );
  // const data = await response.json();
  // return data;
  var trendtv=[]

  var movies=[]
  
  var year_s=[]
  var year_m=[]
  var id=[]
  var idm=[]
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

 
  // setmovti(text_m);

  const fetchImageAndIdData = async (
    titlesArray,
    identifier
  ) => {
    const imageAndIdRequests = titlesArray
      .map(async (title) => {
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
    const year = imageAndIdData.map((item) => item.year);

    if(identifier===1){
  
      trendtv=trendtv.concat(images)
    
      id = id.concat(ids);
  
      year_s = year_s.concat(year);
      console.log(trendtv);
      console.log(id);
      console.log(year_s);
    }
    else{
    
      movies = movies.concat(images);
     
      idm = idm.concat(ids);
  
      year_m = year_m.concat(year);
      console.log(movies);
      console.log(idm);
      console.log(year_m);
    }
  };

await Promise.all([
    
   fetchImageAndIdData(text, 1),
 fetchImageAndIdData(text_m, 2),

]);



  return [id, trendtv, year_s, text,idm, movies, year_m, text_m];
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchtrending.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchtrending.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchtrending.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { fetchtrending };
export default dataSlice.reducer;
