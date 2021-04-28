import React, {Component} from "react"
import Card from "./Card";

class Main extends Component {
  constructor(){
    super();
    this.state = {
      originalUserList: [],
      userList: []
    }
  }

  deleteCard = (idToDelete) => {
    let userList = this.state.userList.filter(
      (user) => user.login.uuid !== idToDelete
    );
    this.setState({
      userList: userList,
    });
  };

  moreCards = () => {
    const baseUrl = "https://randomuser.me/api/?results=";
    let addNumber = document.getElementById("numero").value 
    fetch(baseUrl.concat(addNumber))
      .then((r) => r.json())
      .then((resultado) => {
        var userListParse = this.state.userList;
        for (let i = 0; i < resultado.results.length; i++) {
        const user = resultado.results[i];
        userListParse.push(user);
        }
        console.log(userListParse);
        this.setState({
          userList: userListParse
        });
      })
      .catch((e) => console.log(e));
  };

  componentDidMount(){
    fetch("https://randomuser.me/api/?results=20")
      .then((r) => r.json())
      .then((resultado) => {
        this.setState({
          originalUserList: resultado.results,
          userList: resultado.results,
        });
      })
      .catch((e) => console.log(e));
  };

  render(){
  return (
    <main className='wrapper'>
      <div id='filter'>
        <div className='add-cards'>
          <h3>Add More Cards</h3>
          <input type='number' name='numero' id='numero' min='1'></input>
          <button onClick={this.moreCards}>Add</button>
        </div>
      </div>
      <div className='cards-wrapper'>
        <React.Fragment>
          {this.state.userList.map((user) => {
            return (
              <React.Fragment key={user.login.uuid}>
                <Card
                  userInfo={user}
                  id={user.login.uuid}
                  deleteCard={this.deleteCard}
                />
              </React.Fragment>
            );
          })}
        </React.Fragment>
      </div>
    </main>
  );
  }
}

export default Main;
