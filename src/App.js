import React from 'react';
import { Route } from 'react-router-dom'

import './App.scss';
import Calendar from './components/calendar';

function App() {
  return (
    <div className="App">
        <header>
          <div id="logo" className="">
            <span>
            <b> NETFLIX</b> Originals
            </span>
          </div>
        </header>
        <Route exact path="/" component={Calendar} />

        <Route path="/:month/:year"
            render={(props) => <Calendar {...props} isAuthed={true} />}
        />
    </div>
  );
}

export default App;
