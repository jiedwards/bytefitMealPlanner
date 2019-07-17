const express = require('express')
const app = express()
const port = 4444

app.use('/assets', express.static('assets'))

app.get('/',function(req,res){
  res.sendfile("html/index.html");
  console.log(req['headers'])
});

app.listen(port, () => console.log(`Server listening on port http://127.0.0.1:${port}`))
