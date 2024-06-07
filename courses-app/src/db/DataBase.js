import mongoose from 'mongoose';

class DataBase {
	static async connect() {
		try {
			await mongoose.connect('mongodb://127.0.0.1:27017/courses');
			console.log('MongoDB connected successfully');
		} catch (err) {
			console.error('MongoDB connection failed', err);
			process.exit(1);
		}
	}
}

export default DataBase;
