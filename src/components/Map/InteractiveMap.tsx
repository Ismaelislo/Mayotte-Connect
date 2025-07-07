import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapProps {
  center: [number, number];
  zoom: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    title: string;
    description?: string;
    type?: 'traffic' | 'alert' | 'tourist' | 'waste' | 'default';
  }>;
  height?: string;
  onMarkerClick?: (markerId: string) => void;
}

const InteractiveMap: React.FC<MapProps> = ({
  center,
  zoom,
  markers = [],
  height = '400px',
  onMarkerClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom marker icons
    const getMarkerIcon = (type: string) => {
      const iconColors = {
        traffic: '#FF6B6B',
        alert: '#FF4757',
        tourist: '#3742FA',
        waste: '#2ED573',
        default: '#40E0D0'
      };

      return L.divIcon({
        html: `<div style="
          background-color: ${iconColors[type as keyof typeof iconColors] || iconColors.default};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>`,
        className: 'custom-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
    };

    // Add markers
    markers.forEach(marker => {
      const leafletMarker = L.marker(marker.position, {
        icon: getMarkerIcon(marker.type || 'default')
      }).addTo(map);

      leafletMarker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold;">${marker.title}</h3>
          ${marker.description ? `<p style="margin: 0; font-size: 14px;">${marker.description}</p>` : ''}
        </div>
      `);

      if (onMarkerClick) {
        leafletMarker.on('click', () => onMarkerClick(marker.id));
      }
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, markers, onMarkerClick]);

  return (
    <div
      ref={mapRef}
      style={{ height, width: '100%' }}
      className="rounded-lg overflow-hidden shadow-lg"
    />
  );
};

export default InteractiveMap;