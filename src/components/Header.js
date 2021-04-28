import React, {Component} from "react"
class Header extends Component {
  constructor() {
    super();
  }

  showFilter() {
    document.getElementById("filter").classList.toggle("show");
  }

  render() {
    return (
      <React.Fragment>
        <header className='App-header'>
          <h1>Z-connect</h1>
          <div className='filter-button'>
            <button onClick={() => this.showFilter()}>Filter</button>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header