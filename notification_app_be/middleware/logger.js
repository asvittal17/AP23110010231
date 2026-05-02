// Simple logging middleware (conceptual)

function logger(req, res, next) {
  const start = Date.now();

  console.log("Request received:");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Time:", new Date().toISOString());

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log("Response sent:");
    console.log("Status:", res.statusCode);
    console.log("Duration:", duration + "ms");
  });

  next();
}

module.exports = logger;