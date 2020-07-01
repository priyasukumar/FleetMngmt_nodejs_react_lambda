import * as L from 'leaflet';
import React, { createRef, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import Routing from './Maps/Routing';



const MapComponent = () => {
    const [isMapInit, setMapState] = React.useState(false);
    const mapRef = createRef<Map>();

    React.useEffect(() => {
      debugger
        const L = require("leaflet");
    
        delete L.Icon.Default.prototype._getIconUrl;
    
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
        setMapState(true);
      }, []);

    const markers = [
        {
          type: "Feature",
          properties: {
            PARK_ID: 960,
            NAME: "Bearbrook Skateboard Park",
            DESCRIPTIO: "Flat asphalt surface, 5 components"
          },
          geometry: {
            type: "Point",
            coordinates: [77.514134, 10.458026]
          }
        },
        {
          type: "Feature",
          properties: {
            PARK_ID: 1219,
            NAME: "Bob MacQuarrie Skateboard Park (SK8 Extreme Park)",
            DESCRIPTIO: "Flat asphalt surface, 10 components, City run learn to skateboard programs, City run skateboard camps in summer"
          },
          geometry: {
            type: "Point",
            coordinates: [77.971440, 10.376986]
          }
        }
      ];

    let map: Map;

    const saveMap = (map: Map) => {
      map = map;
        setMapState(true);
    };

    //const divRef = React.useRef<Map>(null);
  

    return (
        <Map center={[17.4, 78.4]} zoom={12} style={{ height: 500, width:500 }} ref={saveMap}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {
                markers.map(park => (
                    <Marker
                        key={park.properties.PARK_ID}
                        position={[
                            park.geometry.coordinates[1],
                            park.geometry.coordinates[0]
                        ]}
                    // // onClick={() => {
                    // //     setActivePark(park);
                    // // }}
                    />
                ))
            }
            {isMapInit && <Routing {...map} />}
        </Map>
      );
}


export default MapComponent;