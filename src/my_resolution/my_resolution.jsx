import React from 'react';
import './my_resolution.css';

export function My_resolution() {
  return (
 <main>
    <section>
      <h2>Daily Inspiration</h2>
      <p>"A habit missed once is a mistake, a habit missed twice is the start of a new habit." — James Clear</p>
    </section>

    <section>
      <h2>My Resolutions</h2>
      <ul>
        <li>Goal 1</li>
        <li>Goal 2</li>
        <li>Goal 3</li>
      </ul>

      <button type="button">Create New Goal</button>
    </section>
  </main>
  );
}