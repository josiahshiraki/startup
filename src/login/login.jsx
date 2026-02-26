import React from 'react';
import './login.css';
import reactDOM from 'react-dom/client';
import { BrowserRouter, NavLink, Route, Routes, useNavigate} from 'react-router-dom';


export function Login({setUser}) {
  const [text,setText] = React.useState('');
  const navigate = useNavigate();

  function loginUser(){
    localStorage.setItem('user',text);
    setUser(text);
    navigate("/home_page");
  }

  function textChange(e){
    setText(e.target.value);
  }
  
  return (
    
    <div className="login-page">
      <main className = "login-main">
        <section className = "login-card">
          <h2>Login</h2>
            <div className='email-login'>
              <label>
                <span>@</span>
                <input id="emailInput" type="text" placeholder="your@email.com" onChange={textChange}/>
              </label>
            </div>
            <div>
              <label>
                <span>🔒</span>
                <input id="passInput" type="password" placeholder="password" />
              </label>
            </div>

            <div>
              <button className = "login-buttons" onClick={loginUser}>Login</button>
              <button className = "login-buttons">Create Account</button>
            </div>
            <div>{text}</div>
        </section>
      </main>
    </div>
  );
}