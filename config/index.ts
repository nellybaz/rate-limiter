import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8000;


const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    redisHost: 'redis-15458.c51.ap-southeast-2-1.ec2.cloud.redislabs.com',
    redisPort: 15458,
    redisPassword: 'nTz0I89B0eoBe8IGAH9qgwgY1V7T5FsU'
};

const config = {
    server: SERVER
};

export default config;
