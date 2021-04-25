import React, {Component} from "react"

class Card extends Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }
  render(){ 
  return (
      <div id={this.props.id} className='card'>
        <button onClick={()=>{this.props.deleteCard(this.props.id)}}>x</button>
        <h3>{this.props.userInfo.name.first + " " +this.props.userInfo.name.last}</h3>
        <img
          className='user-image'
          src= {this.props.userInfo.picture.medium}
          alt='Sample User'
        />
        <p>Email: {this.props.userInfo.email}</p>
        <p>Birthday: {this.props.userInfo.dob.date.substring(0,10)} (Age: {this.props.userInfo.dob.age})</p>
      </div>
    );
}
}
export default Card