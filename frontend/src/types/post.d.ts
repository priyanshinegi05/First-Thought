interface IPost {
    id: string;
    title: string;
    content: string;
    preview: string;
    likesNumber?: number;
    likes?: any[];
    postImg?: string | File;
    tags?: string[];
    comments: IComment[];
    author: IUser;
    authorId: string;
    createdAt: string;
    updatedAt: string;
}
