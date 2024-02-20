import { useState } from "react";
import './App.css';
import Navbar from './Components/Navbar';
import Searchcomp from './Components/Searchcomp';
import Tending from './Components/Tending';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./Components/Details";
import Particular from "./Components/Particular";
import clevertap from "clevertap-web-sdk";




function App() {
  const [visible, setvisible] = useState(true);

  function changer() {
    visible ? setvisible(false) : setvisible(true);
  }

  document.body.style.backgroundColor = "#EDBB7C";

  return (
     
    <div className="App">
      {/* Provide the Redux store to the Provider */}

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/particular/:title/:year/:id"
              element={
                <div>
                  <Searchcomp changer={changer} />
                  <Details />
                </div>
              }
              />
            <Route
              path="/"
              element={
                <div>
                  <Searchcomp changer={changer} />
                  <Tending />
                </div>
              }
              />
            <Route
              path="/search"
              element={<Searchcomp changer={changer} />}
              />
            <Route
              path="/particular/:type"
              element={
                <div>
                  <Searchcomp changer={changer} />
                  <Particular />
                </div>
              }
              />
          </Routes>
        </BrowserRouter>
      
    </div>
              
  );
}

export default App;
