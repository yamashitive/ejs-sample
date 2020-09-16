const functions = require('firebase-functions');
const express = require('express');
const url = require('url');
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
app.engine('ejs', require('ejs').__express);

app.get('*', function (req, res) {
  const url_parts = url.parse(req.path);

  if (routes[url_parts.pathname] == null) {
    res.status(404).send('page not found');
  } else {
    res.status(200).render('template', {
      title: routes[url_parts.pathname].title,
      content: routes[url_parts.pathname].content,
    });
  }
});

exports.sample = functions.https.onRequest(app);
