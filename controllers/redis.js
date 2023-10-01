const{User}=require('../models/user');
const{Device}=require('../models/device');

const Redis = require('ioredis');

const redis = new Redis({
    password: 'VbjNWLFp5a4fLXNRXpGyH7RpC30SmqrC',
    host: 'redis-10579.c44.us-east-1-2.ec2.cloud.redislabs.com',
    port: 10579
});

// Example usage:
redis.set('myKey', 'myValue', (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Value set successfully:', result);
    }
});
async function rankdevice(req,res) {
    try {
      // Load devices from MongoDB (Replace this with your MongoDB query)
      const devices = await Device.find({}, { _id: 0, SerialNumber: 1, points: 1 });
  
      // Update the Redis Sorted Set with device scores
      for (const device of devices) {
        await redis.zadd('device_ranking', device.points, device.SerialNumber);
      }
  
      // Retrieve the top N devices based on points
      const numberOfDevicesToFetch = 10; // Change this according to your requirements
      const result = await redis.zrevrange('device_ranking', 0, numberOfDevicesToFetch - 1, 'WITHSCORES');
      
      const output=[]
      console.log('Device Ranking:');
      for (let i = 0; i < result.length; i += 2) {
        const SerialNumber = result[i];
        const points = result[i + 1];
        console.log(`Device SerialNumber: ${SerialNumber}, Points: ${points}`);
        res.status(200).json()
      }
      // Close the Redis connection when done
      redis.quit();
    } catch (error) {
      console.error('Error:', error);
      // Handle errors as needed
    }
  }
    

module.exports ={rankdevice}