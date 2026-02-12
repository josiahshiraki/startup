import React from 'react';
import './friend_habit_tracker.css';

export function Friend_habit_tracker() {
  return (
  <main>
    <section>
      <h2>Friend’s Weekly Habit Tracker</h2>

      <table className="friend-habit-tracker" border="2">
        <thead>
          <tr>
            <th>Habit</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Habit 1</td>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>Habit 2</td>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>Habit 3</td>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>Habit 4</td>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>Habit 5</td>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Send Encouragement</h2>

      <form>
        <label>
          <textarea rows="5" cols="50" placeholder="YOU GOT THIS!"></textarea>
        </label>

        <br /><br />

        <button type="submit">Comment</button>
      </form>
    </section>
  </main>
  );

}