import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from "react"

function App() {
  const [bearer, setBearer] = useState("")
  const [songData, setSongData] = useState("")
  useEffect(() => {
    const innerFunc = async () => {
      const bearerToken = await axios.get("/spotifyBearer").catch(err => console.error(err))
      console.log(bearerToken)
      if (bearerToken) { setBearer(bearerToken.data.bearer) }
    }
    innerFunc()
  }, [])
  const clickHandler = async () => {
    const songId = '2PpruBYCo4H7WOBJ7Q2EwM' // Hey Ya!
    console.log(bearer)
    const responseOK = await axios.get(`https://api.spotify.com/v1/audio-analysis/${songId}`, {
      headers: {
        Authorization: `Bearer ${bearer}`
      }
    }).catch(err => console.error(err))
    // const songData = await axios.get(`https://api.spotify.com/v1/audio-analysis/${songId}`, {
    //   header: {
    //     Authorization: `Bearer ${bearer}`
    //   }
    // }).catch(err => console.error(err))

    console.log(responseOK)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          if you see <code>{bearer}</code> the its time to get some data.
        </p>
        <div
          className="App-link"
          onClick={() => clickHandler()}
        >
          Click for some audio analysis data
        </div>
      </header>
    </div>
  );
}

export default App;
