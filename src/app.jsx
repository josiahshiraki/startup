import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">
    <header>
        <div className = "header-bar">
            <div className = "brand">   
                <h1>Accountable<sup></sup></h1>
                <div className = "username">username</div>
            </div>

            <nav>
                <menu>
                    <li><a href="index.html">Back To Login</a></li>
                    <li><a href="home_page.html">Home</a></li>
                    <li><a href="my_resolution.html">My Resolution and Goals</a></li>
                    <li><a href="edit_habit_tracker.html">Edit Habit Tracker</a></li>
                    <li><a href="past_weeks.html">Record of Past Weeks</a></li>
                    <li><a href="friend_habit_tracker.html">Friend Habit Tracker</a></li> 
                </menu>
            </nav>
            <img src = "sisyphus.jpg" alt = "motivational picture" class = "header-image" width={100}/>
        </div>
        <hr />
    </header>

    <main className='container-fluid bg-secondary text-center'>
        app components go here
    </main>

    <footer>
        <p>Josiah Shiraki</p>
        <a href="https://github.com/josiahshiraki/startup.git">GitHub</a>
    </footer>
  </div>;
}