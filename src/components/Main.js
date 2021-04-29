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
  dynamicSort = function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
    
  }
  sortByName = () => {
    function dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
    }
    let userList = this.state.userList.sort(dynamicSort("email"))
    this.setState({
      userList:userList,
    });
  }
  sortByNameReverse = () => {
    function dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
    }
    let userList = this.state.userList.sort(dynamicSort("-email"))
    this.setState({
      userList:userList,
    });
  }
  // sortByNameReverse = () =>{

  // }
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

    if (filterName !== "") {
      let userListName = this.state.userList.filter((user) => user.name.first.toLowerCase().includes(filterName.toLowerCase()));
      this.setState({
        userList: userListName,
      });
      if (filterLast !== "") {
        let userListLast = userListName.filter((user) => user.name.last.toLowerCase().includes(filterLast.toLowerCase()));
        this.setState({
          userList: userListLast
        })
        if (filterAge !== "") {
          let userListAge = userListLast.filter((user) => user.dob.age == filterAge);
          this.setState({
            userList: userListAge,
          });
        }
      } else {
        if (filterAge !== "") {
          let userListAge = userListName.filter((user) => user.dob.age == filterAge);
          this.setState({
            userList: userListAge,
          });
        }
      }
    } else  if (filterLast !== ""){
      let userListLast = this.state.userList.filter((user) => user.name.last.toLowerCase().includes(filterLast.toLowerCase()));
        this.setState({
          userList: userListLast
        })
        if (filterAge !== "") {
          let userListAge = userListLast.filter((user) => user.dob.age == filterAge);
          this.setState({
            userList: userListAge,
          });
        }
      } else {
        if (filterAge !== "") {
          let userListAge = this.state.userList.filter((user) => user.dob.age == filterAge);
          this.setState({
            userList: userListAge,
          });
    }
  }
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
        <div className='add-wrapper'>
          <h3>Sort By Name</h3>
            <button onClick={this.sortByName} className='blue-button'>A-Z</button>
            <button onClick={this.sortByNameReverse} className='blue-button'>Z-A</button>
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
