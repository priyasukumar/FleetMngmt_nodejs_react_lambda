
import * as L from "leaflet";
import "leaflet-routing-machine";
import { Map, MapLayer, withLeaflet, ContextProps, LeafletContext, MapLayerProps } from "react-leaflet";
import { IMaps } from "../../models/maps";
import { Component } from "react";
import { RouterProps } from 'react-router';


// class Routing extends MapLayer {
//     constructor(props:MapLayerProps){
//         super(props);
//     }

//     createLeafletElement() {
//       const { map } = this.props.leaflet
//       let leafletElement = L.Routing.control({
//         waypoints: [L.latLng(27.67, 85.316), L.latLng(27.68, 85.321)]
//       }).addTo(map.leafletElement);
//       return leafletElement.getPlan();
//     }
//   }


const Routing: any = (props: IMaps) => {
    const { Map } = props;
    debugger;
    let leafletElement = L.Routing.control({
        waypoints: [
            L.latLng(16.506, 80.648),
            L.latLng(17.384, 78.4866),
            L.latLng(12.971, 77.5945)
        ],
        lineOptions: {
            styles: [
                {
                    color: "blue",
                    opacity: 0.6,
                    weight: 4
                }
            ]
        },
        // addWaypoints: false,
        // draggableWaypoints: false,
        fitSelectedRoutes: false,
        showAlternatives: false
    }).addTo(props.Map.leafletElement);

    return leafletElement.getPlan();
}


export default withLeaflet(Routing);