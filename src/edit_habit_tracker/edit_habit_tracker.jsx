import React from 'react';
import './edit_habit_tracker.css'

const STORAGE_REF = 'accountable.habits'

//function to create new OBJ habit
function createHabit(name){
    return {id: Date.now().toString(), name, checks: Array(7).fill(false)} //id name must be unique, use timestamp
}

export function Edit_habit_tracker() {

    //state usage for input box
    const [newHabitName, setNewHabitName] = React.useState('');

    //returns the array of habit objs to be referenced in this page 
    const [habits, setHabits] = React.useState(() => { 
        const saved = localStorage.getItem(STORAGE_REF);
        if(saved){
            return JSON.parse(saved);
        }
    })

    function addHabit(e){
        e.preventDefault(); //no reload
        const name = newHabitName.trim(); //no whitespace
        if (!name) return; // if there's no input, don't do anything
        setHabits(prevHabits => [...prevHabits, createHabit(name)]); //appends new habit to array
        setNewHabitName('') //clears input box
    }

    //on remove button click
    function removeHabit(index){ 
        setHabits(prevHabits => {
            const retArray = [...prevHabits];
            retArray.splice(index, 1)
            return retArray
        })
    }

    React.useEffect(() => {
        localStorage.setItem(STORAGE_REF, JSON.stringify(habits));
    }, [habits]);

    return (
        <main>
            <section>
                <h2>Add a Habit</h2>
                <form onSubmit={addHabit}>
                    <label>Habit Name:</label>
                        <input 
                            type="text" 
                            placeholder= "habit" 
                            value={newHabitName}
                            onChange={(e) => setNewHabitName(e.target.value)}      
                        />
                    <button type="submit">Add Habit</button>
                </form>
            </section>

            <section>
                <h2>current habits</h2>
                <ul className="ul-edit-ht">
                    {/**if no habits listed, print statement*/}
                    {habits.length == 0 && (<li>No habits yet, add one above.</li>)} 
                    {
                        habits.map((h,index) => (
                            <li key={h.id}>
                                {h.name}
                                <button type='button' onClick={() => removeHabit(index)}>Remove</button>
                            </li>
                        ))
                    }
                
                </ul>            
            </section>

        </main>
    );
}