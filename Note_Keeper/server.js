const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const port = 3000;
const rootDirectory = __dirname;
const dataFile = path.join(rootDirectory, 'notes-data.json');

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });

  response.end(JSON.stringify(data));
}

async function readRequestBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString() || '{}');
}

async function serveFile(response, fileName, contentType) {
  try {
    const content = await fs.readFile(path.join(rootDirectory, fileName));

    response.writeHead(200, {
      'Content-Type': contentType
    });

    response.end(content);
  } catch {
    response.writeHead(404);
    response.end('File not found');
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    return sendJson(response, 204, {});
  }

  if (request.url === '/api/notes' && request.method === 'GET') {
    try {
      const data = JSON.parse(await fs.readFile(dataFile, 'utf8'));
      return sendJson(response, 200, data);
    } catch {
      return sendJson(response, 200, {});
    }
  }

  if (request.url === '/api/notes' && request.method === 'PUT') {
    const data = await readRequestBody(request);

    await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8');

    return sendJson(response, 200, {
      message: 'Data saved successfully.'
    });
  }

  if (request.url === '/api/notes' && request.method === 'DELETE') {
    await fs.writeFile(dataFile, '{}', 'utf8');

    return sendJson(response, 200, {
      message: 'Data cleared successfully.'
    });
  }

  if (request.url === '/' || request.url === '/index.html') {
    return serveFile(response, 'index.html', 'text/html; charset=utf-8');
  }

  if (request.url === '/app.js') {
    return serveFile(response, 'app.js', 'application/javascript; charset=utf-8');
  }

  response.writeHead(404);
  response.end('Not found');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});