const Redis = require("ioredis");

let redis = null;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL);

  redis.on("connect", () => {
    console.log("✅ Redis Connected");
  });

  redis.on("error", (err) => {
    console.error("❌ Redis Error:", err.message);
  });
} else {
  console.log("⚠️ Redis disabled (no REDIS_URL provided)");
}

module.exports = redis;
