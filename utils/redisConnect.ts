import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

const getRedisClient = async () => {
    try{

        if (!redisClient) {
            redisClient = createClient({
                username: process.env.REDIS_USERNAME,
                password: process.env.REDIS_PASSWORD,
                socket: {
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                }
            });
            
            redisClient.on('error', err => console.log('Redis Client Error', err));
            await redisClient.connect();
        }
        
        return redisClient;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export default getRedisClient;