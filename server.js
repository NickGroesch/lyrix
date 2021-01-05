require('dotenv').config()
const axios = require('axios')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3959;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    console.log(req.url, res.statusCode)
    next();
});
let bearerToken = null;
app.get("/spotifyBearer", (req, res) => {
    res.json({ bearer: bearerToken })
})

const init = async () => {
    const strToken = Buffer.from(process.env.SPOTIFY_CLIENTID + ":" + process.env.SPOTIFY_CLIENTSECRET, 'utf-8')
    const b64Token = strToken.toString('base64')
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
        bearerToken = access.data.access_token
        console.log(`bearer:${bearerToken}`)
        app.listen(PORT, function () {
            console.log('App listening on PORT:' + PORT);
        });
    } else {
        console.log('no access')
        process.exit(2)
    }
}
init()