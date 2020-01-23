const axios = require('axios');
const cheerio = require('cheerio');

const http = require('http');
const url = require('url');
const fs = require('fs');

const server = new http.Server;


server.listen(4200, '127.0.0.1', () => {
  console.log('Server start on 4200 port');
});

server.on('request', (req, resp) => {
  resp.setHeader('Access-Control-Allow-Origin', '*');
  
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname !== '/') {
    /**/
  }
  
  getInfo((data) => {
    resp.end(data);
  });
});

function getInfo(callback) {
  axios.get('https://www.onliner.by/')
    .then(response => {
      // console.log(response.data);
      callback(response.data);
      // return getData(response.data, callback);
    })
    .catch(error => {
      console.log('error');
    });
  
  const getData = (html, callback) => {
    const data = [];
    const $ = cheerio.load(html);
    $('a.b-tile-main').each((i, item) => {
      // console.log(i);
      data.push({
        i,
        item: $(item).text().trim(),
        link: item.attribs.href
      });
    });
    // console.log(data);
    callback(JSON.stringify(data));
  };
}