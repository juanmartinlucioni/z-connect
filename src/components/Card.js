function Card() {
    return (
      <div className='card'>
        <h3>User</h3>
        <img
          className='user-image'
          src='./images/sampleimage.jpg'
          alt='Sample User Image'
        />
        <p>Email: harlodpain@gmail.com</p>
        <p>Birthday: 02/02/1997 (Age 24)</p>
      </div>
    );
}

export default Card