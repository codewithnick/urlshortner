import getRedisClient from '../utils/redisConnect';
import shortid from 'shortid';

export interface IUrl {
    originalUrl: string;
    shortUrl: string;
}

export const createShortUrl = async (originalUrl: string): Promise<IUrl> => {
    let redisClient =await getRedisClient();
    const shortUrl = shortid.generate();
    await redisClient.set(shortUrl, originalUrl);
    return { originalUrl, shortUrl };
};

export const getOriginalUrl = async (shortUrl: string): Promise<string | null> => {
    let redisClient =await getRedisClient();
    return await redisClient.get(shortUrl);
};
