import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiGet } from '../api/api';
import { loadCart, saveCart } from '../utils/helpers';

export default function RestaurantPage(){
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [rest, setRest] = useState(null);

  useEffect(()=>{
    (async ()=>{
      const menuData = await apiGet(`/api/restaurants/${id}/menu`);
      setMenu(menuData || []);
      const rests = await apiGet('/api/restaurants');
      setRest(rests.find(r=> r._id === id));
    })();
  }, [id]);

  function addToCart(item){
    const cart = loadCart();
    const found = cart.find(c => c.menuItem === item._id);
    if(found) found.qty += 1;
    else cart.push({ menuItem: item._id, name: item.name, price: item.price, qty: 1 });
    saveCart(cart);
    alert('Added to cart');
  }

  return (
    <div>
      <h2>{rest ? rest.name : 'Restaurant'}</h2>
      <p><small>{rest ? rest.description : ''}</small></p>
      <h3>Menu</h3>
      {menu.map(m => (
        <div key={m._id} className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontWeight:700}}>{m.name}</div>
              <small>{m.description}</small>
            </div>
            <div>
              <div>₹{m.price}</div>
              <button style={{marginTop:8}} onClick={()=>addToCart(m)}>Add</button>
            </div>
          </div>
        </div>
      ))}
      <p><Link to="/cart">Go to cart</Link></p>
    </div>
  );
}
