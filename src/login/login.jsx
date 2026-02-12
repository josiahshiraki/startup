import React from 'react';
import './login.css'


export function Login() {
  return (
  <main>
    <section>
      <h2>Login</h2>

      <form method="get" action="home_page.html">

        <div>
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
          <button type="submit">Login</button>
          <button type="submit">Create Account</button>
        </div>

      </form>
    </section>

  </main>
  );
}