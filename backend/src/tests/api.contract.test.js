const assert = require("node:assert/strict");
const http = require("node:http");
const test = require("node:test");

const app = require("../app");

let server;
let baseUrl;

function hasErrorContract(body) {
  return (
    body &&
    typeof body.error === "string" &&
    typeof body.message === "string" &&
    Object.prototype.hasOwnProperty.call(body, "details")
  );
}

async function request(path) {
  const response = await fetch(`${baseUrl}${path}`);
  const body = await response.json();
  return { response, body };
}

test.before(async () => {
  server = http.createServer(app);

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
});

test("GET /api/health returns project status", async () => {
  const { response, body } = await request("/api/health");

  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
  assert.equal(body.project, "Senior Companion Check-In Planner");
  assert.equal(typeof body.database, "string");
  assert.equal(typeof body.timestamp, "string");
});

test("unknown route returns 404 with error contract", async () => {
  const { response, body } = await request("/api/not-found");

  assert.equal(response.status, 404);
  assert.equal(hasErrorContract(body), true);
});

test("data route without DB returns consistent error contract", async () => {
  const { response, body } = await request("/api/check-in-visits");

  assert.equal(response.status, 503);
  assert.equal(hasErrorContract(body), true);
});
