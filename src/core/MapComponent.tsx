import * as L from 'leaflet';
import React, { useRef } from 'react';
import 'leaflet-routing-machine';


const MapComponent = (props: any) => {
  const { date } = props

  const divId = "map-container-" + date;

  const mapContainer = useRef(null);


  const attribution = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>';

  const leafletMap = () => {

    const map: L.Map = L.map(divId);

   
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: attribution
    }).addTo(map);

    map.setView([16.506, 80.648], 6);

    const waypoints = [
      L.latLng(16.506, 80.648),
      L.latLng(17.384, 78.4866),
      L.latLng(12.971, 77.5945)
    ];

    let marker = L.marker([16.506, 80.648]);
    marker.addTo(map);

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
            color: 'blue',
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
  }

  React.useEffect(() => {
    leafletMap();
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });

  }, []);

  return (
    <div id={divId} style={{ height: 500 }} ref={mapContainer} />
  );
};

export default MapComponent;