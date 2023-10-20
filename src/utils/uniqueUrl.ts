import { nanoid } from 'nanoid';
import UrlModels from '@/db/UrlModels';

async function generateUnique(customAddress?: string): Promise<string> {
    if (customAddress) {
        const existingUrl = await UrlModels.findOne({ unique: customAddress });

        if (existingUrl) {
            throw new Error('Custom unique already exists');
        }

        return customAddress;
    } else {
        return nanoid(5);
    }
}

export default generateUnique;
