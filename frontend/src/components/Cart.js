import React, {useState} from 'react';
import { loadCart, saveCart, clearCart, getToken } from '../utils/helpers';
import { apiPost } from '../api/api';

export default function Cart(){
  const [cart, setCart] = useState(loadCart());
  const [address, setAddress] = useState('');

  function updateQty(i, delta){
    const c = [...cart];
    c[i].qty = Math.max(1, c[i].qty + delta);
    saveCart(c);
    setCart(c);
  }
  function removeItem(i){
    const c = [...cart];
    c.splice(i,1);
    saveCart(c);
    setCart(c);
  }
  async function placeOrder(){
    const token = getToken();
    if(!token) return alert('Login first');
    if(cart.length === 0) return alert('Cart is empty');
    const body = {
      restaurantId: cart[0].restaurantId || '', // placeholder (you can store chosen restaurant id)
      items: cart.map(c => ({ menuItem: c.menuItem, qty: c.qty, price: c.price })),
      total: cart.reduce((s,c)=> s + c.qty * c.price, 0),
      deliveryAddress: address || 'Not provided'
    };
    const res = await apiPost('/api/orders', body, token);
    if(res._id){
      alert('Order placed! ID: ' + res._id);
      clearCart();
      setCart([]);
    } else {
      alert('Order failed: ' + JSON.stringify(res));
    }
  }

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 && <p className="card">Your cart is empty.</p>}
      {cart.map((c,i)=> (
        <div key={i} className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontWeight:700}}>{c.name}</div>
            <small>₹{c.price} each</small>
          </div>
          <div>
            <button onClick={()=>updateQty(i,-1)}>-</button>
            <span style={{margin:'0 8px'}}>{c.qty}</span>
            <button onClick={()=>updateQty(i,1)}>+</button>
            <button style={{marginLeft:8, background:'#ef4444'}} onClick={()=>removeItem(i)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="card">
        <div style={{marginBottom:8}}>
          <strong>Total:</strong> ₹{cart.reduce((s,c)=> s + c.qty * c.price, 0)}
        </div>
        <div style={{marginBottom:8}}>
          <input placeholder="Delivery address" value={address} onChange={e=>setAddress(e.target.value)} style={{width:'100%', padding:8}}/>
        </div>
        <div>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
}
