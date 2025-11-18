# GoldDigger - A Pure Node.js Web Application

This project was a hands-on learning experience to build a full-stack web application from the ground up, with a specific focus on creating a robust backend using **only the core Node.js APIs**, without any external frameworks like Express.

This document covers the backend architecture and the key concepts I learned and implemented.


---

## What I Learned: Core Backend Concepts

This project was my deep dive into the fundamentals of how Node.js works under the hood. By avoiding frameworks, I was forced to understand and implement the core logic that powers modern web applications.

### 1. Building a Node.js HTTP Server from Scratch
The entire application is built on top of the native `http` module.

- **Key Skills:**
  - Initializing a server with `http.createServer()`.
  - Understanding the request (`req`) and response (`res`) objects.
  - Handling the asynchronous nature of the request/response cycle.
  - Making the server listen for connections on a specific port.

### 2. Modular Architecture with ES Modules
From the start, I structured the project into logical, reusable modules using modern ES Module syntax (`import`/`export`).

- **Key Skills:**
  - Setting `"type": "module"` in `package.json`.
  - Separating concerns into `utils`, `handlers`, and `public` directories.
  - Using `import.meta.dirname` to reliably create absolute paths for file system operations, which is crucial in ES Modules.

### 3. Implementing a Custom Router
Instead of using a pre-built router, I created my own logic to direct incoming requests based on their URL and HTTP method.

- **Key Skills:**
  - Inspecting `req.url` and `req.method` to differentiate between API calls and file requests.
  - Handling different HTTP verbs, specifically `GET` for data retrieval and `POST` for data submission.
  - Creating API endpoints like `/api/live-price` and `/api/invest`.
  - Sending a `405 Method Not Allowed` status for incorrect HTTP methods.

### 4. Serving Static Files Manually
I learned how web servers serve static assets like HTML, CSS, and JavaScript by building my own static file server.

- **Key Skills:**
  - Using `fs/promises` to read file contents asynchronously.
  - Using the `path` module to safely join path segments and prevent security issues.
  - Creating a utility to determine the correct `Content-Type` header based on a file's extension (e.g., `text/html` vs. `text/css`).
  - Implementing a custom 404 "Not Found" page for requests that don't match any file.

### 5. Handling `POST` Requests and Parsing Bodies
One of the most valuable learning experiences was building a body parser from scratch to handle incoming `POST` data.

- **Key Skills:**
  - Reading an incoming request stream chunk by chunk using the `for await...of` loop.
  - Assembling the chunks into a complete string.
  - Parsing the string as JSON using `JSON.parse()`.
  - Wrapping the parsing logic in a `try...catch` block to handle malformed JSON and prevent the server from crashing.

### 6. Real-Time Updates with Server-Sent Events (SSE)
To provide live gold prices, I implemented a Server-Sent Events endpoint. This was a great introduction to pushing data from the server to the client in real-time.

- **Key Skills:**
  - Setting the required HTTP headers for an SSE connection (`Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`).
  - Using `setInterval` on the server to periodically send data.
  - Formatting the data payload correctly with `res.write('data: ...\n\n')` so the client's `EventSource` API can parse it.

### 7. Business Logic and Data Persistence
I implemented the core application logic and learned to persist data on the server's file system.

- **Key Skills:**
  - Using the `crypto` module to generate a unique transaction ID with `crypto.randomUUID()`.
  - Using `fs/promises.appendFile` to write transaction details to a `investments.log` file, ensuring a persistent record of all investments.
  - Implementing the core business logic: calculating the amount of gold purchased based on the investment amount and the current market price.

---

This project solidified my understanding of the foundational layers of backend web development in the Node.js ecosystem.
