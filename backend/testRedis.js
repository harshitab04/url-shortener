const redis = require("./config/redis");

redis.set("check", "working");
redis.get("check").then(console.log);
