// ...existing code...
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Grid,
    Chip,
    Stack,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    LightbulbOutlined,
    PsychologyOutlined,
    AutoAwesomeOutlined,
} from '@mui/icons-material';
import { CustomContainer } from '../../../components/Layout/CustomContainer';
import Header from '../../../components/Layout/Header';

const About = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const features = [
        {
            icon: <LightbulbOutlined sx={{ fontSize: isMobile ? 28 : 40, color: '#1A8917' }} />,
            title: "Share Your Ideas",
            description: "Transform your thoughts into compelling blog posts. FirstThought is where your ideas come to life."
        },
        {
            icon: <PsychologyOutlined sx={{ fontSize: isMobile ? 28 : 40, color: '#1A8917' }} />,
            title: "Express Yourself",
            description: "Write about what matters to you. Share your perspectives, experiences, and insights with the world."
        },
        {
            icon: <AutoAwesomeOutlined sx={{ fontSize: isMobile ? 28 : 40, color: '#1A8917' }} />,
            title: "Rich Content",
            description: "Create beautiful posts with markdown formatting, images, and multimedia content to enhance your stories."
        }
    ];

    const goals = [
        { number: "1000+", label: "Posts Target" },
        { number: "500+", label: "Writers Goal" },
        { number: "100K+", label: "Words Shared" },
        { number: "24/7", label: "Always Available" }
    ];

    return (
        <>
            <Header />
            <CustomContainer>
                <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 6 }}>
                                 {/* Hero Section */}
                 <Box 
                     sx={{ 
                         textAlign: 'center', 
                         mb: isMobile ? 4 : 8,
                         position: 'relative',
                         overflow: 'hidden',
                         '&::before': {
                             content: '""',
                             position: 'absolute',
                             top: '-50%',
                             left: '-50%',
                             width: '200%',
                             height: '200%',
                             background: 'radial-gradient(circle, rgba(26, 137, 23, 0.05) 0%, transparent 70%)',
                             animation: 'float 6s ease-in-out infinite',
                             zIndex: -1,
                         },
                         '@keyframes float': {
                             '0%, 100%': {
                                 transform: 'translateY(0px) rotate(0deg)',
                             },
                             '50%': {
                                 transform: 'translateY(-20px) rotate(180deg)',
                             },
                         },
                     }}
                 >
                     <Typography
                         variant="h1"
                         sx={{
                             fontSize: isMobile ? '1.8rem' : { xs: '2.5rem', md: '4rem' },
                             fontWeight: 700,
                             background: 'linear-gradient(45deg, #1A8917, #4CAF50, #66BB6A)',
                             backgroundSize: '200% 200%',
                             backgroundClip: 'text',
                             WebkitBackgroundClip: 'text',
                             WebkitTextFillColor: 'transparent',
                             mb: 3,
                             animation: 'gradientShift 3s ease-in-out infinite',
                             '@keyframes gradientShift': {
                                 '0%, 100%': {
                                     backgroundPosition: '0% 50%',
                                 },
                                 '50%': {
                                     backgroundPosition: '100% 50%',
                                 },
                             },
                         }}
                     >
                         Welcome to FirstThought
                     </Typography>
                     <Typography
                         variant="h4"
                         sx={{
                             color: 'text.secondary',
                             fontWeight: 300,
                             mb: isMobile ? 2 : 4,
                             maxWidth: 800,
                             mx: 'auto',
                             lineHeight: isMobile ? 1.4 : 1.6,
                             fontSize: isMobile ? '1rem' : 'inherit',
                             opacity: 0,
                             animation: 'fadeInUp 1s ease-out 0.5s forwards',
                             '@keyframes fadeInUp': {
                                 '0%': {
                                     opacity: 0,
                                     transform: 'translateY(30px)',
                                 },
                                 '100%': {
                                     opacity: 1,
                                     transform: 'translateY(0)',
                                 },
                             },
                         }}
                     >
                         A simple, elegant platform for sharing your thoughts, ideas, and stories with the world.
                     </Typography>
                     <Chip
                         label="Start Writing"
                         onClick={() => navigate('/posts/editor')}
                         sx={{
                             backgroundColor: '#1A8917',
                             color: 'white',
                             fontSize: isMobile ? '0.9rem' : '1.1rem',
                             px: isMobile ? 2 : 4,
                             py: isMobile ? 1 : 2,
                             borderRadius: '25px',
                             boxShadow: '0 4px 15px rgba(26, 137, 23, 0.3)',
                             transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                             opacity: 0,
                             animation: 'fadeInUp 1s ease-out 1s forwards',
                             cursor: 'pointer',
                             '&:hover': {
                                 backgroundColor: '#156615',
                                 transform: 'translateY(-2px) scale(1.05)',
                                 boxShadow: '0 8px 25px rgba(26, 137, 23, 0.4)',
                             },
                         }}
                     />
                 </Box>

                

                                 {/* Features Grid */}
                 <Box sx={{ mb: isMobile ? 4 : 8 }}>
                     <Typography
                         variant="h3"
                         sx={{
                             textAlign: 'center',
                             mb: isMobile ? 3 : 6,
                             fontWeight: 600,
                             color: '#1A8917',
                             fontSize: isMobile ? '1.5rem' : 'inherit',
                             position: 'relative',
                             '&::after': {
                                 content: '""',
                                 position: 'absolute',
                                 bottom: '-10px',
                                 left: '50%',
                                 transform: 'translateX(-50%)',
                                 width: isMobile ? '40px' : '60px',
                                 height: '3px',
                                 background: 'linear-gradient(90deg, #1A8917, #4CAF50)',
                                 borderRadius: '2px',
                             },
                         }}
                     >
                         What Makes FirstThought Special?
                     </Typography>
                     <Grid container spacing={isMobile ? 2 : 4}>
                         {features.map((feature, index) => (
                             <Grid item xs={12} sm={6} md={4} key={index}>
                                 <Box
                                     sx={{
                                         p: isMobile ? 2 : 3,
                                         textAlign: 'center',
                                         border: '1px solid #e0e0e0',
                                         borderRadius: 2,
                                         background: '#ffffff',
                                         transition: 'all 0.3s ease',
                                         '&:hover': {
                                             borderColor: '#1A8917',
                                             backgroundColor: '#f8f9fa',
                                         },
                                     }}
                                 >
                                     <Box 
                                         sx={{ 
                                             mb: isMobile ? 1.5 : 2,
                                             display: 'flex',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             width: isMobile ? '50px' : '60px',
                                             height: isMobile ? '50px' : '60px',
                                             mx: 'auto',
                                             borderRadius: '50%',
                                             background: 'rgba(26, 137, 23, 0.1)',
                                         }}
                                     >
                                         {feature.icon}
                                     </Box>
                                     <Typography
                                         variant="h6"
                                         sx={{
                                             fontWeight: 600,
                                             mb: isMobile ? 1 : 1.5,
                                             color: '#1A8917',
                                             fontSize: isMobile ? '1rem' : 'inherit',
                                         }}
                                     >
                                         {feature.title}
                                     </Typography>
                                     <Typography
                                         variant="body2"
                                         sx={{
                                             color: 'text.secondary',
                                             lineHeight: isMobile ? 1.4 : 1.6,
                                             fontSize: isMobile ? '0.8rem' : 'inherit',
                                         }}
                                     >
                                         {feature.description}
                                     </Typography>
                                 </Box>
                             </Grid>
                         ))}
                     </Grid>
                 </Box>

                                 {/* Stats Section */}
                 <Box
                     sx={{
                         p: isMobile ? 3 : 4,
                         mb: isMobile ? 4 : 6,
                         background: 'linear-gradient(135deg, #1A8917 0%, #4CAF50 100%)',
                         borderRadius: 2,
                         color: 'white',
                         textAlign: 'center',
                     }}
                 >
                     <Typography
                         variant="h4"
                         sx={{
                             textAlign: 'center',
                             mb: isMobile ? 3 : 4,
                             fontWeight: 600,
                             fontSize: isMobile ? '1.3rem' : 'inherit',
                         }}
                     >
                         Our Goals
                     </Typography>
                     <Grid container spacing={isMobile ? 2 : 3}>
                         {goals.map((goal, index) => (
                             <Grid item xs={6} md={3} key={index}>
                                 <Box 
                                     sx={{ 
                                         textAlign: 'center',
                                     }}
                                 >
                                     <Typography
                                         variant="h3"
                                         sx={{
                                             fontWeight: 700,
                                             mb: 0.5,
                                             fontSize: isMobile ? '1.5rem' : 'inherit',
                                         }}
                                     >
                                         {goal.number}
                                     </Typography>
                                     <Typography
                                         variant="body2"
                                         sx={{
                                             opacity: 0.9,
                                             fontWeight: 400,
                                             fontSize: isMobile ? '0.8rem' : 'inherit',
                                         }}
                                     >
                                         {goal.label}
                                     </Typography>
                                 </Box>
                             </Grid>
                         ))}
                     </Grid>
                 </Box>



                 {/* Quote Section */}
                 <Box sx={{ mb: isMobile ? 4 : 6, textAlign: 'center' }}>
                     <Box
                         sx={{
                             background: '#f0f8f0',
                             p: isMobile ? 3 : 4,
                             borderRadius: 2,
                             border: '1px solid #1A8917',
                             maxWidth: 600,
                             mx: 'auto',
                         }}
                     >
                         <Typography
                             variant="h5"
                             sx={{
                                 fontWeight: 600,
                                 color: '#1A8917',
                                 mb: 1,
                                 fontSize: isMobile ? '1.1rem' : 'inherit',
                             }}
                         >
                             "Every great thought starts with a first thought."
                         </Typography>
                         <Typography
                             variant="body2"
                             sx={{
                                 color: 'text.secondary',
                                 fontStyle: 'italic',
                                 fontSize: isMobile ? '0.8rem' : 'inherit',
                             }}
                         >
                             — The FirstThought Team
                         </Typography>
                     </Box>
                 </Box>

                {/* Values Section */}
                <Box sx={{ mb: isMobile ? 4 : 6 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            mb: isMobile ? 3 : 4,
                            fontWeight: 600,
                            color: '#1A8917',
                            fontSize: isMobile ? '1.3rem' : 'inherit',
                        }}
                    >
                        Our Values
                    </Typography>
                    <Grid container spacing={isMobile ? 2 : 3}>
                        {[
                            {
                                title: "Simplicity",
                                description: "We believe in clean, intuitive design that doesn't get in the way of your writing."
                            },
                            {
                                title: "Quality",
                                description: "We focus on providing the best possible writing and reading experience."
                            },
                            {
                                title: "Accessibility",
                                description: "Everyone should have the tools to share their thoughts and ideas."
                            },
                            {
                                title: "Innovation",
                                description: "We're constantly improving to better serve our writers and readers."
                            }
                        ].map((value, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box
                                    sx={{
                                        p: isMobile ? 2 : 3,
                                        textAlign: 'center',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 2,
                                        height: '100%',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#1A8917',
                                            backgroundColor: '#f8f9fa',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: isMobile ? 1 : 1.5,
                                            color: '#1A8917',
                                            fontSize: isMobile ? '1rem' : 'inherit',
                                        }}
                                    >
                                        {value.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            lineHeight: isMobile ? 1.4 : 1.6,
                                            fontSize: isMobile ? '0.8rem' : 'inherit',
                                        }}
                                    >
                                        {value.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Call to Action */}
                <Box
                    sx={{
                        p: isMobile ? 3 : 4,
                        textAlign: 'center',
                        background: '#f8f9fa',
                        borderRadius: 2,
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            mb: isMobile ? 2 : 3,
                            color: '#1A8917',
                            fontSize: isMobile ? '1.3rem' : 'inherit',
                        }}
                    >
                        Ready to Share Your First Thought?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            mb: isMobile ? 2 : 3,
                            maxWidth: 600,
                            mx: 'auto',
                            lineHeight: isMobile ? 1.4 : 1.6,
                            fontSize: isMobile ? '0.9rem' : 'inherit',
                        }}
                    >
                        Join writers who are already sharing their ideas and stories 
                        on FirstThought. Your voice matters, and we're here to amplify it.
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                                                 <Chip
                             label="Start Writing"
                             onClick={() => navigate('/posts/editor')}
                             sx={{
                                 backgroundColor: '#1A8917',
                                 color: 'white',
                                 fontSize: isMobile ? '0.9rem' : '1.1rem',
                                 px: isMobile ? 2 : 4,
                                 py: isMobile ? 1 : 2,
                                 cursor: 'pointer',
                                 transition: 'all 0.3s ease',
                                 '&:hover': {
                                     backgroundColor: '#156615',
                                     transform: 'translateY(-2px) scale(1.05)',
                                 },
                             }}
                         />
                         <Chip
                             label="Explore Posts"
                             onClick={() => navigate('/')}
                             variant="outlined"
                             sx={{
                                 borderColor: '#1A8917',
                                 color: '#1A8917',
                                 fontSize: isMobile ? '0.9rem' : '1.1rem',
                                 px: isMobile ? 2 : 4,
                                 py: isMobile ? 1 : 2,
                                 cursor: 'pointer',
                                 transition: 'all 0.3s ease',
                                 '&:hover': {
                                     backgroundColor: '#1A8917',
                                     color: 'white',
                                     transform: 'translateY(-2px) scale(1.05)',
                                 },
                             }}
                         />
                    </Stack>
                </Box>
            </Container>
            </CustomContainer>
        </>
    );
};

export default About; 