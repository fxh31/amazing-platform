import Redis from "ioredis";

/**
 * 发布订阅
 */
const redis = new Redis({
  host: "localhost",
  port: 6379,
});

const redis2 = new Redis({
  host: "localhost",
  port: 6379,
});

redis.subscribe("channal1");
redis.on("message", (channel, message) => {
  console.log(`redis1 received message from ${channel}: ${message}`);
});

redis2.publish("channal1", "hellog, i'm redis2");
/** */

// 字符串
// redis.set("key", "value");
// redis.get("key").then((res) => {
//   console.log(res);
// });
// redis.setex("key", 10, "value"); // 设置键值对，10秒后过期

// 集合
// redis.sadd("set", 1, 1, 1, 2, 2, 3);
// redis.smembers("set").then((res) => {
//   console.log(res);
// });
// redis.srem("set", 1, 2);
// redis.sismember("set", 3).then((res) => {
//   console.log(res);
// }); // 是否存在

// // 哈希
// // redis.hset("obj", "name", "fer");
// redis.hdel("obj", "name");
// redis.hgetall("obj").then((res) => console.log(res));

// // 列表
// redis.lpush("list", "a", "b", "c");
// redis.rpush("list", "d");
// redis.llen("list").then((res) => {
//   console.log(res);
// });
// redis.lrange("list", 0, -1).then((res) => {
//   console.log(res);
// });
