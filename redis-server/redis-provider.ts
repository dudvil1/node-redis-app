
import redis, { Redis } from 'ioredis';

const redisClient: Redis = new redis(6379);

redisClient.on('ready', function() { console.debug('Redis is ready'); });
redisClient.on('error', function (err): any { console.error(`!! Redis error:${err}`); });
redisClient.on('connect', function(msg): any { if (msg) {console.info(`!Redis client connected:${msg}`); }});

/*
async function set(key: string, value: string) {
  return await redisClient.set(key, value);
}

async function set (key: string): Promise<string | null> {
    return await redisClient.get(key);
}
*/

export default class RedisProvider {
  // constructor() {}
  
  mset = async (key: string, value: string): Promise<void> => {
    await redisClient.mset(key, value);
  }

  set = async (key: string, value: string): Promise<void> => {
    await redisClient.set(key, value);
  }

  setnx = async (key: string, seconds: number, value: string): Promise<any> => {
    return await redisClient.setex(key, seconds, value);
  }

  get = async (key: string): Promise<string | null> => {
      return await redisClient.get(key);
  }

  getset = async (key: string, value: string): Promise<any> => {
    return await redisClient.getset(key, value);
  }
}

/* const Redis = require("ioredis");
const redis = new Redis(); // uses defaults unless given configuration object
 
// ioredis supports all Redis commands:
redis.set("line64:user1001:booked", "true");
redis.set("line64:user1001:payment", "true");
redis.set("line64:user1001:counter", "0");


redis.get("line64:user1001:booked", function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log("ride booked:" +result); // Promise resolves to "bar"
    }
  });

  redis.get("line64:user1001:payment", function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log("ride payment:" +result); // Promise resolves to "bar"
    }
  });

  redis.get("line64:user1001:counter", function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log("ride counter:" +result); // Promise resolves to "bar"
    }
  });
 */