const functions = require('firebase-functions');
const express = require('express');
const app = express();

const routes = {
  '/page1': {
    title: 'ページ1',
    content: 'これはページ1です。',
  },
  '/page2': {
    title: 'ページ2',
    content: 'これはページ2です。',
  },
};

app.set('view engine', 'ejs');

app.get('*', function (req, res) {
  const url_parts = req.path;
  // res.send(url_parts);

  if (routes[url_parts] == null) {
    res.status(404).send('page not found');
  } else {
    res.status(200).render('./template.ejs', {
      title: routes[url_parts].title,
      content: routes[url_parts].content,
    });
  }
});

exports.sample = functions.https.onRequest(app);
