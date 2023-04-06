const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));
app.use(express.static('./static/icons'));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 