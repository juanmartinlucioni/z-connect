import React, {Component} from "react"
import Card from "./Card";

class Main extends Component {
  constructor(){
    super();
    this.state = {
      originalUserList: [],
      userList: [],
    }
  }
  componentDidMount(){
    fetch("https://randomuser.me/api/?results=20")
      .then((r) => r.json())
      .then((resultado) => {
        this.setState({
          originalUserList: resultado.results,
          userList: resultado.results,
        });
        console.log(this.state.userList);
      })
      .catch((e) => console.log(e));
  }
  render(){
  return (
   <main className='wrapper'>
      <div className='cards-wrapper'>
      <React.Fragment>
      {this.state.userList.map((user) => {
            return (
              <React.Fragment key={user.login.uuid}>
                <Card
                  userInfo={user}
                  id={user.login.uuid}
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
