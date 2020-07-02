import * as L from 'leaflet';
import React, { createRef, useEffect, useRef } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';
import Routing from './Maps/Routing';

const MapComponent = () => {
  const mapContainer = useRef(null);

  const markers = [
    {
      type: 'Feature',
      properties: {
        PARK_ID: 960,
        NAME: 'Bearbrook Skateboard Park',
        DESCRIPTIO: 'Flat asphalt surface, 5 components'
      },
      geometry: {
        type: 'Point',
        coordinates: [77.514134, 10.458026]
      }
    },
    {
      type: 'Feature',
      properties: {
        PARK_ID: 1219,
        NAME: 'Bob MacQuarrie Skateboard Park (SK8 Extreme Park)',
        DESCRIPTIO: 'Flat asphalt surface, 10 components, City run learn to skateboard programs, City run skateboard camps in summer'
      },
      geometry: {
        type: 'Point',
        coordinates: [77.971440, 10.376986]
      }
    }
  ];

  const attribution = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>';

  React.useEffect(() => {
    const map: L.Map = L.map('map-container');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: attribution
    }).addTo(map);
    map.setView([17.4, 78.4], 12);
    const waypoints = [
      L.latLng(16.506, 80.648),
      L.latLng(17.384, 78.4866),
      L.latLng(12.971, 77.5945)
    ];

    const mapControl = L.Routing.control({
      plan: L.Routing.plan(waypoints, {
        createMarker: (i, wp) => {
          return L.marker(wp.latLng, {
            draggable: false
          });
        }
      }),
      lineOptions: {
        styles: [
          {
            color: 'red',
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      fitSelectedRoutes: false,
      showAlternatives: false,
      show: false
    }).addTo(map);

    map.addControl(mapControl);    

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });
  }, []);

  return (
    <div id="map-container" style={{ height: 500, width: 500 }} />
  );
};

export default MapComponent;