const express = require("express")
const app = express();
require("dotenv").config();
// const dotenv = require("dotenv").config();

const API_KEY = process.env.API_KEY; 

const path = require('path');

const pathToDistFolder = path.join(__dirname, '../giphy-search/dist');

const serveStatic = express.static(pathToDistFolder);

const serveGifs = async (req, res, next) => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`);
  const data = await response.json();
  res.send(data);
}

// const serveGifs = async (req, res, next) => {
//   const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=3&rating=g`;
//   const [data, error] = await fetchData(API_URL);
//   if (error) {
//     console.log(error.message);
//     return res.status(404).send(error);
//   }
//   res.send(data);
// }

app.use(serveStatic);

app.get('/api/gifs', serveGifs)

const PORT = 8080;
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
