import './App.css';


import React, { Component, useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter as Router,Switch,Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App = ()  => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_API_KEY
  
  const [progress, setProgress] = useState(0)
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />
          <Switch>
            <Route exact path='/'><News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="general" category="general" /></Route>
            <Route exact path='/business'><News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="business" country="in" category="business" /></Route>
            <Route exact path='/entertainment'><News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="entertainment" country="in" category="entertainment" /></Route>
            <Route exact path='/general'><News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="" country="in" category="general" /></Route>
            <Route exact path='/health'><News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="health" country="in" category="health" />  </Route>
            <Route exact path='/science'><News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="science" country="in" category="science" />  </Route>
            <Route exact path='/sports'><News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="sports" country="in" category="sports" />  </Route>
            <Route exact path='/technology'><News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="technology" country="in" category="technology" /></Route>
          </Switch>
        </Router>

      </div>
    )
}

export default App

