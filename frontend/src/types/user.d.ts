interface IUser {
    id: string;
    username: string;
    fullName: string;
    email: string;
    password?: string;
    bio: string;
    avatar: string | File | null;
    topicsOfInterest: string[];
}
