const cors = require('cors');
const express    = require('express');
var app = express();

require("dotenv").config();

// const bodyParser = require('body-parser');
const PORT       = process.env.PORT || 901;

// cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials:true,
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  })
);
  
app.use(express.json());

// export route
const biodataRoute = require('./routes/biodata');

app.use("/biodata",biodataRoute);

// server
app.listen(PORT,()=>console.log(`Server running at port ${PORT}`));