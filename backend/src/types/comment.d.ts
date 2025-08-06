interface IComment {
    id: string;
    content: string;
    updatedAt: string;
    author: IUser;
    authorId: string;
    postId: string;
}
