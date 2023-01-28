import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import icon from "../images/icon-location.svg";
import L from "leaflet";

export default function MarkerPosition({ address }) {
  const iconLocation = L.icon({
    iconSize: [32, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: icon,
  });

  const position = [address.location.lat, address.location.lng];
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, position]);

  return (
    <Marker
      icon={iconLocation}
      position={[address.location.lat, address.location.lng]}
    >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
}
