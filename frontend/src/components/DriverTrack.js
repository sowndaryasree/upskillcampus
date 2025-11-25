import React, { useState } from 'react';
import { apiGet, apiPost } from '../api/api';
import { getToken } from '../utils/helpers';

export default function DriverTrack(){
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [driverId, setDriverId] = useState('');
  const [location, setLocation] = useState(null);

  async function updateLocation(){
    const token = getToken();
    if(!token) return alert('Login as driver and set token in localStorage manually for now');
    const res = await apiPost('/api/drivers/update-location', { lat: Number(lat), lng: Number(lng) }, token);
    alert(JSON.stringify(res));
  }

  async function getLocation(){
    if(!driverId) return alert('Enter driver id (from DB)');
    const res = await apiGet(`/api/drivers/${driverId}/location`);
    setLocation(res);
  }

  return (
    <div>
      <h2>Driver (Manual) - Test</h2>
      <div className="card">
        <div>
          <input placeholder="lat" value={lat} onChange={e=>setLat(e.target.value)} />
          <input placeholder="lng" value={lng} onChange={e=>setLng(e.target.value)} />
          <button onClick={updateLocation}>Update my location</button>
        </div>
      </div>
      <div className="card">
        <div>
          <input placeholder="driverId" value={driverId} onChange={e=>setDriverId(e.target.value)} />
          <button onClick={getLocation}>Get driver location</button>
        </div>
        {location && <div>Lat: {location.lat} Lng: {location.lng}</div>}
      </div>
    </div>
  );
}
