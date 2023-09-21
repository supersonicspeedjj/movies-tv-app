import { useState } from "react";
import './App.css';
import Navbar from './Components/Navbar';
import Searchcomp from './Components/Searchcomp';
import Tending from './Components/Tending';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./Components/Details";



function App() {
  const [visible,setvisible]=useState(true);
  function changer(){
    visible?setvisible(false):setvisible(true);
  }
  document.body.style.backgroundColor=" #EDBB7C";


  return (
   
    <div className="App" >
     <BrowserRouter>
     <Navbar></Navbar>
     {/* <Searchcomp changer={changer}></Searchcomp> */}
	<Routes>
		<Route path="/particular/:title/:year/:id" element={<div> <Searchcomp changer={changer}></Searchcomp><Details /></div>}/> 
    <Route path='/'element={<div> <Searchcomp changer={changer}></Searchcomp><Tending></Tending></div>}/>
    <Route path='/search' element={<Searchcomp changer={changer}></Searchcomp>}></Route>
	</Routes>
    
</BrowserRouter>
    </div>
  );
}

export default App;
