const express = require('express');
const app = express();
const PORT = 5005;
const path =require('path')
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();
const urlRouter = require('./routes/url')
const URL = require('./models/url')
const cors = require('cors');
const UAParser = require('ua-parser-js');
const geoip = require('geoip-lite');

//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'] // 👈 This is the key fix
}));



app.get('/',(req,res)=>{
  res.redirect('/html/Index.html')
})

app.use('/url', urlRouter)


app.get('/:Shortid', async (req, res) => {
  let userAgent = req.headers['user-agent'];
  const parser = new UAParser();
  parser.setUA(userAgent);
  let result = parser.getResult();
  // console.log(result);
   const ip = req.ip ;
  //  console.log(ip);
  const geo = geoip.lookup(ip);

  if (geo) {
    // console.log(`Hello from ${geo.city}, ${geo.region}, ${geo.country}!`)
  }
  let shortid = req.params.Shortid;
  const url = await URL.findOneAndUpdate({ shortId: shortid },
    {
      $push:{
        visitHistoy:{timestamp: Date.now()},
      },
    },
  );
  if (!url) return res.json({ error: 'not found' });
  else {

    res.redirect(url.redirectURL);
  }

})

app.listen(PORT, () => {
  console.log(`Server is started at localhost http://localhost:${PORT}`);
})