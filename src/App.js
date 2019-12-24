import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: "",
      list: [],
    };
  }

  //incorporating local storage 
  componentDidMount() {
    this.updateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  updateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    //update reac† state
    this.setState({
      [key]: value,
    });
  }

  addItem() {
    //create item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice(),
    };

    //copy of current list of items
    const list = [...this.state.list];

    //add new item to list
    list.push(newItem);

    //update state with new list and reset newItem input
    this.setState({
      list,
      newItem: "",
    });
  }

  deleteItem(id) {
    //copy of current list of items
    const list = [...this.state.list];

    //filter out item being delted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
        <h1 className="appTitle">
          TO DO LIST
        </h1>
        <div className="mainContainer">
          <h3 className="addItemTitle">Add an Item...</h3>
          <br />
          <div className="inputContainer">
          <input
            type="text"
            id = "addItemInput"
            placeholder="Type item here..."
            value={this.state.newItem}
            onChange={e =>
              this.updateInput("newItem", e.target.value)
            }
          />
          <button className="addbtn" onClick={() => this.addItem()}>
            <i className="addIcon fas fa-plus"></i>{" "}
          </button>
          </div>
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}
                  <button className="deletebtn" onClick={() => this.deleteItem(item.id)}>
                  <i className="deleteIcon fas fa-times"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
