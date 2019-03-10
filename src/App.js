import React, { Component } from 'react';
import './App.css';

//Importing local component
import PostList from './components/PostList';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <PostList></PostList>
      </div>
    );
  }
}