import React, { Component } from "react";
import axios from "axios";

//should display a list of friends
//might format into a card form later with a card component later down the line

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      name: "",
      age: "",
      email: ""
    };
  }

  // grabs the data from server

  componentDidMount() {
    axios
      .get(`http://localhost:5000/friends/`)
      .then(response => {
        // console.log(response.data);
        this.setState({ friends: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleTextInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleTextSubmit = e => {
    e.preventDefault();
  };

  saveFriendData = () => {
    const friendData = {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email
    };
    axios
      .post(`http://localhost:5000/friend/create`, friendData)
      .then(savedData => {
        // console.log(savedData);
      })
      .catch(err => {
        // console.log(err);
      });
    this.setState({ name: "", age: "", email: "" });
  };

  render() {
    return (
      <div>
        <h1>Friends</h1>
        <input
          type="text"
          onChange={this.handleTextInput}
          placeholder="name"
          name="name"
          value={this.state.name}
        />
        <input
          type="text"
          onChange={this.handleTextInput}
          placeholder="age"
          name="age"
          value={this.state.age}
        />
        <input
          type="text"
          onChange={this.handleTextInput}
          placeholder="email"
          name="email"
          value={this.state.email}
        />
        {/* <button
          name="submit button"
          type="submit"
          onClick={this.saveFriendData}
        >
          Save Friend
        </button> */}
        <div>
          Your friends are:{" "}
          {this.state.friends.map(friend => {
            const { name, age, email } = friend;
            return (
              <h3>
                Name: {name} Age: {age} Email: {email}
              </h3>
            );
          })}
        </div>
      </div>
    );
  }
}

export default FriendsList;
