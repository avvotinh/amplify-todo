import React, { Component } from "react";
import "./App.css";

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

Amplify.configure(awsconfig);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        { name: "Clean the house", status: "NEW" },
        { name: "Learn the cloud", status: "NEW" }
      ]
    };
  }

  logout = () => {
    Auth.signOut();
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <main>
          <h1>TODO List</h1>
          <TodoList items={this.state.items} />
        </main>

        <button onClick={this.logout} title="Log out">Log out</button>
      </div>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <div className="TodoList">
        <ul>
          {this.props.items.map((item, index) => {
            return <TodoItem item={item} key={index} />;
          })}
        </ul>
      </div>
    );
  }
}

class TodoItem extends Component {
  render() {
    const item = this.props.item;

    return (
      <li>
        <input type="checkbox" />
        {item.name}
      </li>
    );
  }
}

export default withAuthenticator(App);
