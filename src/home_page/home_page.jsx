import React from 'react';
import './home_page.css';

//habit objects for table habit tracker
const defaultHabits = [];

/**
     * creates a row iteration for one habit
     * first box is a name, the following cols in
     * the row are displayed through a loop (map) which
     * goes through each boolean var in the array and checks 
     * if it is true or false
     * toggleday is a function that will react when checkbox clicked,
     * update the storage data, and invert the respective boolean var
*/
function HabitRow({habit, onToggleDay}){
    return(
        <tr>
            <td>{habit.name}</td> 
            {habit.checks.map((isChecked,dayIndex) => (
                <td key={dayIndex}>
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={() => onToggleDay(habit.id, dayIndex)}
                    />
                </td>
            ))}
        </tr>
    );
}

export function Home_page({user}) {

    const [habits, setHabits] = React.useState(defaultHabits);
    const [friendUsername, setFriendUsername] = React.useState('Loading...');
    const [partnerComment, setPartnerComment] = React.useState('');

    //side effects habits (altered) to store into backend storage
    React.useEffect(() => { 
        async function loadHabits(){
            const response = await fetch('/api/habits'); //get habits from backend

            if(response.status === 200){
                const data = await response.json(); 
                setHabits(data);//store locally
            }
        }
        loadHabits();
    }, []);

    //implemented for eventual websocket, side effects friends username and the incoming comment from another host
    React.useEffect(() => {
        setFriendUsername('Friend');
        setPartnerComment('For with God, nothing shall be impossible');
    }, []);


    async function saveHabits(updatedHabits) {
        const response = await fetch('/api/habits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedHabits), 
        });

        if (response.status === 200) {
        const savedHabits = await response.json();
        setHabits(savedHabits);
        }
    }

    //this function handles the logic for when a checkbox is checked or unchecked
    function toggleDay(habitId,dayIndex){
        const updatedHabits = habits.map((h) => {
            if (h.id !== habitId) return h; //returns if not the habit row being edited

            const newChecks = [...h.checks];
            newChecks[dayIndex] = !newChecks[dayIndex];
            return { ...h, checks: newChecks };
        });
        saveHabits(updatedHabits);
    }

    return (
        <main className="homepage_main">
            <section>
                <h2>Weekly Habit Tracker</h2>
                <div>
                    {habits.length === 0 && <div>add habits in "edit habit tracker" page</div>}
                </div>

                <table className="my-habit-tracker" border="2">
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
                        {/*implement the habitrow func*/}
                        {
                            habits.map(habit =>
                                (<HabitRow
                                    key={habit.id} //list key
                                    habit={habit} //pass in specific habit obj
                                    onToggleDay={toggleDay} //function to change the 
                                />)
                            )
                        }
                    </tbody>
                </table>
            </section>


            <section>
                {/**preperation for web socket plug in*/}
                <h2><strong>{friendUsername}</strong></h2>
                <article>
                    {partnerComment || "If you make friends with yourself, you will never be alone."}
                </article>
            </section>
        </main>
  );
}