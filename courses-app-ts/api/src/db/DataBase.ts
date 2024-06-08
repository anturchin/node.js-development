import mongoose from 'mongoose';

class DataBase {
    static async connect(): Promise<void> {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/courses');
            console.log('MongoDB connected successfully');
        } catch (err) {
            if (err instanceof Error) console.error('MongoDB connection failed', err.message);
            process.exit(1);
        }
    }
}

export default DataBase;
