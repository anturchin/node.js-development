import Rating from '../../models/rating/Rating';
import { IRating } from '../../models/rating/types';

export class RatingService {
    public async createNewRating(rating: IRating): Promise<IRating> {
        const newRating = new Rating(rating);
        await newRating.save();
        return newRating;
    }

    public async findRatingsByCourseId(courseId: string): Promise<IRating[]> {
        const foundRatings = await Rating.find({ courseId }).exec();
        return foundRatings;
    }

    public async deleteRating(ratingId: string): Promise<IRating | null> {
        const deletedRating = await Rating.findByIdAndDelete(ratingId).exec();
        return deletedRating;
    }
}
