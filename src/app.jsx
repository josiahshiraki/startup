import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Edit_habit_tracker } from './edit_habit_tracker/edit_habit_tracker';
import { Login } from './login/login';
import { My_resolution } from './my_resolution/my_resolution';
import { Past_weeks } from './past_weeks/past_weeks';
import { Friend_habit_tracker } from './friend_habit_tracker/friend_habit_tracker'
import { Home_page } from './home_page/home_page'


export default function App() {
    const [user, setUser] = React.useState((localStorage.getItem('user') || null))

    return ( 
        <BrowserRouter>
            <div>
                <header className>
                    <div className = "header-bar">
                        <div className = "brand">   
                            <h1>Accountable<sup></sup></h1>
                            {user && <div className = "username">{user}</div>}
                        </div>

                        <nav>
                            <menu>
                                {user && <li><NavLink to="/login">Back To Login</NavLink></li>}
                                {user && <li><NavLink to="/home_page">Home</NavLink></li>}
                                {user && <li><NavLink to="/my_resolution">My Resolution and Goals</NavLink></li>}
                                {user && <li><NavLink to="/edit_habit_tracker">Edit Habit Tracker</NavLink></li>}
                                {user && <li><NavLink to="/past_weeks">Record of Past Weeks</NavLink></li>}
                                {user && <li><NavLink to="/friend_habit_tracker">Friend Habit Tracker</NavLink></li>}
                            </menu>
                        </nav>
                        <img src = "sisyphus.jpg" alt = "motivational picture" className = "header-image" width={100}/>
                    </div>
                    <hr />
                </header>

                <Routes>
                    <Route path='/' element={<Login setUser={setUser}/>} exact />
                    <Route path='/login' element={<Login setUser={setUser}/>} />
                    <Route path='/my_resolution' element={<My_resolution />} />
                    <Route path='/home_page' element={<Home_page user={user}/>} />
                    <Route path='/edit_habit_tracker' element={<Edit_habit_tracker />} />
                    <Route path='/friend_habit_tracker' element={<Friend_habit_tracker />} />
                    <Route path='/past_weeks' element={<Past_weeks />} />

                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <p>Josiah Shiraki</p>
                    <a href="https://github.com/josiahshiraki/startup.git">GitHub</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}