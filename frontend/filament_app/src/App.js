import './App.scss';
import Welcome from 'components/Welcome';

const isLocalEnv = window.location.href.includes('localhost')

let backendUrl = 'https://ulo5y72k4m.execute-api.us-east-1.amazonaws.com/dev'
if (isLocalEnv) {
  backendUrl = 'http://localhost:4000/dev'
}

function App() {
  return (
    <div className="App">
      <div className="section">
         <Welcome />
      </div>
      <div className="footer">
      </div>
    </div>
  );
}

export default App;
