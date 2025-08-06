import React, { useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Typography,
    CircularProgress,
    Container,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSearchPostsQuery } from '../../posts/api/searchPosts';
import { CustomContainer } from '../../../components/Layout/CustomContainer';
import Header from '../../../components/Layout/Header';

const Search = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { data: searchResults, isLoading, isError } = useSearchPostsQuery(query);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleClear = () => {
        setQuery('');
    };

    const handlePostClick = (postId: string) => {
        navigate(`/posts/${postId}`);
    };

    return (
        <>
            <Header />
            <CustomContainer maxWidth="lg">
                <Box sx={{ mt: 4, mb: 6 }}>
                <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center', color: '#1A8917' }}>
                    Search Posts
                </Typography>
                
                {/* Search Input */}
                <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                    <TextField
                        fullWidth
                        size="large"
                        placeholder="Search for posts by title, content, or keywords..."
                        value={query}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" sx={{ fontSize: 28 }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {isLoading && <CircularProgress size={24} />}
                                    {query && (
                                        <IconButton
                                            size="large"
                                            onClick={handleClear}
                                            edge="end"
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: 3,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: 'white',
                                },
                            },
                        }}
                    />
                </Box>

                {/* Search Results */}
                {query && (
                    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                        {isLoading ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <CircularProgress size={40} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Searching for "{query}"...
                                </Typography>
                            </Box>
                        ) : isError ? (
                            <Paper sx={{ p: 3, textAlign: 'center' }}>
                                <Typography variant="h6" color="error">
                                    Error searching posts
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Please try again later
                                </Typography>
                            </Paper>
                        ) : searchResults && searchResults.length > 0 ? (
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, color: '#1A8917' }}>
                                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
                                </Typography>
                                <Paper elevation={2}>
                                    <List sx={{ p: 0 }}>
                                        {searchResults.map((post: IPost, index: number) => (
                                            <React.Fragment key={post.id}>
                                                <ListItem
                                                    button
                                                    onClick={() => handlePostClick(post.id)}
                                                    sx={{
                                                        py: 3,
                                                        px: 3,
                                                        '&:hover': {
                                                            backgroundColor: '#f8f9fa',
                                                        },
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                                {post.title}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Box>
                                                                <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
                                                                    {post.preview}
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                                                    <Chip 
                                                                        label={`By ${post.author.fullName}`} 
                                                                        size="small" 
                                                                        color="primary" 
                                                                        variant="outlined"
                                                                    />
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        {new Date(post.createdAt).toLocaleDateString()}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        }
                                                    />
                                                </ListItem>
                                                {index < searchResults.length - 1 && <Divider />}
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </Paper>
                            </Box>
                        ) : (
                            <Paper sx={{ p: 4, textAlign: 'center' }}>
                                <Typography variant="h6" color="text.secondary">
                                    No posts found for "{query}"
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Try searching with different keywords
                                </Typography>
                            </Paper>
                        )}
                    </Box>
                )}

                {/* Empty State */}
                {!query && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <SearchIcon sx={{ fontSize: 80, color: '#1A8917', mb: 2, opacity: 0.5 }} />
                        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                            Start searching for posts
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Enter keywords to find posts by title, content, or preview
                        </Typography>
                    </Box>
                )}
            </Box>
            </CustomContainer>
        </>
    );
};

export default Search; 