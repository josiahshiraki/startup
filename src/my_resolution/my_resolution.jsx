import React from 'react';
import './my_resolution.css';

const STORAGE_REF = 'accountable.resolutions'

function createResolution(resolution){
  return {id:Date.now().toString(), resolution, createdAt: Date.now()};
}

const defaultResolutions = [];

export function My_resolution() {

  const [newGoal, setNewGoal] = React.useState('') //for input box

  const [goals, setGoals] = React.useState(() => {
      const saved = localStorage.getItem(STORAGE_REF);
      if(saved){
        return JSON.parse(saved)
      }else{
        return defaultResolutions;
      }
  })

  function addGoal() {
    const text = newGoal.trim();
    if (!text) return;

    setGoals(prev => [...prev, createResolution(text)]);
    setNewGoal('');
  }

  function removeGoal(index){
    setGoals(prev => {
      const proxy = [...prev]
      proxy.splice(index, 1)
      return proxy 
    })
  }

  return (
 <main>
    <section>
      <h2>Daily Inspiration</h2>
      <p>"A habit missed once is a mistake, a habit missed twice is the start of a new habit." — James Clear</p>
    </section>

    <section>
      <h2>My Resolutions</h2>
      {goals.length == 0 && (<li>input goals below</li>)}
      <ul>
        {
          goals.map((g,index) => (
            <li key={g.id}>
                {g.resolution}
                <button type='button' onClick={() => removeGoal(index)}>Remove</button>
            </li>
            ))
        }
      </ul>
      <form>
        <label>Goal: </label>
        <input
          type="text"
          placeHolder="ex: lose 15lbs"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <button type="button" onClick={addGoal}>Create New Goal</button>

      </form>
    </section>
  </main>
  );
}