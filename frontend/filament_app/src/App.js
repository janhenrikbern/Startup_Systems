import './App.scss';
import Navbar from 'components/Navbar';
import Welcome from 'components/Welcome';

function App() {
  return (
    <div className="App">
      <header className="Navbar">
        <Navbar />
      </header>
      <Welcome />
    </div>
  );
}

export default App;
