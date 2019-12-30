const express = require('express')
const app = express()
const port = process.env.PORT

//CERTBOT
app.get('/.well-known/acme-challenge/NUbwnLYxJxyMYFoXzVbGM_cR1RKIgTanhnZQMgf9pfY', function(req, res) {
  res.send('NUbwnLYxJxyMYFoXzVbGM_cR1RKIgTanhnZQMgf9pfY.YvKC4wazkGmcoWAvAeiLO9wd8YEUnkjd_6JWzhswkMs')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))