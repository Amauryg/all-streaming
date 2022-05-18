import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import AccountIndex from './components/accounts/Index';
import AccountCreate from './components/accounts/Create';
import AccountEdit from './components/accounts/Edit';
import ServiceIndex from './components/services/Index';
import ServiceCreate from './components/services/Create';
import ServiceEdit from './components/services/Edit';

export default function App(){
  return(
    <BrowserRouter>
       <Navbar />
       <div className="container mt-3">
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/accounts/' element={<AccountIndex />}></Route>
          <Route path='/accounts/create' element={<AccountCreate />}></Route>
          <Route path='/accounts/edit/:id' element={<AccountEdit />}></Route>

          <Route path='/services/' element={<ServiceIndex />}></Route>
          <Route path='/services/create' element={<ServiceCreate />}></Route>
          <Route path='/services/edit/:id' element={<ServiceEdit />}></Route>

          <Route path='*' element={<div>Not Found</div>}></Route>
        </Routes>
       </div>
    </BrowserRouter>
  );

}
