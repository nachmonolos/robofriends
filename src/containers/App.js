import React, { Component } from 'react';
import CardList from '../compnents/CardList';
import { robots } from '../robots';
import SearchBox from '../compnents/SearchBox';
import Scroll from '../compnents/Scroll';
import './App.css';







class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(response => {
      return response.json();
    }).then(users => {
      this.setState({ robots: users })
    })
    this.setState({ robots: robots })
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    console.log(event.target.value);

  }

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !robots.length ?
      <h1>Loading...</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      )
  }

}

export default App;