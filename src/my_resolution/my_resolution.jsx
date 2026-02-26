import React from 'react';
import './my_resolution.css';

const STORAGE_REF = 'accountable.resolutions'

function createResolution(resolution){
  return {id:Date.now().toString(), resolution, createdAt: Date.now()};
}

export function My_resolution() {

  const [newGoal, setNewGoal] = React.useState('') //for input box

  const [goals, setGoals] = React.useState(() => {
      const saved = localStorage.getItem(STORAGE_REF);
      if(saved){
        return JSON.parse(saved)
      }
  })

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
      <form>
        <label>Goal: </label>
        <input
          type="text"
          placeHolder="ex: lose 15lbs"
        />
        <button type="button">Create New Goal</button>

      </form>
    </section>
  </main>
  );
}