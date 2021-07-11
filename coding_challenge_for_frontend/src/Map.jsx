import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ ...props }) => {
    const { selectedUser } = props;
    const [map, setMap] = useState({
        width: '500px',
        height: '500px',
        zoom: 1,
        pitch: 25
    });
    return (
        <div className='border bg-secondary p-5 rounded'>
            <ReactMapGL
                className='rounded'
                {...map}
                mapboxApiAccessToken='pk.eyJ1IjoiYWJoaWEiLCJhIjoiY2txejUwcHlqMHhpcjJwbng5bXBudWhsaSJ9.ifakjr_TI2EZI9kjHgE81w'
                mapStyle='mapbox://styles/abhia/ckqz42ldycllw18o99nkt9fbo'
                onViewportChange={(viewport) => {
                    setMap(viewport);
                }}
            >
                {selectedUser.lng && (
                    <Marker latitude={selectedUser?.lat} longitude={selectedUser?.lng} offsetTop={(-map.zoom * 4) / 2} >
                        <div>
                            <img src="https://img.icons8.com/material-outlined/24/000000/marker.png" />
                        </div>
                    </Marker>
                )}
            </ReactMapGL>
        </div>
    );
};

export default Map;