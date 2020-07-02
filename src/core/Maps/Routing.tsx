
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Map, MapLayer, withLeaflet, ContextProps, LeafletContext, MapLayerProps, MapControl } from 'react-leaflet';
import { IMaps } from '../../models/maps';
import { Component } from 'react';
import { RouterProps } from 'react-router';
import MapComponent from '../MapComponent';

// class Routing extends MapLayer {
//     constructor(props: MapLayerProps) {
//         super(props);
//     }

//     createLeafletElement(this.props) {
//         const { map } = this.props.leaflet as LeafletContext;
//         let leafletElement = L.Routing.control({
//             waypoints: [
//                 L.latLng(16.506, 80.648),
//                 L.latLng(17.384, 78.4866),
//                 L.latLng(12.971, 77.5945)
//             ],
//             lineOptions: {
//                 styles: [
//                     {
//                         color: 'blue',
//                         opacity: 0.6,
//                         weight: 4
//                     }
//                 ]
//             },
//             // addWaypoints: false,
//             // draggableWaypoints: false,
//             fitSelectedRoutes: false,
//             showAlternatives: false
//         }).addTo(map.lea);

//         return leafletElement.getPlan();
//     }
// }

// const Routing: React.ComponentType<MapLayer> = (props: MapLayerProps) => {
//     const { map } = props.leaflet as LeafletContext;
//     createLeafletElement() {
//         const { map } = this.props.leaflet
//         let leafletElement = L.Routing.control({
//             waypoints: [
//                 L.latLng(16.506, 80.648),
//                 L.latLng(17.384, 78.4866),
//                 L.latLng(12.971, 77.5945)
//             ],
//             lineOptions: {
//                 styles: [
//                     {
//                         color: 'blue',
//                         opacity: 0.6,
//                         weight: 4
//                     }
//                 ]
//             },
//             // addWaypoints: false,
//             // draggableWaypoints: false,
//             fitSelectedRoutes: false,
//             showAlternatives: false
//         }).addTo(map.lea);

//         return leafletElement.getPlan();
//     }
// };

export default withLeaflet(MapComponent);