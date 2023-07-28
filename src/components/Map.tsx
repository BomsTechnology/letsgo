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
import {
  makeRouting,
  reverseGeocode,
  setCurrLocation,
} from "@services/useLocalization";
import { showError } from "@functions/helperFunctions";
import { setDeparture, setDestination } from "@services/useSearchPlace";

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
  routing: RoutingProps | null;
  setRouting: Function;
}

const Map = ({ routing, setRouting }: MapProps) => {
  const localisationState = useAppSelector(
    (state: RootState) => state.localization
  );
  const dispatch = useAppDispatch();
  const mapViewRef = useRef<MapView>(null);
  const [isDragDepart, setIsDragDepart] = React.useState(false);
  const [initialRegion, setInitialRegion] = React.useState<RegionProps>({
    latitude: 3.8602350654752446,
    longitude: 11.496420340855604,
    latitudeDelta: 0.08807001831917738,
    longitudeDelta: 0.043830983340740204,
  });
  const [departureCoord, setDepartureCoord] = React.useState<
    LatLng | undefined
  >();
  const [destinationCoord, setDestinationCoord] = React.useState<
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

  const onDragEndDeparture = async (coord: LatLng) => {
    await reverseGeocode(coord)
      .then(async (data) => {
        await dispatch(
          setDeparture({
            type: "DepartureLocation",
            properties: {
              name: data[0].name!,
              country: data[0].country!,
              postcode: data[0].postalCode!,
              street: data[0].street!,
              housenumber: data[0].streetNumber!,
              state: data[0].city!,
              countrycode: data[0].isoCountryCode!,
            },
            geometry: {
              coordinates: [coord.longitude, coord.latitude],
              type: "Point",
            },
          })
        ).unwrap()
          .then(async (data) => {
            
          });
      })
      .catch((error) => {
        showError(error);
      });
  };

  const onDragEndDestination = async (coord: LatLng) => {
    await reverseGeocode(coord)
      .then(async (data) => {
        await dispatch(
          setDestination({
            type: "DestinationLocation",
            properties: {
              name: data[0].name!,
              country: data[0].country!,
              postcode: data[0].postalCode!,
              street: data[0].street!,
              housenumber: data[0].streetNumber!,
              state: data[0].city!,
              countrycode: data[0].isoCountryCode!,
            },
            geometry: {
              coordinates: [coord.longitude, coord.latitude],
              type: "Point",
            },
          })
        ).unwrap()
          .then(async (data) => {
            
        });
      })
      .catch((error) => {
        showError(error);
      });
  };

  const onMapReady = async () => {};

  useEffect(() => {
    setInitialRegion({
      latitude: localisationState.currentLocation?.geometry.coordinates[0]!,
      longitude: localisationState.currentLocation?.geometry.coordinates[1]!,
      latitudeDelta: 0.04807001831917738,
      longitudeDelta: 0.033830983340740204,
    });
    setDepartureCoord({
      latitude: localisationState.currentLocation?.geometry.coordinates[0]!,
      longitude: localisationState.currentLocation?.geometry.coordinates[1]!,
    });
    setPois([]);
  }, []);

  useEffect(() => {
    makeRoute();
  }, [routing]);

  const makeRoute = async () => {
    let polyline: LatLng[] = [];
    if (routing) {
      routing.features[0].geometry.coordinates.map((coord) => {
        polyline.push({
          latitude: coord[1],
          longitude: coord[0],
        });
      });
      setPolylineCoords(polyline);

      setInitialRegion({
        latitude: polyline[0].latitude,
        longitude: polyline[0].longitude,
        latitudeDelta: 0.08807001831917738,
        longitudeDelta: 0.043830983340740204,
      });
      setDepartureCoord(polyline[0]);
      setDestinationCoord(polylineCoords[polylineCoords.length - 1]);
    }
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
            onDragEnd={(e) => onDragEndDeparture(e.nativeEvent.coordinate)}
          />
        )}
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
        {destinationCoord && (
          <Marker
            pinColor={Colors.primaryColor}
            draggable={true}
            title={localisationState.destination?.properties.name}
            description={localisationState.destination?.properties.country}
            coordinate={destinationCoord}
            onDragEnd={(e) => onDragEndDestination(e.nativeEvent.coordinate)}
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
