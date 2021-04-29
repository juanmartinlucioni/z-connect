import React, {Component} from "react"
import Card from "./Card";

class Main extends Component {
  constructor(){
    super();
    this.state = {
      originalUserList: [],
      userList: [],
      currentDirection: "row",
      nextDirection: "column",
    }
  }

  sortBy = (property, subprop) => {
    function dynamicSort(property, subprop) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          var result = (a[property][subprop] < b[property][subprop]) ? -1 : (a[property][subprop] > b[property][subprop]) ? 1 : 0;
          return result * sortOrder;
      }
    }
    let userList = this.state.userList.sort(dynamicSort(property,subprop))
    this.setState({
      userList:userList,
    });
  }
  changeDirection = () => {
    this.setState({
      currentDirection : this.state.nextDirection,
      nextDirection: this.state.currentDirection
    })
  }

  deleteCard = (idToDelete) => {
    let userList = this.state.userList.filter(
      (user) => user.login.uuid !== idToDelete
    );
    this.setState({
      userList: userList,
    });
  };

  moreCards = (event) => {
    event.preventDefault();
    this.setState({
      userList: this.state.originalUserList
    })
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
          userList: userListParse,
          originalUserList: userListParse
        });
      })
      .catch((e) => console.log(e));
  };

  filterCards = (event) => {
    event.preventDefault();
    let filterName = document.getElementById("filter-name").value;
    let filterLast = document.getElementById("filter-last").value;
    let filterAge = document.getElementById("filter-age").value;
    let filteredCards = this.state.userList.filter((user) => {
        if (filterAge !== "") {
          return(
            user.name.first.toLowerCase().includes(filterName.toLowerCase()) &&
            user.name.last.toLowerCase().includes(filterLast.toLowerCase()) &&
            user.dob.age == filterAge
          )
        } else {
          return(
            user.name.first.toLowerCase().includes(filterName.toLowerCase()) &&
            user.name.last.toLowerCase().includes(filterLast.toLowerCase())
          )
        }
    });
    return (
      this.setState({
        userList: filteredCards
      })
    );
}

  resetCards = (event) => {
    event.preventDefault();
    this.setState({
      userList: this.state.originalUserList
    })
  }

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
      <div id='filter' style={{ height: this.state.filterHeight }}>
        <div className='add-wrapper'>
          <h3>Add More Cards</h3>
          <form>
            <input type='number' name='numero' id='numero' min='1' />
            <button onClick={this.moreCards} className='blue-button'>Add</button>
          </form>
        </div>
        <div className='sort-wrapper add-wrapper'>
          <h3>Sort By Name</h3>
          <div>
            <button onClick={()=>this.sortBy("name","first")} className='blue-button'>A-Z</button>
            <button onClick={()=>this.sortBy("-name","first")} className='blue-button'>Z-A</button>
          </div>
        </div>
        <div className='sort-wrapper add-wrapper'>
          <h3>Sort By Age</h3>
          <div>
            <button onClick={()=>this.sortBy("dob","age")} className='blue-button'>Ascending</button>
            <button onClick={()=>this.sortBy("-dob","age")} className='blue-button'>Descending</button>
          </div>
        </div>
        <div className='sort-wrapper add-wrapper'>
          <h3>Change Card Direction</h3>
          <div>
            <button onClick={this.changeDirection} className='blue-button'>Row / Column</button>
          </div>
        </div>
        <div className='filter-wrapper'>
          <h3>Filter</h3>
          <form>
            <label for='filter-name'>First Name</label>
            <input type='text' name='filter-name' id='filter-name' />
            <label for='filter-name'>Last Name</label>
            <input type='text' name='filter-last' id='filter-last' />
            <label for='filter-age'>Age</label>
            <input type='number' name='filter-age' id='filter-age' min='1' />
            <div>
              <button onClick={this.filterCards} className='blue-button' type='submit'>Filter</button>
              <button onClick={this.resetCards} className='blue-button'>Reset Cards</button>
            </div>
          </form>
        </div>
      </div>
      <div className='cards-wrapper' style={{flexDirection:this.state.currentDirection}}>
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
