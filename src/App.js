import './App.css';
import {
    GoogleMap,
    useJsApiLoader,
    StandaloneSearchBox,
    Marker,
} from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLocation } from './redux/locationsSlice';
import LocationList from './LocationList';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function App() {
    const inputRef = useRef(null);
    const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
    const [markerPosition, setMarkerPosition] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
        libraries: ['places'],
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: latitude, lng: longitude });
                    setMarkerPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error fetching user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    const handleOnPlacesChanged = () => {
        let places = inputRef.current.getPlaces();

        if (places.length > 0) {
            const place = places[0];
            const location = place.geometry.location;
            const newCenter = {
                lat: location.lat(),
                lng: location.lng(),
            };

            setCenter(newCenter);
            setMarkerPosition(newCenter);
            setInputValue(place.formatted_address);

            dispatch(
                addLocation({
                    name: place.name,
                    address: place.formatted_address,
                    lat: newCenter.lat,
                    lng: newCenter.lng,
                })
            );
        }
    };

    const updateMapCenter = (lat, lng) => {
        const newCenter = { lat, lng };
        setCenter(newCenter);
        setMarkerPosition(newCenter);
    };

    return (
        <div>
            {isLoaded && (
                <>
                    <StandaloneSearchBox
                        onLoad={(ref) => (inputRef.current = ref)}
                        onPlacesChanged={handleOnPlacesChanged}
                    >
                        <Input
                            placeholder='Start typing your address'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className='search-input-box'
                            suffix={<SearchOutlined />}
                        />
                    </StandaloneSearchBox>

                    <LocationList updateMapCenter={updateMapCenter} />

                    <GoogleMap
                        zoom={10}
                        center={center}
                        mapContainerClassName='map-container'
                    >
                        {markerPosition && <Marker position={markerPosition} />}
                    </GoogleMap>
                </>
            )}
        </div>
    );
}

export default App;
