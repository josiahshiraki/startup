import React from 'react';
import './past_weeks.css';

export function Past_weeks() {
  return (

  <main>
    <section>
      <h2>Past Weeks</h2>
      <p>This page displays your habit completion history by week.</p>
    </section>

    <section>
      <h3>Weekly Completion Rates</h3>

      <table border="">
        <thead>
          <tr>
            <th>Week</th>
            <th>Completion Rate</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Week 1</td>
            <td>75%</td>
          </tr>
          <tr>
            <td>Week 2</td>
            <td>85%</td>
          </tr>
          <tr>
            <td>Week 3</td>
            <td>95%</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h3>Consistency Over Time</h3>
      <p>Graph of weekly consistency will be displayed here.</p>
    </section>
  </main>
  );
}