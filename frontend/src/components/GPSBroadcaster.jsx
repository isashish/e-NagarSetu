import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { updateVehicleLocation } from '../api';

/**
 * GPSBroadcaster: 
 * If the logged-in user is STAFF and has an assigned vehicle,
 * this component runs in the background to send their GPS coordinates to the server.
 */
export default function GPSBroadcaster() {
    const { user } = useApp();

    useEffect(() => {
        // Only run for Staff with an assigned vehicle
        if (user?.role !== 'staff' || !user?.assignedVehicleId) return;

        console.log("GPS Broadcaster: Active for vehicle", user.assignedVehicleId);

        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }

        let lastUpdate = 0;
        const UPDATE_INTERVAL = 10000; // Update every 10 seconds

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const now = Date.now();
                if (now - lastUpdate > UPDATE_INTERVAL) {
                    const { latitude, longitude } = pos.coords;
                    console.log(`Broadcasting Location: ${latitude}, ${longitude}`);
                    
                    updateVehicleLocation(user.assignedVehicleId, latitude, longitude)
                        .catch(err => console.error("Broadcast failed:", err));
                    
                    lastUpdate = now;
                }
            },
            (err) => console.error("GPS Broadcast Error:", err),
            { 
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 10000 
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [user]);

    return null; // Background component
}
