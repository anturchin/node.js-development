import { IComment } from '../../models/comment/types';
import Comment from '../../models/comment/Comment';

export class CommentService {
    public async createNewComment(
        commentData: IComment
    ): Promise<{ comment: IComment; commentId: string }> {
        const newComment = new Comment(commentData);
        await newComment.save();
        return {
            comment: newComment,
            commentId: newComment.id,
        };
    }

    public async findCommentsByCourseId(courseId: string): Promise<IComment[]> {
        const foundComments = await Comment.find({ courseId }).exec();
        return foundComments;
    }

    public async deleteComment(commentId: string): Promise<IComment | null> {
        const deletedComment = await Comment.findByIdAndDelete(commentId).exec();
        return deletedComment;
    }
}
