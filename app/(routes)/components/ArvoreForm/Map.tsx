"use client";
import mapboxgl from "mapbox-gl";
import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPinIcon, PinIcon } from "lucide-react";

const MapId = ({ setLatLong }: any) => {
  const mapLib = import("mapbox-gl");
  const [viewState, setViewState] = useState({
    latitude: 41.805529334009485,
    longitude: -6.7647223337367235,
    zoom: 14,
  });

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 41.805529334009485,
    longitude: -6.7647223337367235,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewState((prevState) => ({
        ...prevState,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 14,
      }));
      setMarkerPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  const handleMove = useCallback(
    (evt: {
      viewState: React.SetStateAction<{
        latitude: number;
        longitude: number;
        zoom: number;
      }>;
    }) => {
      setViewState(evt.viewState);
    },
    [],
  );

  const handleMapClick = useCallback(
    (e: { lngLat: { lat: any; lng: any } }) => {
      const newLatLong = { latitude: e.lngLat.lat, longitude: e.lngLat.lng };
      setMarkerPosition(newLatLong);
      setLatLong(newLatLong);
    },
    [setLatLong],
  );

  return (
    <div className="flex items-center justify-center">
      <Map
        mapboxAccessToken="pk.eyJ1IjoiZGF2aWRjYWxob3VuIiwiYSI6ImNraXlxaW8wMTB4MXIyeG02aDZzbnBxcmkifQ.OOxFfzUTBphTe1wEZqhjnw"
        //@ts-ignore
        mapLib={mapLib}
        {...viewState}
        onMove={handleMove}
        style={{ width: "100%", height: "400px" }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        onClick={handleMapClick}
      >
        <Marker
          longitude={markerPosition.longitude}
          latitude={markerPosition.latitude}
        >
          <MapPinIcon size={50} fill="true" color="red" />
        </Marker>
      </Map>
    </div>
  );
};

export default MapId;
