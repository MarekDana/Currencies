var http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// fetchCrypto();
// function fetchCrypto() {
//   console.log("ahoj");
//   fetch("https://apiv2.bitcoinaverage.com/symbols/indices/ticker")
//     .then(res => res.json())
//     .then(a => console.log(a));
// }

app.get("/", (req, res) => {
  res.send("Dobrý den.");
});

app.get("/crypto", (req, res) => {
  let formular = "<form action='/crypto' method='post'>";

  formular += "<input type='number' name='value' placeholder='Value'/>";

  formular += "<select name= 'crypto'>";
  formular += "<option value='BTC'>BTC</option>";
  formular += "<option value='LTC'>LTC</option>";
  formular += "<option value='XMR'>XMR</option>";
  formular += "</select>";

  formular += "<select name= 'flat'>";
  formular += "<option value='USD'>USD</option>";
  formular += "<option value='EUR'>EUR</option>";
  formular += "<option value='CZK'>CZK</option>";
  formular += "</select>";

  formular += "<button type='submit' name='submit'>Fesh</button>";

  formular += "<form>";
  res.send(formular);
});

app.post("/crypto", (req, res) => {
  let crypto = req.body.crypto;
  let flat = req.body.flat;
  let value = req.body.value;
  let options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global?from=",
    method: "GET",
    qs: {
      from: crypto,
      to: flat,
      amount: value
    }
  };
  request(
    "https://apiv2.bitcoinaverage.com/symbols/indices/ticker",
    (error, repsonse, body) => {
      let data = JSON.parse(body);
      console.log(data.global.symbols);
    }
  );
  request(options, (error, repsonse, body) => {
    let data = JSON.parse(body);
    res.send(
      "<h1>Aktualni cena za " +
        value +
        " " +
        crypto +
        " je " +
        data.price +
        " " +
        flat +
        "</h1>"
    );
  });
});

//create a server object:
app.listen(8080, () => {
  console.log("Server běží na portu 8080");
});
