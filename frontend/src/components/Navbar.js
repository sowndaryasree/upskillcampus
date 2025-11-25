import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  }
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div style={{margin: '12px 0 18px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <div>
        <Link to="/">Home</Link> &nbsp; • &nbsp; <Link to="/driver">Driver</Link>
      </div>
      <div>
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            &nbsp; • &nbsp; <span style={{marginRight:8}}>Hi, {user.name || user.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/auth"><button style={{marginLeft:8}}>Login</button></Link>
        )}
      </div>
    </div>
  );
}
