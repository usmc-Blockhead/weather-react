import { useContext, useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import WeatherContext from '../context/weather.context';

const MapBackground = () => {
  const { place } = useContext(WeatherContext);
  const [center, setCenter] = useState({ lat: 51.5085, lng: -0.1257 }); // London default

  useEffect(() => {
    if (place) {
      setCenter({
        lat: parseFloat(place.lat.replace('N', '')),
        lng: parseFloat(place.lon.replace('W', '')) * -1
      });
    }
  }, [place]);

  const mapStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.3,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
        options={{
          disableDefaultUI: true,
          styles: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: [{ saturation: -100 }]
            }
          ]
        }}
      />
    </LoadScript>
  );
};

export default MapBackground;