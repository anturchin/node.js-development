import { ICommentDocument } from '../../models/comment/types';
import Comment from '../../models/comment/Comment';
import { ICreateCommentDto } from '../../dto/commentDto/CreateCommentDto';

export class CommentService {
    public async createNewComment(commentData: ICreateCommentDto): Promise<ICommentDocument> {
        const newComment = new Comment(commentData);
        await newComment.save();
        return newComment;
    }

    public async findCommentsByCourseId(courseId: string): Promise<ICommentDocument[]> {
        const foundComments = await Comment.find({ courseId }).exec();
        return foundComments;
    }

    public async deleteComment(commentId: string): Promise<ICommentDocument | null> {
        const deletedComment = await Comment.findByIdAndDelete(commentId).exec();
        return deletedComment;
    }
}
