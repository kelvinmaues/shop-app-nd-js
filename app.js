const http = require('http');

const server = http.createServer((req, res) => {
  const { url } = req;
  res.setHeader('Content-type', 'text/html');
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit"></button>Send</form></body>');
    res.write('</html>');
    return res.end();
  }
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js server!</h1></body>');
  res.write('</html>');
  res.end();
});

// SERVER LISTING ON PORT 3000
server.listen(3000);