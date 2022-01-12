import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function SimpleMap () {

  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [defaultzoom, setzoom] = useState(11);

  useEffect(() => {
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        // setcenter({...center,latitude:position.coords.latitude,longitude:position.coords.longitude})
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        
        // setcenter({...center,longitude:position.coords.longitude});
        // console.log(position.coords.latitude)
      })  
    }

  }, [])

  const center = {lat: 28,lng:77}


  // const center = {latitude:latitude, longitude:longitude}
  console.log(latitude)

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '250px', width: '80%', margin:'auto' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyDI1I19b290z6gtZeBWKTiadyd4TsL9j3o' }}
          defaultCenter={center}
          defaultZoom={defaultzoom}
        >
          {/* <AnyReactComponent
            lat={13.955413}
            lng={11.337844}
            text="My Marker"
          /> */}
        </GoogleMapReact>
      </div>
    );
  }

export default SimpleMap;