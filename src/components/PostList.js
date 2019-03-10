import React, { Component } from 'react';

//Importing json file
import PostData from '../json/Data.json';

// Creating method outside our class
// Since this function is outside the class, it does not have access to our state.
// So we have to actually have to pass in to the filter
// So we can make sure with respect to the boolean value if we are going to keep it in the list
function searchingFor(term) {
  // It is going to return a method.
  // It is going to take a parameter
  // This method is used to make sure that when we are filtering and what we want meets the condition that we are setting in here
  return function (x) {
    // In here we are going to write a function which will return a boolean
    // We are going to return based on the first name
    // Using toLowerCase method to lowercase the input term and the data to, eliminate the case sensetive issue
    // And nothing is passed, do not return anything
    // So, when we have a term we want to match term with the first name of x 
    return x.first.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}

export default class PostList extends Component {
  // Adding constructor for having state. And having data from json in our state.
  // Now we actually have PostData property on our state.
  constructor(props) {
    super(props);
    this.state = {
      PostData: PostData,
      // term is the keyword for our search, which is assigned as empty string
      term: '',
    }
    // Binding searchHandler method in our constructor
    // Defined and bound this method to the component
    // We are going to use it in the onChange property of the input searchbar
    this.searchHandler = this.searchHandler.bind(this);
  }

  // Function to handle when the input changes in the search bar
  // It takes a parameter
  // Whatever is written into the input searchbar is going to alter our state
  searchHandler(event) {
    // So whenever this event changes its going to change our state
    this.setState({ term: event.target.value })
  } 

  render() {
    return (
      <div className="App">
        <form>
          {/* Calling the searchHandler method in the input searchbar */}
          {/* To make sure react is handling the state of this input, lets make it as controlled component instead of a uncontrolled */}
          {/* Normally this would be handling its own state, but we want react to handle to handle that. So we are using values */}
          <input type="text" onChange={this.searchHandler} placeholder="Search Here" value={this.term} />
        </form>
        <hr />
        {
          // Using map method to loop through all the data
          // Mapping PostData through the state
          // Now we will filter what is passed into out input searchbar
          // We use a higher order function i.e., filter method
          // Higher order method is just a method which takes other method as an argument or returns a method
          // Passing searchingFor method in the filter method
          // searchingFor method will take an argument, i.e., our state. After that it will map through that
          this.state.PostData.filter(searchingFor(this.state.term)).map(PostData =>
            <div key={PostData.id}>
              <h1>First Name:{ ' ' }{PostData.first}</h1>
              <h2>Last Name:{ ' ' }{PostData.last}</h2>
              <h3>Age:{ ' ' }{PostData.age}</h3>
              <hr />
            </div>
          )
        }
      </div>
    );
  }
}