import React from 'react'


//import requests from './Requests/Request'
import "./App.css"
import ShowMovie from './components/ShowMovie'
import {Routes, Route} from 'react-router-dom'
import Cate from './components/pages/Cate'

import Register from './components/Register'
import Login from './components/Login'
import Manage from './components/Manage'



function App() {
  return (
      <Routes>
        <Route path="/Cate" element={<Cate/>}/>
        
        <Route path="/Browse" element={<ShowMovie/>}/>
        //NEW
        <Route path="/" element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Manage" element={<Manage/>}/>
      </Routes>
  )
}

export default App
