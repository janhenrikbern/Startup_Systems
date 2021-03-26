import './App.scss';
import Navbar from 'components/Navbar';
import Welcome from 'components/Welcome';


function App() {
  return (
    <div className="App">

      {/* <header className="navbar">
        <div className="container">
          <Navbar />
        </div>
      </header> */}
      <div className="section">
        <Welcome />
      </div>
      <div className="footer">
        
      </div>
    </div>
  );
}

export default App;
