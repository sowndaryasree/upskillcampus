import React, {useState, useEffect} from 'react';
import { apiGet } from '../api/api';
import { Link } from 'react-router-dom';

export default function Home(){
  const [rests, setRests] = useState([]);
  useEffect(()=>{
    (async ()=>{
      const data = await apiGet('/api/restaurants');
      setRests(data || []);
    })();
  },[]);
  return (
    <>
      <h2>Restaurants</h2>
      {rests.length === 0 && <p className="card">No restaurants yet. Create some via Postman or the backend API.</p>}
      {rests.map(r => (
        <div key={r._id} className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <h3 style={{margin:'2px 0'}}><Link to={`/restaurant/${r._id}`}>{r.name}</Link></h3>
              <small>{r.description}</small>
            </div>
            <div>
              <div>{r.isOpen ? 'Open' : 'Closed'}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
