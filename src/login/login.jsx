import React from 'react';
import './login.css'


export function Login() {
  return (
    <div className="login-page">
      <main className = "login-main">
        <section className = "login-card">
          <h2>Login</h2>

          <form method="get" action="home_page.html">

            <div className='email-login'>
              <label>
                <span>@</span>
                <input type="text" placeholder="your@email.com" />
              </label>
            </div>

            <div>
              <label>
                <span>🔒</span>
                <input type="password" placeholder="password" />
              </label>
            </div>

            <div>
              <button className = "login-buttons" type="submit" to="/home_page">Login</button>
              <button className = "login-buttons" type="submit" to="/home_page">Create Account</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}