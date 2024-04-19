import './App.css';


import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  pageSize = 5;
  apiKey = process.env.REACT_APP_API_KEY
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Switch>
            <Route exact path='/'><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" key="general" category="general" /></Route>
            <Route exact path='/business'><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="business" country="in" category="business" /></Route>
            <Route exact path='/entertainment'><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="entertainment" country="in" category="entertainment" /></Route>
            <Route exact path='/general'><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="" country="in" category="general" /></Route>
            <Route exact path='/health'><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="health" country="in" category="health" />  </Route>
            <Route exact path='/science'><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="science" country="in" category="science" />  </Route>
            <Route exact path='/sports'><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="sports" country="in" category="sports" />  </Route>
            <Route exact path='/technology'><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} key="technology" country="in" category="technology" /></Route>
          </Switch>
        </Router>

      </div>
    )
  }
}

