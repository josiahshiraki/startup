import React from 'react';
import './home_page.css';

const STORAGE_REF = 'accountable.habits'

//habit objects for table habit tracker
const habits = [
    {id: 'habit-1', name: 'habit 1', checks: Array(7).fill(false)},
    {id: 'habit-2', name: 'habit 2', checks: Array(7).fill(false)},
    {id: 'habit-3', name: 'habit 3', checks: Array(7).fill(false)},
    {id: 'habit-4', name: 'habit 4', checks: Array(7).fill(false)},
    {id: 'habit-5', name: 'habit 5', checks: Array(7).fill(false)},
];

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
            return habits;
        }
    })
    

    React.useEffect(() => {
        localStorage.setItem(STORAGE_REF, JSON.stringify(habits));
    }, [habits]);

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
                <h2><strong>friend's username</strong></h2>
                <article>
                    Partner comment will appear here.       
                </article>

            </section>
        </main>
  );
}