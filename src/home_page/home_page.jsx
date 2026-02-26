import React from 'react';
import './home_page.css';

const STORAGE_REF = 'accountable.habits'

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

    //stores the global array of habit objs into local storage
    const [habits, setHabits] = React.useState(() => {
        const saved = localStorage.getItem(STORAGE_REF);
        if(saved){
            return JSON.parse(saved);
        }else{
            return defaultHabits;
        }
    })
    
    const [friendUsername, setFriendUsername] = React.useState('Loading...');
    const [partnerComment, setPartnerComment] = React.useState('');

    React.useEffect(() => {
        localStorage.setItem(STORAGE_REF, JSON.stringify(habits));
        setFriendUsername('Friend');
        setPartnerComment('For with God, nothing shall be impossible');
    }, []);

    function toggleDay(habitId,dayIndex){
        setHabits(prevHabits =>
            prevHabits.map(h => {
                if (h.id != habitId) return h;

                const newChecks = [...h.checks]; //create new array of bool vars for checkboxes ([...name] is syntax for copy of array)
                newChecks[dayIndex] = !newChecks[dayIndex] //ONLY inverts the clicked box
                return {...h, checks: newChecks}; //new habit object with everything the same except the changed toggled box
            }
            )
        )
    }

    return (
        <main className="homepage_main">
            <section>
                <h2>Weekly Habit Tracker</h2>
                <div>
                    {habits.length == 0 && <div>add habits in "edit habit tracker" page</div>}
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