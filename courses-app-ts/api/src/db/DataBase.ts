import mongoose from 'mongoose';

class DataBase {
    static async connect(uri: string): Promise<void> {
        try {
            await mongoose.connect(uri);
            console.log('MongoDB connected successfully');
        } catch (err) {
            if (err instanceof Error) console.error('MongoDB connection failed', err.message);
            process.exit(1);
        }
    }

    static async disconnect(): Promise<void> {
        try {
            await mongoose.disconnect();
            console.log('MongoDB disconnected successfully');
        } catch (err) {
            if (err instanceof Error) console.error('MongoDB disconnection failed', err.message);
        }
    }

    static async clearCollections(): Promise<void> {
        const collections = Object.values(mongoose.connection.collections);
        const clearCollectionPromises = collections.map((collection) => collection.deleteMany({}));
        await Promise.all(clearCollectionPromises);
        console.log('MongoDB collections cleared successfully');
    }
}

export default DataBase;
