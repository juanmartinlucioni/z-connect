import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Z-connect</h1>
      </header>
      <main className='wrapper'>
        <div className='cards-wrapper'>
          <div className='card'>
            <h3>User 1</h3>
            <img
              className='user-image'
              src='./images/sampleimage.jpg'
              alt='Sample User Image'
            />
            <p>Email: harlodpain@gmail.com</p>
            <p>Birthday: 02/02/1997 (Age 24)</p>
          </div>

          <div className='card'>
            <h3>User 2</h3>
            <img
              className='user-image'
              src='./images/sampleimage.jpg'
              alt='Sample User Image'
            />
            <p>Email: harlodpain@gmail.com</p>
            <p>Birthday: 02/02/1997 (Age 24)</p>
          </div>

          <div className='card'>
            <h3>User 3</h3>
            <img
              className='user-image'
              src='./images/sampleimage.jpg'
              alt='Sample User Image'
            />
            <p>Email: harlodpain@gmail.com</p>
            <p>Birthday: 02/02/1997 (Age 24)</p>
          </div>

          <div className='card'>
            <h3>User 4</h3>
            <img
              className='user-image'
              src='./images/sampleimage.jpg'
              alt='Sample User Image'
            />
            <p>Email: harlodpain@gmail.com</p>
            <p>Birthday: 02/02/1997 (Age 24)</p>
          </div>
        </div>
      </main>
      <footer className='App-footer'>
        <ul>
          <li>Juan Martin Lucioni</li>
          <li>Matías Ayerza</li>
          <li>Jim Rattagan</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
