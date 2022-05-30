const { decode } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  // const token =
  //   req.body.token || req.query.token || req.headers["x-access-token"];

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpYXQiOjE2NTMyNzYyNjksImV4cCI6MTY1MzI4MzQ2OX0.if_6VxZ_ZHdNufWBQnilbIX0-4-U0adP9GJvNeiMUNE";

  if (!token) {
    return res.status(403).send({code : 9, msg : "A token is required for authentication"});
  }

  // try {
  //   const decoded = jwt.verify(token, '666');
  //   req.user = decoded;
  // } catch (err) {
  //   // const decodedTry = jwt.verify(token, config.TOKEN_KEY);
  //   return res.status(401).send({code:8, msg:"Invalid Token",token : token});
  // }

  // if(token){
  //   const decoded = jwt.verify(token, '666');
  //   res.status(200).send({code:decoded});
  // }

  // jwt.verify(token, config.TOKEN_KEY,function(err, decoded) {
  //   if(err)  return res.status(401).send({code:8, msg:"Invalid Token",token : token});
  //   else{
  //     req.user = decoded;
  //     return next();
  //   }
  // })

  // const decode = jwt.verify(token, process.env.KEY_TOKEN);
  // return next();

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpYXQiOjE2NTMyNzYyNjksImV4cCI6MTY1MzI4MzQ2OX0.if_6VxZ_ZHdNufWBQnilbIX0-4-U0adP9GJvNeiMUNE";
  if(token == null) return res.status(403).json({code:1, message:`error`});
  
  jwt.verify(token, '666', (err, user) => {
      if(err) return res.status(403)
      req.user = user;
      return next();
  })
};

module.exports = verifyToken;