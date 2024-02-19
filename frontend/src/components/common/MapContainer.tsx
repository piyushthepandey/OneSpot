import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

interface GoogleMapProps {
  location: string; // Assuming location is a string
}

const MapContainer: React.FC<GoogleMapProps> = ({ location }) => {
  const apiKey = "AIzaSyBkhnDfrdLoY7xt9JkRMRGwSbCD2vZFJjw";
  const [housingLocationCoords, setHousingLocationCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const northeasternUniversityCoords = { lat: 42.3398, lng: -71.0892 };

  useEffect(() => {
    // Function to get coordinates from location using the Geocoding API
    const getCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
          )}&key=${apiKey}`
        );

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const locationCoords = data.results[0]?.geometry?.location;

          if (locationCoords) {
            setHousingLocationCoords({
              lat: locationCoords.lat,
              lng: locationCoords.lng,
            });
          } else {
            console.error(
              "Error: Unable to retrieve location coordinates from the response."
            );
          }
        } else {
          console.error("Error: No results found in the response.");
        }
      } catch (error) {
        console.error("Error getting coordinates:", error);
      }
    };

    getCoordinates();
  }, [location, apiKey]);

  const calculateDistance = (
    lat1: any,
    lon1: any,
    lat2: number,
    lon2: number
  ) => {
    try {
      // Earth radius in kilometers
      const R = 6371;
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      // Distance in kilometers
      const distance = R * c;

      return distance;
    } catch (error: any) {
      return null;
    }
  };

  const toRadians = (degree: number) => {
    return (degree * Math.PI) / 180;
  };

  const updatedhousingLocationCoords = {
    lat: housingLocationCoords?.lat,
    lng: housingLocationCoords?.lng,
  };

  const distance = calculateDistance(
    updatedhousingLocationCoords?.lat,
    updatedhousingLocationCoords?.lng,
    northeasternUniversityCoords?.lat,
    northeasternUniversityCoords?.lng
  );

  return (
    <div style={{ height: "200px", width: "100%", padding: "20px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={northeasternUniversityCoords}
        defaultZoom={15}
      >
        <Marker
          lat={northeasternUniversityCoords.lat}
          lng={northeasternUniversityCoords.lng}
          color="blue"
          text="Northeastern University"
        />

        {housingLocationCoords && (
          <Marker
            lat={housingLocationCoords.lat}
            lng={housingLocationCoords.lng}
            color="red"
            text="Housing Location"
          />
        )}
      </GoogleMapReact>

      {housingLocationCoords && distance != null && (
        <p>
          {" "}
          Distance to Northeastern University: {(distance as any)?.toFixed(
            2
          )}{" "}
          km
        </p>
      )}
    </div>
  );
};

export default MapContainer;
