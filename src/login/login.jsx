import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export function Login({ setUser }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  async function authenticate(endpoint) {
    if (!email || !password) return;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email,password}),
    });

    if(response.status === 200){
      const user = await response.json();
      localStorage.setItem('user', user.email);
      setUser(user.email);
      navigate('/home_page');
    }else{
      alert("authentication failed")
    }
  }

  function emailChange(e) {
    setEmail(e.target.value);
  }

  function passwordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="login-page">
      <main className="login-main">
        <section className="login-card">
          <h2>Login</h2>

          <div className='email-login'>
            <label>
              <span>@</span>
              <input
                id="emailInput"
                type="text"
                placeholder="your@email.com"
                onChange={emailChange}
              />
            </label>
          </div>

          <div>
            <label>
              <span>🔒</span>
              <input
                id="passInput"
                type="password"
                placeholder="password"
                onChange={passwordChange}
              />
            </label>
          </div>

          <div>
            <button
              className="login-buttons"
              onClick={() => authenticate('/api/auth/login')}
              disabled={!email || !password}
            >
              Login
            </button>

            <button className="login-buttons"
              onClick={() => authenticate('/api/auth/create')}
              disabled={!email || !password}
            >Create Account</button>
          </div>

          <div>{email}</div>
        </section>
      </main>
    </div>
  );
}