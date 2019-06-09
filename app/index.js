const express = require('express')
const app = express()
const port = 4444

app.get('/',function(req,res){
  res.sendfile("html/index.html");
  console.log(req.body)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
