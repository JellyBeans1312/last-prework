const http = require('http');
const url = require('url');
const server = http.createServer()
let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

function getAllMessages(response) {
  response.setHeader('Content-Type', 'application/json')
  return response.end(JSON.stringify(messages))
}

function addMessage(newMessage, response) {
  response.writeHeader(201, {'Content-Type': 'application/json'})
  return response.end(JSON.stringify(newMessage))
}