import React, {Component} from "react"

class Card extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentDisplay: 0,
      nextDisplay: "230px",
      buttonText: "More",
      nextText: "Less",
    };
  }

  viewMore() {
    this.setState({
      currentDisplay: this.state.nextDisplay,
      nextDisplay: this.state.currentDisplay,
      buttonText: this.state.nextText,
      nextText: this.state.buttonText,
    });
  }

  render(){ 
  return (
      <div id={this.props.id} className='card'>
        <button id='delete-card-button' onClick={()=>{this.props.deleteCard(this.props.id)}}>X</button>
        <h3>{this.props.userInfo.name.first + " " +this.props.userInfo.name.last}</h3>
        <img
          className='user-image'
          src= {this.props.userInfo.picture.medium}
          alt='Sample User'
        />
        <p>Email: {this.props.userInfo.email}</p>
        <p>Birthday: {this.props.userInfo.dob.date.substring(0,10)} (Age: {this.props.userInfo.dob.age})</p>
        <div className='view-more-wrapper' id='view-more-wrapper' style={{height: this.state.currentDisplay}}>
          <p>Phone: {this.props.userInfo.phone}</p>
          <p>Address: {this.props.userInfo.location.street.name} {this.props.userInfo.location.street.number}</p>
          <p>City: {this.props.userInfo.location.city}, {this.props.userInfo.location.state} ({this.props.userInfo.location.postcode})</p>
          <p>Country: {this.props.userInfo.location.country}</p>
          <p>Register Date: {this.props.userInfo.registered.date.substring(0,10)}</p>
        </div>
        <button className='view-more-button' id={'view-more-button-' + this.props.id} onClick={()=>{this.viewMore()}}>View {this.state.buttonText}</button>
      </div>
    );
}
}
export default Card