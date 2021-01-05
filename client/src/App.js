import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from "react"

function App() {
  const [bearer, setBearer] = useState("")
  useEffect(() => {
    const innerFunc = async () => {
      const bearerToken = await axios.get("/spotifyBearer").catch(err => console.error(err))
      console.log(bearerToken)
      if (bearerToken) { setBearer(bearerToken.data.bearer) }
    }
    innerFunc()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          if you see <code>{bearer}</code> the its time to get some data.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
