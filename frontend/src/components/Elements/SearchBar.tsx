import React, { useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Popper,
    Paper,
    List,
    ListItem,
    ListItemText,
    Typography,
    CircularProgress,
    ClickAwayListener,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSearchPostsQuery } from '../../features/posts/api/searchPosts';
// import PostPreview from '../../features/posts/components/PostPreview';

interface SearchBarProps {
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search posts..." }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [query, setQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const { data: searchResults, isLoading, isError } = useSearchPostsQuery(query);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        setIsOpen(value.length > 0);
    };

    const handleClear = () => {
        setQuery('');
        setIsOpen(false);
    };

    const handlePostClick = (postId: string) => {
        navigate(`/posts/${postId}`);
        setIsOpen(false);
        setQuery('');
    };

    const handleClickAway = () => {
        setIsOpen(false);
    };

    const handleInputRef = (element: HTMLInputElement | null) => {
        setAnchorEl(element);
    };

    const open = isOpen && (query.length > 0);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', width: '100%', maxWidth: isMobile ? '100%' : 400 }}>
                <TextField
                    fullWidth
                    size={isMobile ? "medium" : "small"}
                    placeholder={placeholder}
                    value={query}
                    onChange={handleSearchChange}
                    onFocus={() => setIsOpen(query.length > 0)}
                    inputRef={handleInputRef}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {isLoading && query.length > 0 && <CircularProgress size={20} />}
                                {query && (
                                    <IconButton
                                        size="small"
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
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                        },
                    }}
                />

                <Popper
                    open={open}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    style={{ zIndex: 1300 }}
                    modifiers={[
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 4],
                            },
                        },
                    ]}
                >
                    <Paper
                        elevation={8}
                        sx={{
                            width: anchorEl ? anchorEl.offsetWidth : 'auto',
                            maxHeight: 400,
                            overflow: 'auto',
                            borderRadius: 2,
                            border: '1px solid #e0e0e0',
                        }}
                    >
                        {isLoading ? (
                            <Box sx={{ p: 2, textAlign: 'center' }}>
                                <CircularProgress size={24} />
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Searching...
                                </Typography>
                            </Box>
                        ) : isError ? (
                            <Box sx={{ p: 2 }}>
                                <Typography variant="body2" color="error">
                                    Error searching posts
                                </Typography>
                            </Box>
                        ) : searchResults && searchResults.length > 0 ? (
                            <List sx={{ p: 0 }}>
                                {searchResults.map((post: IPost) => (
                                    <ListItem
                                        key={post.id}
                                        button
                                        onClick={() => handlePostClick(post.id)}
                                        sx={{
                                            borderBottom: '1px solid #f0f0f0',
                                            '&:last-child': {
                                                borderBottom: 'none',
                                            },
                                            '&:hover': {
                                                backgroundColor: '#f8f9fa',
                                            },
                                            py: 2,
                                            px: 3,
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box>
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontWeight={600}
                                                        sx={{ mb: 0.5, color: '#1A8917' }}
                                                    >
                                                        {post.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{ mb: 1 }}
                                                    >
                                                        {post.preview}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                                        <Typography variant="caption" color="text.secondary">
                                                            By {post.author.fullName}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {new Date(post.createdAt).toLocaleDateString()}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {post.likes?.length || 0} like{(post.likes?.length || 0) !== 1 ? 's' : ''}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        ) : query.length > 0 ? (
                            <Box sx={{ p: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    No posts found for "{query}"
                                </Typography>
                            </Box>
                        ) : null}
                    </Paper>
                </Popper>
            </Box>
        </ClickAwayListener>
    );
}; 