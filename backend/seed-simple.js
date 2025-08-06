const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const deleteAll = async () => {
    console.log('Deleting all data...');
    await prisma.like.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    console.log('All data deleted successfully!');
};

const seed = async () => {
    try {
        console.log('Starting to seed the database...');
        
        // Create some sample users
        const user1 = await prisma.user.create({
            data: {
                username: 'john_doe',
                password: 'hashed_password_123',
                bio: 'A passionate blogger who loves to share thoughts and ideas.',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                fullName: 'John Doe'
            }
        });

        const user2 = await prisma.user.create({
            data: {
                username: 'jane_smith',
                password: 'hashed_password_456',
                bio: 'Tech enthusiast and writer. Always exploring new technologies.',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                fullName: 'Jane Smith'
            }
        });

        console.log('Users created:', user1.username, user2.username);

        // Create some sample posts
        const post1 = await prisma.post.create({
            data: {
                title: 'Getting Started with Web Development',
                content: 'Web development is an exciting journey that combines creativity with technical skills. In this post, we\'ll explore the fundamentals of HTML, CSS, and JavaScript that every beginner should know.',
                preview: 'Learn the basics of web development with HTML, CSS, and JavaScript. Perfect for beginners starting their coding journey.',
                likesNumber: 0,
                postImg: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
                authorId: user1.id,
                updatedAt: new Date()
            }
        });

        const post2 = await prisma.post.create({
            data: {
                title: 'The Future of Artificial Intelligence',
                content: 'Artificial Intelligence is transforming the way we live and work. From machine learning algorithms to neural networks, AI is becoming an integral part of our daily lives.',
                preview: 'Explore how artificial intelligence is shaping the future and what we can expect in the coming years.',
                likesNumber: 0,
                postImg: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
                authorId: user2.id,
                updatedAt: new Date()
            }
        });

        console.log('Posts created:', post1.title, post2.title);

        // Create some sample comments
        await prisma.comment.create({
            data: {
                content: 'Great article! This really helped me understand the basics.',
                postId: post1.id,
                authorId: user2.id,
                updatedAt: new Date()
            }
        });

        await prisma.comment.create({
            data: {
                content: 'Thanks for sharing this valuable information!',
                postId: post2.id,
                authorId: user1.id,
                updatedAt: new Date()
            }
        });

        console.log('Comments created successfully!');

        // Create some sample likes
        await prisma.like.create({
            data: {
                postId: post1.id,
                userId: user2.id
            }
        });

        await prisma.like.create({
            data: {
                postId: post2.id,
                userId: user1.id
            }
        });

        console.log('Likes created successfully!');

        console.log('Database seeded successfully! 🎉');
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
};

// Run the seed function
deleteAll().then(() => seed()); 