require('dotenv').config()
const axios = require('axios')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const init = async () => {
    console.log(process.env.SPOTIFY_CLIENTID, process.env.SPOTIFY_CLIENTSECRET, 'base64')
    const strToken = Buffer.from(process.env.SPOTIFY_CLIENTID + ":" + process.env.SPOTIFY_CLIENTSECRET, 'utf-8')
    console.log(`strtoken:${strToken}`)
    const b64Token = strToken.toString('base64')
    console.log(`b64token:${b64Token}`)
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    const access = await axios.post('https://accounts.spotify.com/api/token',
        params,
        {
            headers: {
                Authorization: `Basic ${b64Token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).catch(e => console.log(e))


    console.log(access)
    if (access) {
        app.listen(PORT, function () {
            console.log('App listening on PORT:' + PORT);
        });
    }
}
init()