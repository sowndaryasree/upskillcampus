import React, {useState} from 'react';
import { apiPost } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Auth(){
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    const path = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { name, email, password, role: 'user' };
    const res = await apiPost(path, body);
    if(res.token){
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      alert('Success');
      navigate('/');
    } else {
      alert('Error: ' + JSON.stringify(res));
    }
  }

  return (
    <div className="card">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {!isLogin && <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%', padding:8, marginBottom:8}}/>}
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%', padding:8, marginBottom:8}}/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%', padding:8, marginBottom:8}}/>
      <div style={{display:'flex', gap:8}}>
        <button onClick={submit}>{isLogin ? 'Login' : 'Register'}</button>
        <button onClick={()=>setIsLogin(!isLogin)} style={{background:'#6b7280'}}>Switch</button>
      </div>
    </div>
  );
}
