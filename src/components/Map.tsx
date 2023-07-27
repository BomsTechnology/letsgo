import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, {
  LatLng,
  Marker,
  MarkerDragStartEndEvent,
  Polyline,
  UrlTile,
} from "react-native-maps";
import { RootState, useAppSelector, useAppDispatch } from "@store/store";
import Colors from "@constants/colors";
import RoutingProps from "../types/RoutingProps";
import { makeRouting, setCurrLocation } from "@services/useLocalization";
import { showError } from "@functions/helperFunctions";

interface RegionProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface PoiProps {
  title: string;
  location: { latitude: number; longitude: number };
  description: string;
}

interface MapProps {
  routing?: RoutingProps | undefined;
}

const Map = () => {
  const localisationState = useAppSelector(
    (state: RootState) => state.localization
  );
  const dispatch = useAppDispatch();
  const mapViewRef = useRef<MapView>(null);
  const [initialRegion, setInitialRegion] = React.useState<RegionProps>({
    latitude: 3.8602350654752446,
    longitude: 11.496420340855604,
    latitudeDelta: 0.08807001831917738,
    longitudeDelta: 0.043830983340740204,
  });
  const [departureCoord, setDepartureCoord] = React.useState<
    LatLng | undefined
  >();
  const [pois, setPois] = React.useState<PoiProps[]>([]);
  const [polylineCoords, setPolylineCoords] = React.useState<LatLng[]>([]);

  const onRegionChange = (region: RegionProps) => {
    //console.log(region);
  };

  const onRegionChangeComplete = (region: RegionProps) => {
   // console.log(region);
  };

  const showPois = () => {
    return pois.map((poi) => {
      return (
        <Marker
          key={poi.title}
          title={poi.title}
          description={poi.description}
          coordinate={poi.location}
        />
      );
    });
  };

  const onDragEnd = async (coord: LatLng) => {
    setDepartureCoord(coord);
    if(polylineCoords.length > 0){
     await  getRouting(coord);
    }
  };

  const onMapReady = async () => {
    
  }

  useEffect(() => {
    dispatch(setCurrLocation()).unwrap().then((data) => {
      setInitialRegion({
        latitude: data.geometry.coordinates[0]!,
        longitude: data.geometry.coordinates[1]!,
        latitudeDelta: 0.04807001831917738,
        longitudeDelta: 0.033830983340740204,
      });
      setDepartureCoord({
        latitude: data.geometry.coordinates[0]!,
        longitude: data.geometry.coordinates[1]!,
      });
    }).catch((error) => {
      
    });
    
    setPois([]);
  }, []);

  useEffect(() => {
    let polyline: LatLng[] = [];
    if (localisationState.routing && localisationState.routing.features) {
      localisationState.routing.features[0].geometry.coordinates.map((coord) => {
        polyline.push({
          latitude: coord[1],
          longitude: coord[0],
        });
      });
      setPolylineCoords(polyline);

      setInitialRegion({
        latitude: (localisationState.routing.bbox[3] + localisationState.routing.bbox[2]) / 2,
        longitude: (localisationState.routing.bbox[1] + localisationState.routing.bbox[0]) / 2,
        latitudeDelta: (localisationState.routing.bbox[1] - localisationState.routing.bbox[0]),
        longitudeDelta: (localisationState.routing.bbox[3] - localisationState.routing.bbox[2]),
      });
      setDepartureCoord(polyline[0]);
    }
  }, [localisationState.routing]);

  const getRouting = async (departure: LatLng) => {
    await dispatch(
      makeRouting({
        stops: [
          {
            lat: departure.latitude,
            lon: departure.longitude,
          },
          {
            lat: localisationState.destination?.geometry.coordinates[1]!,
            lon: localisationState.destination?.geometry.coordinates[0]!,
          },
        ],
        isPathRequest: true,
        responseType: "GEOJSON",
        includeInstructions: true,
      })
    )
      .unwrap()
      .then((data) => {
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        onRegionChange={onRegionChange}
        initialRegion={initialRegion}
        onRegionChangeComplete={onRegionChangeComplete}
        style={styles.map}
        ref={mapViewRef}
        onMapReady={onMapReady}
      >
        {departureCoord && (
          <Marker
            pinColor={Colors.secondaryColor}
            draggable={true}
            title={localisationState.departure?.properties.name}
            description={localisationState.departure?.properties.country}
            coordinate={departureCoord}
            onDragEnd={(e) => onDragEnd(e.nativeEvent.coordinate)}
          />
        ) }
        {showPois()}
        {/* 
          <UrlTile
            urlTemplate="https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            maximumZ={19}
        />*/}
        {polylineCoords.length > 0 && (
            <Polyline
              coordinates={polylineCoords}
              strokeColor={Colors.accentOrange}
              strokeWidth={6}
            />
          )}
          {polylineCoords.length > 0 && (
          <Marker
            pinColor={Colors.primaryColor}
            title={localisationState.destination?.properties.name}
            description={localisationState.destination?.properties.country}
            coordinate={polylineCoords[polylineCoords.length - 1]}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
