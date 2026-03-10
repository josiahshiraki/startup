import React from 'react';
import './my_resolution.css';

const STORAGE_REF = 'accountable.resolutions'

function createResolution(resolution){
  return {id:Date.now().toString(), resolution, createdAt: Date.now()};
}

const defaultResolutions = [];

export function My_resolution() {
  const [newGoal, setNewGoal] = React.useState(''); //for input box
  const [goals, setGoals] = React.useState(defaultResolutions);

  //quotes
  const [quote, setQuote] = React.useState('Loading inspiration...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('');

  // save whenever goals changes
  React.useEffect(() => {
    async function loadResolutions(){
      const response = await fetch("/api/resolutions");

      if (response.status === 200){// checks if server has properly handled request 200 code for succesfull
        const data = await response.json();
        setGoals(data);//locally store goals
      }
    }
    loadResolutions();
  }, []);

  React.useEffect(() => {//third party api
    fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch(() => {
        setQuote('A habit missed once is a mistake, a habit missed twice is the start of a new habit.');
        setQuoteAuthor('James Clear');
      });
  }, []);


async function saveResolutions(updatedGoals) {//helper function that requests back end for add/delete goals
    const response = await fetch('/api/resolutions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedGoals),
    });

    if (response.status === 200) {
      const savedGoals = await response.json();
      setGoals(savedGoals);
    }
  }


  function addGoal() {
    const text = newGoal.trim();
    if (!text) return;

    const updatedGoals = [...goals,createResolution(text)];
    saveResolutions(updatedGoals);
    setNewGoal('');
  }

  function removeGoal(index){
      const proxy = [...goals];
      proxy.splice(index, 1);
      saveResolutions(proxy);
  }

  return (
 <main>
    <section>
      <h2>Inspiration (if you're a coder)</h2>
      <p>"{quote}" {quoteAuthor && `— ${quoteAuthor}`}</p>
    </section>

    <section>
      <h2>My Resolutions</h2>
      {goals.length === 0 && (<li>input goals below</li>)}
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
          placeholder="ex: lose 15lbs"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <button type="button" onClick={addGoal}>Create New Goal</button>

      </form>
    </section>
  </main>
  );
}