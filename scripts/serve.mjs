import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const port = Number.parseInt(process.env.PORT ?? "8000", 10);
const types = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8"
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const relative = decoded.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative || "index.html");
  return resolved.startsWith(root + path.sep) || resolved === path.join(root, "index.html") ? resolved : null;
}

const server = http.createServer((request, response) => {
  let filePath = safePath(request.url ?? "/");
  if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, "index.html");

  let status = 200;
  if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    filePath = path.join(root, "404.html");
    status = 404;
  }

  response.writeHead(status, {
    "Content-Type": types[path.extname(filePath).toLowerCase()] ?? "application/octet-stream",
    "Cache-Control": "no-store"
  });
  if (request.method === "HEAD") return response.end();
  fs.createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Ozark Aircraft Wash preview: http://127.0.0.1:${port}`);
});
