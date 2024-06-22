import { ICreateRatingDto } from '../../dto/ratingDto/CreateRatingDto';
import Rating from '../../models/rating/Rating';
import { IRatingDocument } from '../../models/rating/types';

export class RatingService {
    public async createNewRating(rating: ICreateRatingDto): Promise<IRatingDocument> {
        const newRating = new Rating(rating);
        await newRating.save();
        return newRating;
    }

    public async findRatingsByCourseId(courseId: string): Promise<IRatingDocument[]> {
        const foundRatings = await Rating.find({ courseId }).exec();
        return foundRatings;
    }

    public async deleteRating(ratingId: string): Promise<IRatingDocument | null> {
        const deletedRating = await Rating.findByIdAndDelete(ratingId).exec();
        return deletedRating;
    }
}
