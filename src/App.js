import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [position,setPosition]=useState(null);
  const [cityName,setCityName]=useState();
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        async (position)=>{
          const {latitude,longitude}=position.coords;
          setPosition({latitude,longitude});
          try{
            const response= await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=08ae2d8d6b824aa5bf4a62967b654925&q=${latitude}+${longitude}&pretty=1`)
        console.log(response);
            setCityName(response.data.results[0].formatted)
           }catch(error){
            console.log('Error getting city',error)
           }
        }
      );
    }

    
  },[])
 
 
      

  return (
    <div className="App">
     <h1>Here the Geolocation of User With Co-ordinates</h1>
     {position?<p><b>latitude/longitude : </b> { position.latitude}/ { position.longitude}  </p>: <p>Not Found</p> }
{cityName?<p><b>City Name : </b>{cityName}</p> :<p>Not Found</p>}
    </div>
  );
}

export default App;
