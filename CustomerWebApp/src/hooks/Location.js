/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import { usePosition } from "use-position";

function useLocation() {
  Geocode.setApiKey("AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA");
  Geocode.setLanguage("en");
  Geocode.enableDebug();

  const [permissionError, setPermissionError] = useState("");
  const { latitude, longitude, error } = usePosition(true, { enableHighAccuracy: true });
  const [location, setLocation] = useState();

  useEffect(() => {
    setPermissionError("");
    if ("geolocation" in navigator) {
      (async () => {
        await getAddress();
      })();
    } else {
      setPermissionError("Permission is not granted");
    }
  }, [latitude, error]);

  const geocodingLocation = async (lat, lng, setFunction) => {
    try {
      const locationName = await Geocode.fromLatLng(lat, lng);
      return locationName.results[0].formatted_address;
    } catch (e) {
      console.error(error);
      return null;
    }
  };

  const getAddress = async () => {
    if (!latitude) {
      setPermissionError("Invalid Location");
      return;
    }
    const locationName = await geocodingLocation(latitude, longitude);
    if (locationName)
      setLocation({
        label: "Home",
        latitude: latitude,
        longitude: longitude,
        deliveryAddress: locationName,
      });
  };

  return {
    loading: !!error || !!permissionError ? false : !!location ? false : true,
    error: error || permissionError,
    location,
    updateError: setPermissionError,
    geoCodeCoordinates: geocodingLocation,
  };
}
export default useLocation;
