import React from 'react';
import './edit_habit_tracker.css'

const STORAGE_REF = 'accountable.habits'

//function to create new OBJ habit
function createHabit(name){
    return {id: date.now().toString(), name, checks: Array(7).fill(false)} //id name must be unique, use timestamp
}



export function Edit_habit_tracker() {

    //state usage for input box
    const [newHabitName, setNewHabitName] = React.useState('');

    //returns the array of habit objs to be referenced in this page 
    //may need for safety return saved ? JSON.parse(saved) : [];
    const [habits, setHabits] = React.useState(() => {
        const saved = localStorage.getItem(STORAGE_REF);
        if(saved){
            return JSON.parse(saved);
        }else{
            return [];
        }
    })

    function addHabit(e){
        e.preventDefault(); //no reload
        const name = newHabitName.trim();
        if (!name) return; // if there's no input, don't do anything
        setHabits(prevHabits => [...prevHabits, createHabit(name)]); //appends new habit to array
        setNewHabitName('') //clears input box

    }

    React.useEffect(() => {
        localStorage.setItem(STORAGE_REF, JSON.stringify(habits));
    }, [habits]);

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