const fs = require('fs');

const requestHandler = (req, res) => {
  /* console.log('url: ', req.url);
      console.log('method: ', req.method);
      console.log('headers:', req.headers); */
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<header><title>My Nodejs Server</title></header>');
    res.write('<body><h1>Hello from my Nodejs Server</h1></body>');
    res.write('</html>');
    return res.end();
  } else if (req.url === '/message' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<header><title>My Nodejs Server</title></header>');
    res.write('<body>');
    res.write("<form action='/message' method='POST'>");
    res.write("<label for='message'>Your message</label>");
    res.write("<input id='message' type='text' name='message' />");
    res.write("<button type='submit'>SUBMIT</button>");
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  } else if (req.url === '/message' && req.method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log('---', chunk, '---');
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log('URL encoded message: ', message);
      fs.writeFile('justAFileCreatedWithNode.txt', message, (error) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<header><title>My Nodejs Server</title></header>');
  res.write("<body><h1>Hello I'm out of the if's statements</h1></body>");
  res.write('</html>');
  res.end();
};

const someText = 'This is just a text from an exported variable';

/* 
    3 Ways to export
    Remember that "module.exports" is an OBJECT!
*/
// #1 in case you need to export JUST ONE variable/function
/*
    in case you do something like:
    
module.exports = requestHandler;
module.exports = someText;

    you will be deleting the previous value and reasigning a new one. It could cause errors!
*/
//module.exports = requestHandler;

// #2 exporting several variables
module.exports = {
  handler: requestHandler,
  text: someText,
};

// #3 exporting several variables
//module.exports.handler = requestHandler;
//module.exports.text = someText;
