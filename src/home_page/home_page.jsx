import React from 'react';
import './home_page.css';

export function Home_page() {
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
                        <tr>
                            <td>habit 1</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>habit 2</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>habit 3</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>habit 4</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>habit 5</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
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