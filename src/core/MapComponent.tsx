import * as L from 'leaflet';
import React, { useRef } from 'react';
import 'leaflet-routing-machine';
import { ILocationProps, ILocationContainerProps } from '../models/location';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { LatLngExpression } from 'leaflet';

const MapComponent = (props: any) => {
  const { date, driverServiceModel } = props 

  const location = props.location as ILocationContainerProps;

  const divId = "map-container-" + driverServiceModel.DriverId + date;

  const mapContainer = useRef(null);

  const leafletMap = () => {
    const attribution = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>';

    const map: L.Map = L.map(divId);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: attribution
    }).addTo(map);

    map.setView([location.location[0].Latitude, location.location[0].Longitude], 8);

    const waypoint1 = L.latLng(38.889510,-77.032000)
    const waypoint2 = L.latLng(35.929673,-78.948237)

    var waypoints: L.LatLng[] = []

    
    location.location.map((locationDetail: ILocationProps) => {
      const waypoint = L.latLng(locationDetail.Latitude, locationDetail.Longitude)
      waypoints.push(waypoint);
      //latlngs.push([locationDetail.Latitude, locationDetail.Longitude])
    });

    let DefaultIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: shadowUrl,
      iconRetinaUrl: markerIcon
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    // var path = L.polyline(latlngs, { weight: 5, dashArray: [10, 20], color: 'blue', }).addTo(map);
    // map.addLayer(path);
    // map.fitBounds(path.getBounds());

    L.marker(waypoints[0],{
      title: "Driver: " + location.location[0].DriverName + " Vehicle: " + location.location[0].VehicleName
    }).addTo(map);

    var latlngs: LatLngExpression = [location.location[0].Latitude, location.location[0].Longitude];

    // L.popup({keepInView:true,autoClose:false})
    //   .setLatLng(latlngs)
    //   .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    //   .openOn(map);
  
    L.marker(waypoints[waypoints.length-1]).addTo(map);

    const latLng = L.latLng(0,0);
    const mapControl = L.Routing.control({
      plan: L.Routing.plan(waypoints, {
        createMarker: (i, wp) => {
          return L.marker(latLng);
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

  React.useEffect(
    () => {

     if (mapContainer.current) {
        leafletMap();
     }

      // L.Icon.Default.mergeOptions({
      //   iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
      //   iconUrl: 'leaflet/dist/images/marker-icon.png',
      //   shadowUrl: 'leaflet/dist/images/marker-shadow.png'
      // });

   

    }, []);

  return (
    <div id={divId} style={{ height: 500 }} ref={mapContainer} />
  );
};

export default MapComponent;