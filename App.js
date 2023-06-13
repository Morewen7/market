import React, {useEffect, useMemo, useState} from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";
import Navbar from "./components/UI/Navbar/Navbar";

import './styles/App.css'

function App() {
    return (
      <BrowserRouter>
          <Navbar/>
          <AppRouter/>
      </BrowserRouter>
    )
}

export default App;