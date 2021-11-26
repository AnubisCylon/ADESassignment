import React from 'react'


//import requests from './Requests/Request'
import "./App.css"
import ShowMovie from './components/ShowMovie'
import {Routes, Route} from 'react-router-dom'
import Cate from './components/pages/Cate'



function App() {
  return (
      <Routes>
        <Route path="/Cate" element={<Cate/>}/>
        <Route path="/" element={<ShowMovie/>}/>
      </Routes>
  )
}

export default App
