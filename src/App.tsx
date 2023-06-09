import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ToDO from "./Pages/ToDO";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/todo" element={<ToDO />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
