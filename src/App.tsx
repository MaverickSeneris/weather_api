import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import GeoLocationForm from './components/locationForm'



function App() {


  return (
    <div className='h-screen flex items-center justify-center bg-blue-500 '>
      <GeoLocationForm/>
    </div>
  )
}

export default App