import React from 'react';
import './friend_habit_tracker.css';
import { FriendClient } from './websocket';


// Placeholder until real friend data arrives
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
  console.log('Friend_habit_tracker rendered');

  // will be updated for websocket part of project
  const [friendUsername, setFriendUsername] = React.useState("");
  const [friendHabits, setFriendHabits] = React.useState(demoFriendHabits);
  const [friendMessage, setFriendMessage] = React.useState('');  
  

  //controller for message box
  const [message, setMessage] = React.useState('');


  const [socketClient, setSocketClient] = React.useState(null);

  const userEmail = localStorage.getItem('user') || '';


  function ensureFriendEmail(){
    let stored = localStorage.getItem('friendEmail');

    if(!stored) {
      const input = prompt('enter your friends email');

      if (input &&input.trim()){
        stored = input.trim();
        localStorage.setItem('friendEmail', stored);
      }
    }

    return stored || '';
  }

  const [friendEmail, setFriendEmail] = React.useState('');

  React.useEffect(() => {
    console.log('friend tracker useEffect running');
    console.log('userEmail is', userEmail);

    const email = ensureFriendEmail();
    console.log(email)
    setFriendEmail(email);
    setFriendUsername(email || 'Friend');


    if (!userEmail) return;
    const client = new FriendClient(userEmail);


    client.addObserver((data) => {
      if (data.type === 'friendUpdate') {
        setFriendUsername(data.from || "friend's username");
        setFriendHabits(data.habits || []);
        setFriendMessage(data.message || '');
      }
    });

    setSocketClient(client);

    return () => {
      client.close();
    };
  }, [userEmail]);


  function sendEncouragement(e){
    e.preventDefault();

    //does not send if message box empty or if web socket not connected
    const text = message.trim();
    if(!text || !socketClient || !socketClient.connected || !friendEmail) return;

    socketClient.sendUpdate(
      userEmail,
      friendEmail,
      demoFriendHabits,
      text
    );

    setMessage('');
  }

  return (
  <main>
    <section>
      <h2>{friendUsername} Weekly Habit Tracker</h2>

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
        <h2>Latest Encouragement From Friend</h2>
        <p>{friendMessage || 'No message yet.'}</p>
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