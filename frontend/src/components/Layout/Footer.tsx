import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme, Grid, Container, IconButton } from "@mui/material";
import { 
    LinkedIn as LinkedInIcon, 
    Instagram as InstagramIcon, 
    KeyboardArrowUp as ArrowUpIcon,
    Email as EmailIcon
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
// ...existing code...
import SavedPostsDropdown from "../../features/savedPosts/components/SavedPostsDropdown";
import { NewsletterModal } from "../Elements";
import { useState } from "react";

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [savedPostsAnchorEl, setSavedPostsAnchorEl] = useState<HTMLElement | null>(null);
    const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
// ...existing code...
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearchClick = () => {
        navigate('/');
        // Focus on search bar after navigation
        setTimeout(() => {
            const searchInput = document.querySelector('input[placeholder="Search posts..."]') as HTMLInputElement;
            if (searchInput) {
                searchInput.focus();
            }
        }, 100);
    };

    const handleSavedPostsClick = (event: React.MouseEvent<HTMLElement>) => {
        setSavedPostsAnchorEl(event.currentTarget);
    };

    const handleSavedPostsClose = () => {
        setSavedPostsAnchorEl(null);
    };

    const handleNewsletterClick = () => {
        setNewsletterModalOpen(true);
    };

    const handleNewsletterClose = () => {
        setNewsletterModalOpen(false);
    };

    return (
        <Box
            sx={{
                backgroundColor: "#2c3e50",
                borderTop: "1px solid #34495e",
                mt: "auto",
                color: "#ecf0f1",
            }}
        >
            {/* Main Footer Content */}
            <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 6 }}>
                <Grid container spacing={isMobile ? 2 : 4}>
                    {/* About First Thought Section */}
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "'Dancing Script', cursive",
                                fontWeight: 600,
                                fontSize: isMobile ? "1rem" : "1.5rem",
                                color: "#1A8917",
                                mb: isMobile ? 1 : 2,
                            }}
                        >
                            About First Thought
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#bdc3c7",
                                lineHeight: 1.6,
                                mb: isMobile ? 1 : 2,
                                fontSize: isMobile ? "0.75rem" : "1rem",
                            }}
                        >
                            A modern blogging platform where writers can share their thoughts, stories, and insights. 
                            Create, publish, and discover meaningful content in a clean, user-friendly environment.
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#3498db",
                                fontWeight: 500,
                                fontSize: isMobile ? "0.75rem" : "1rem",
                            }}
                        >
                            Write your thoughts, share your stories, inspire others.
                        </Typography>
                    </Grid>

                    {/* Quick Links and Connect Container for Mobile */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={isMobile ? 2 : 4}>
                            {/* Quick Links Section */}
                            <Grid item xs={6} md={6}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                fontSize: isMobile ? "0.9rem" : "1.25rem",
                                color: "#ecf0f1",
                                mb: isMobile ? 1 : 2,
                            }}
                        >
                            Quick Links
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: isMobile ? 0.5 : 1 }}>
                            <Link
                                component={NavLink}
                                to="/"
                                sx={{
                                    color: "#bdc3c7",
                                    textDecoration: "none",
                                    fontSize: isMobile ? "0.7rem" : "1rem",
                                    "&:hover": {
                                        color: "#3498db",
                                    },
                                }}
                            >
                                Home
                            </Link>
                            <Link
                                component={NavLink}
                                to="/about"
                                sx={{
                                    color: "#bdc3c7",
                                    textDecoration: "none",
                                    fontSize: isMobile ? "0.7rem" : "1rem",
                                    "&:hover": {
                                        color: "#3498db",
                                    },
                                }}
                            >
                                About
                            </Link>
                            <Link
                                component={NavLink}
                                to="/posts/editor"
                                sx={{
                                    color: "#bdc3c7",
                                    textDecoration: "none",
                                    fontSize: isMobile ? "0.7rem" : "1rem",
                                    "&:hover": {
                                        color: "#3498db",
                                    },
                                }}
                            >
                                Write
                            </Link>
                            <Link
                                component="button"
                                onClick={handleSearchClick}
                                sx={{
                                    color: "#bdc3c7",
                                    textDecoration: "none",
                                    fontSize: isMobile ? "0.7rem" : "1rem",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    "&:hover": {
                                        color: "#3498db",
                                    },
                                }}
                            >
                                Search
                            </Link>
                            <Link
                                component="button"
                                onClick={handleSavedPostsClick}
                                sx={{
                                    color: "#bdc3c7",
                                    textDecoration: "none",
                                    fontSize: isMobile ? "0.7rem" : "1rem",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    "&:hover": {
                                        color: "#3498db",
                                    },
                                }}
                            >
                                Saved Posts
                            </Link>
                        </Box>
                    </Grid>

                            {/* Connect Section */}
                            <Grid item xs={6} md={6}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                fontSize: isMobile ? "0.9rem" : "1.25rem",
                                color: "#ecf0f1",
                                mb: isMobile ? 1 : 2,
                            }}
                        >
                            Connect
                        </Typography>
                        
                                                 {/* Newsletter */}
                         <Link
                             component="button"
                             onClick={handleNewsletterClick}
                             sx={{
                                 color: "#bdc3c7",
                                 fontSize: isMobile ? "0.7rem" : "1rem",
                                 mb: isMobile ? 0.5 : 1,
                                 background: "none",
                                 border: "none",
                                 cursor: "pointer",
                                 textAlign: "left",
                                 padding: 0,
                                 fontFamily: "inherit",
                                 fontWeight: 600,
                                 "&:hover": {
                                     color: "#3498db",
                                 },
                             }}
                         >
                             Newsletter
                         </Link>
                         <Typography
                             variant="body2"
                             sx={{
                                 color: "#bdc3c7",
                                 fontSize: isMobile ? "0.65rem" : "0.875rem",
                                 mb: isMobile ? 1 : 2,
                             }}
                         >
                             Subscribe for updates and new posts
                         </Typography>

                         

                                                                                                     {/* Contact */}
                           <Typography
                               variant="body2"
                               sx={{
                                   color: "#bdc3c7",
                                   fontSize: isMobile ? "0.7rem" : "1rem",
                                   mb: isMobile ? 0.5 : 1,
                               }}
                           >
                               Contact
                           </Typography>
                                                     <Box sx={{ display: "flex", flexDirection: "column", gap: isMobile ? 0.5 : 1 }}>
                               <Link
                                   href="mailto:firstthought.platform@gmail.com"
                                   sx={{
                                       color: "#bdc3c7",
                                       textDecoration: "none",
                                       fontSize: isMobile ? "0.65rem" : "1rem",
                                       display: "flex",
                                       alignItems: "center",
                                       gap: 0.5,
                                       "&:hover": {
                                           color: "#3498db",
                                       },
                                   }}
                               >
                                   <EmailIcon sx={{ fontSize: isMobile ? "12px" : "16px" }} />
                                   firstthought.platform@gmail.com
                               </Link>
                            </Box>

                            {/* Founder */}
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#95a5a6",
                                    fontSize: isMobile ? "0.6rem" : "0.875rem",
                                    fontStyle: "italic",
                                    mb: isMobile ? 0.5 : 1,
                                }}
                            >
                                Founder
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: isMobile ? 0.5 : 1 }}>
                                <Link
                                    href="mailto:priyanshinegi001@gmail.com"
                                    sx={{
                                        color: "#bdc3c7",
                                        textDecoration: "none",
                                        fontSize: isMobile ? "0.65rem" : "1rem",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        "&:hover": {
                                            color: "#3498db",
                                        },
                                    }}
                                >
                                    <EmailIcon sx={{ fontSize: isMobile ? "12px" : "16px" }} />
                                    priyanshinegi001@gmail.com
                                </Link>
                                <Box sx={{ 
                                    display: "flex", 
                                    gap: isMobile ? 1 : 2,
                                    flexWrap: "wrap"
                                }}>
                                    <Link
                                        href="https://www.linkedin.com/in/priyanshi-negi-7578ba249"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            color: "#bdc3c7",
                                            textDecoration: "none",
                                            fontSize: isMobile ? "0.65rem" : "1rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.25,
                                            "&:hover": {
                                                color: "#3498db",
                                            },
                                        }}
                                    >
                                        <LinkedInIcon sx={{ fontSize: isMobile ? "12px" : "16px" }} />
                                        @priyanshi-negi
                                    </Link>
                                    <Link
                                        href="https://www.instagram.com/priyanshi_negi_"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            color: "#bdc3c7",
                                            textDecoration: "none",
                                            fontSize: isMobile ? "0.65rem" : "1rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.25,
                                            "&:hover": {
                                                color: "#3498db",
                                            },
                                        }}
                                    >
                                        <InstagramIcon sx={{ fontSize: isMobile ? "12px" : "16px" }} />
                                        @priyanshi_negi_
                                    </Link>
                                </Box>
                            </Box>
                            </Grid>
                                                 </Grid>
                     </Grid>
                 </Grid>

                 
             </Container>

            {/* Bottom Bar */}
            <Box
                sx={{
                    borderTop: "1px solid #34495e",
                    backgroundColor: "#1a252f",
                    py: isMobile ? 1 : 2,
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: isMobile ? 1 : 0,
                        }}
                    >
                        {/* Copyright */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#95a5a6",
                                fontSize: isMobile ? "0.65rem" : "0.875rem",
                            }}
                        >
                            © 2025 First Thought. All rights reserved.
                        </Typography>

                        {/* Legal Links */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: isMobile ? 1 : 2,
                                alignItems: "center",
                            }}
                        >
                            <Link
                                href="/privacy"
                                sx={{
                                    color: "#95a5a6",
                                    textDecoration: "none",
                                    fontSize: isMobile ? "0.65rem" : "0.875rem",
                                    "&:hover": {
                                        color: "#3498db",
                                    },
                                }}
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms"
                                sx={{
                                    color: "#95a5a6",
                                    textDecoration: "none",
                                    fontSize: isMobile ? "0.65rem" : "0.875rem",
                                    "&:hover": {
                                        color: "#3498db",
                                    },
                                }}
                            >
                                Terms
                            </Link>
                            <IconButton
                                size="small"
                                onClick={scrollToTop}
                                sx={{
                                    color: "#95a5a6",
                                    "&:hover": {
                                        color: "#3498db",
                                        backgroundColor: "rgba(52, 152, 219, 0.1)",
                                    },
                                }}
                            >
                                <ArrowUpIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Container>
            </Box>
            
                         {/* Saved Posts Modal */}
             <SavedPostsDropdown
                 anchorEl={savedPostsAnchorEl}
                 onClose={handleSavedPostsClose}
             />
             
             {/* Newsletter Modal */}
             <NewsletterModal
                 open={newsletterModalOpen}
                 onClose={handleNewsletterClose}
             />
         </Box>
     );
 };

export default Footer;
