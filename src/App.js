import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hamburger from './ImageAnimation';
import MountAnim from './MountAnim';
import MenuX from './MenuX';
import Create from './Create';
import Slate from './Slate';
import steve from './IMG_2640.JPG'
import ImageAnimation from './ImageAnimation';
import Demo from './Demo';


class App extends Component {
  constructor() {
    super();

    this.state = {
      active: false,
      clicked: 0
    }
  }

  toggleMenu = () => {
    let clickedCopy = this.state.clicked
    if (this.state.clicked === 2) {
        this.setState({
            clicked: --clickedCopy
        })
    } else {
        this.setState({
            clicked: ++clickedCopy
        })
    }
}

  render() {
    return (
      <div>
        <Demo />
      </div>
    );
  }
}

export default App;
