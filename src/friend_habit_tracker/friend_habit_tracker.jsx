import React from 'react';
import './friend_habit_tracker.css';


// Placeholder until websockets: show something reasonable
const demoFriendHabits = [
  { id: 'h1', name: 'Habit 1', checks: Array(7).fill(false) },
  { id: 'h2', name: 'Habit 2', checks: Array(7).fill(false) },
  { id: 'h3', name: 'Habit 3', checks: Array(7).fill(false) },
  { id: 'h4', name: 'Habit 4', checks: Array(7).fill(false) },
  { id: 'h5', name: 'Habit 5', checks: Array(7).fill(false) },
];

// Row component only read, not editable table
function FriendHabitRow({ habit }) {
  return (
    <tr>
      <td>{habit.name}</td>
      {habit.checks.map((done, i) => (
        <td key={i}>
          {done ? '✓' : ''}
        </td>
      ))}
    </tr>
  );
}

export function Friend_habit_tracker() {

  // will be updated for websocket part of project
  const [friendUsername, setFriendUsername] = React.useState("friend's username");
  const [friendHabits, setFriendHabits] = React.useState(demoFriendHabits);

  //controller for message box
  const [message, setMessage] = React.useState('');

  const [feed, setFeed] = React.useState([]);

  function sendEncouragement(e){
    e.preventDefault();
    const text = message.trim();
    if(!text) return; //does not send if message box empty

    setFeed(prev => [{ text, at: Date.now(), from: 'You' }, ...prev]);
    setMessage('');
  }

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
            {
              friendHabits.map(habit => (
                <FriendHabitRow key={habit.id} habit={habit} />
              ))
            }
        </tbody>
      </table>
    </section>

    <section>
      <h2>Send Encouragement</h2>

      <form onSubmit={sendEncouragement}>
        <label>
          <textarea 
            rows="5" 
            cols="50" 
            placeholder="YOU GOT THIS!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>    
        {/**for spacing*/}
        <br /><br />
        <button type="submit">Comment</button>
      </form>
    </section>
  </main>
  );

}