import { useState,useEffect } from "react";
import './App.css';
import Navbar from './Components/Navbar';
import Searchcomp from './Components/Searchcomp';
import Tending from './Components/Tending';



function App() {

  


  return (
    <div className="App" >
     <Navbar></Navbar>
     <Searchcomp></Searchcomp>
    <Tending></Tending>
    </div>
  );
}

export default App;
