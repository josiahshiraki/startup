import React from 'react';
import './edit_habit_tracker.css'

export function Edit_habit_tracker() {
  return (
    <main>
        <section>
            <h2>Add a Habit</h2>
            <form>
                <label>
                    Habit Name:
                    <input type="text" placeholder= "habit" />
                    <button type = "submit">Add Habit</button>
                </label>
            </form>
        </section>

        <section>
            <h2>current habits</h2>
            <ul className="ul-edit-ht">
                <li>Habit 1 <button type="button">Remove</button></li>
                <li>Habit 2 <button type="button">Remove</button></li>
                <li>Habit 3 <button type="button">Remove</button></li>
                <li>Habit 4 <button type="button">Remove</button></li>
                <li>Habit 5 <button type="button">Remove</button></li>
            </ul>            
        </section>

    </main>
  );
}