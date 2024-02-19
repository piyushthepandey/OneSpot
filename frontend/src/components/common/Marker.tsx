// Marker.tsx
import React from "react";

interface MarkerProps extends React.HTMLProps<HTMLDivElement> {
  lat: number;
  lng: number;
  color: string;
  text: string;
}

const Marker: React.FC<MarkerProps> = ({ lat, lng, color, text, ...rest }) => (
  <div {...rest} style={{ color }}>
    {text}
  </div>
);

export default Marker;
