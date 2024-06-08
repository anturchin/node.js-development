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
}

export default DataBase;
