const requestHandler = (req, res) => {
  const { url, method } = req;

  res.setHeader("Content-type", "text/html");

  switch (url) {
    case "/":
      res.write("<html>");
      res.write("<head><title>Hey Dude, welcome!</title></head>");
      res.write(
        '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
      );
      res.write("</html>");
      return res.end();
    case "/create-user":
      const body = [];
      req.on("data", chunk => {
        body.push(chunk);
      });
      req.on("end", () => {
        const parseBody = Buffer.concat(body).toString();
        const message = parseBody.split("=")[1];
        console.log(message);
        return res.end();
      });
    case "/users":
      res.write("<html>");
      res.write("<head><title>Users List</title></head>");
      res.write(
        "<body><ul>David</ul><ul>Mikael</ul><ul>Chris</ul><ul>Jordan</ul></body>"
      );
      res.write("</html>");
      return res.end();
    default:
      return res.end();
  }
};

module.exports = requestHandler;
