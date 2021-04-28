import React, {Component} from "react"


class Header extends Component {
  constructor() {
    super();
    this.state = {
      filterState: "Open",
      nextState: "Close"
    }
  }

  showFilter() {
    document.getElementById("filter").classList.toggle("show");
    this.setState({
      filterState: this.state.nextState,
      nextState: this.state.filterState
    })
  }

  render() {
    return (
      <React.Fragment>
        <header className='App-header'>
          <img src='/images/logo.png' alt='logo' id='logo' />
          <div className='filter-button'>
            <button onClick={() => this.showFilter()} className='blue-button'>
              {this.state.filterState} Filter
            </button>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header