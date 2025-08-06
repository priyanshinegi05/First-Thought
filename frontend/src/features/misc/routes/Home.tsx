import Box from "@mui/material/Box";
import { CustomContainer } from "../../../components/Layout/CustomContainer";
import PostFeed from "../../posts/components/PostFeed";
import Header from "../../../components/Layout/Header";
import { 
    Typography, 
    useMediaQuery, 
    useTheme, 
    Autocomplete, 
    TextField, 
    Chip,
    Paper,
    InputAdornment,
    IconButton,
    Slide,
    Collapse,
    Tooltip
} from "@mui/material";
import { SearchBar } from "../../../components/Elements/SearchBar";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import TuneIcon from "@mui/icons-material/Tune";
import { availableTopics } from "../../../utils/topics";

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [filterOpen, setFilterOpen] = useState(false);
    
    return (
        <>
            <Header />
            <CustomContainer>
                <Box
                    sx={(theme) => ({
                        padding: isMobile ? theme.spacing(2, 1) : theme.spacing(3, 0),
                        width: "100%",
                    })}
                >
                {/* Search Bar with Filter Icon and Filter Bar */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    mb: isMobile ? 3 : 4,
                    px: isMobile ? 1 : 3,
                    position: 'relative'
                }}>
                    <Box sx={{ 
                        maxWidth: isMobile ? '100%' : 600, 
                        width: '100%',
                        position: 'relative'
                    }}>
                        <SearchBar placeholder="Search posts..." />
                        
                        {/* Filter Icon - Inside search bar on mobile */}
                        {isMobile && (
                            <Tooltip title="Filter by topics" placement="top">
                                <IconButton
                                    onClick={() => setFilterOpen(!filterOpen)}
                                    sx={{
                                        position: 'absolute',
                                        right: 40, // Moved further left to avoid overlap with clear button
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        backgroundColor: filterOpen ? 'primary.main' : 'transparent',
                                        color: filterOpen ? 'white' : 'text.secondary',
                                        '&:hover': {
                                            backgroundColor: filterOpen ? 'primary.dark' : 'action.hover',
                                        },
                                        width: 32,
                                        height: 32,
                                        zIndex: 2
                                    }}
                                >
                                    <TuneIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                    
                    {/* Filter Bar and Icon - Laptop Only */}
                    {!isMobile && (
                        <>
                            {/* Sliding Filter Bar - Appears to the left of the icon */}
                            <Collapse in={filterOpen} timeout={300} orientation="horizontal">
                                <Box sx={{ 
                                    width: 'auto',
                                    maxWidth: 300,
                                    mr: 2
                                }}>
                                                                    <Autocomplete
                                    multiple
                                    freeSolo
                                    options={availableTopics}
                                    value={selectedTopics}
                                    onChange={(event, newValue) => {
                                        setSelectedTopics(newValue);
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                        // Handle custom input if needed
                                    }}
                                    disableCloseOnSelect
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Filter by topics..."
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        backgroundColor: 'background.paper',
                                                        borderRadius: 1.5,
                                                        minHeight: '36px',
                                                        '& fieldset': {
                                                            borderColor: 'divider',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'primary.main',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: 'primary.main',
                                                        },
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        fontSize: '0.8rem',
                                                        padding: '8px 10px',
                                                    },
                                                }}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    fontSize: '1rem'
                                                                }}
                                                            />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    {...getTagProps({ index })}
                                                    key={option}
                                                    label={option}
                                                    size="small"
                                                    deleteIcon={<ClearIcon />}
                                                    sx={{
                                                        backgroundColor: 'primary.main',
                                                        color: 'white',
                                                        fontSize: '0.65rem',
                                                        height: '20px',
                                                        margin: '1px',
                                                        '& .MuiChip-deleteIcon': {
                                                            color: 'white',
                                                            fontSize: '0.8rem',
                                                            '&:hover': {
                                                                color: 'error.light',
                                                            },
                                                        },
                                                    }}
                                                />
                                            ))
                                        }
                                        renderOption={(props, option) => (
                                            <Box component="li" {...props}>
                                                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                                    {option}
                                                </Typography>
                                            </Box>
                                        )}
                                                                            PaperComponent={({ children }) => (
                                        <Paper
                                            elevation={8}
                                            sx={{
                                                mt: 1,
                                                backgroundColor: 'background.paper',
                                                '& .MuiAutocomplete-listbox': {
                                                    maxHeight: 200,
                                                    backgroundColor: 'background.paper',
                                                },
                                            }}
                                        >
                                            {children}
                                        </Paper>
                                    )}
                                    />
                                    
                                    {/* Custom Chip Display */}
                                    {selectedTopics.length > 0 && (
                                        <Box sx={{ 
                                            mt: 0.5,
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 0.3,
                                        }}>
                                            {selectedTopics.map((topic, index) => (
                                                <Chip
                                                    key={topic}
                                                    label={topic}
                                                    size="small"
                                                    deleteIcon={<ClearIcon />}
                                                    onDelete={() => {
                                                        const newTopics = selectedTopics.filter((_, i) => i !== index);
                                                        setSelectedTopics(newTopics);
                                                    }}
                                                    sx={{
                                                        backgroundColor: 'primary.main',
                                                        color: 'white',
                                                        fontSize: '0.65rem',
                                                        height: '20px',
                                                        '& .MuiChip-deleteIcon': {
                                                            color: 'white',
                                                            fontSize: '0.8rem',
                                                            '&:hover': {
                                                                color: 'error.light',
                                                            },
                                                        },
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            </Collapse>
                            
                            {/* Filter Icon - Top right corner on laptop */}
                            <Tooltip title="Filter by topics" placement="top">
                                <IconButton
                                    onClick={() => setFilterOpen(!filterOpen)}
                                    sx={{
                                        backgroundColor: filterOpen ? 'primary.main' : 'transparent',
                                        color: filterOpen ? 'white' : 'text.secondary',
                                        '&:hover': {
                                            backgroundColor: filterOpen ? 'primary.dark' : 'action.hover',
                                        },
                                        width: 40,
                                        height: 40,
                                        zIndex: 2
                                    }}
                                >
                                    <TuneIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                </Box>
                
                
                
                {/* Sliding Filter Bar - Mobile Only */}
                {isMobile && (
                    <Collapse in={filterOpen} timeout={300}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            mb: 1.5,
                            px: 1
                        }}>
                            <Box sx={{ 
                                width: '100%',
                                maxWidth: '100%'
                            }}>
                                <Autocomplete
                                    multiple
                                    freeSolo
                                    options={availableTopics}
                                    value={selectedTopics}
                                    onChange={(event, newValue) => {
                                        setSelectedTopics(newValue);
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                        // Handle custom input if needed
                                    }}
                                    disableCloseOnSelect
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Filter by topics..."
                                            size="small"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'background.paper',
                                                    borderRadius: 1.5,
                                                    minHeight: '32px',
                                                    '& fieldset': {
                                                        borderColor: 'divider',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'primary.main',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'primary.main',
                                                    },
                                                },
                                                '& .MuiInputBase-input': {
                                                    fontSize: '0.75rem',
                                                    padding: '6px 8px',
                                                },
                                            }}
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon
                                                            sx={{
                                                                color: 'text.secondary',
                                                                fontSize: '1rem'
                                                            }}
                                                        />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip
                                                {...getTagProps({ index })}
                                                key={option}
                                                label={option}
                                                size="small"
                                                deleteIcon={<ClearIcon />}
                                                sx={{
                                                    backgroundColor: 'primary.main',
                                                    color: 'white',
                                                    fontSize: '0.65rem',
                                                    height: '20px',
                                                    margin: '1px',
                                                    '& .MuiChip-deleteIcon': {
                                                        color: 'white',
                                                        fontSize: '0.8rem',
                                                        '&:hover': {
                                                            color: 'error.light',
                                                        },
                                                    },
                                                }}
                                            />
                                        ))
                                    }
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                                {option}
                                            </Typography>
                                        </Box>
                                    )}
                                    PaperComponent={({ children }) => (
                                        <Paper
                                            elevation={8}
                                            sx={{
                                                mt: 1,
                                                backgroundColor: 'background.paper',
                                                '& .MuiAutocomplete-listbox': {
                                                    maxHeight: 200,
                                                    backgroundColor: 'background.paper',
                                                },
                                            }}
                                        >
                                            {children}
                                        </Paper>
                                    )}
                                />
                                
                                {/* Custom Chip Display */}
                                {selectedTopics.length > 0 && (
                                    <Box sx={{ 
                                        mt: 0.5,
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.3,
                                    }}>
                                        {selectedTopics.map((topic, index) => (
                                            <Chip
                                                key={topic}
                                                label={topic}
                                                size="small"
                                                deleteIcon={<ClearIcon />}
                                                onDelete={() => {
                                                    const newTopics = selectedTopics.filter((_, i) => i !== index);
                                                    setSelectedTopics(newTopics);
                                                }}
                                                sx={{
                                                    backgroundColor: 'primary.main',
                                                    color: 'white',
                                                    fontSize: '0.65rem',
                                                    height: '20px',
                                                    '& .MuiChip-deleteIcon': {
                                                        color: 'white',
                                                        fontSize: '0.8rem',
                                                        '&:hover': {
                                                            color: 'error.light',
                                                        },
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Collapse>
                )}
                
                <Typography
                    variant={isMobile ? "h4" : "h3"}
                    sx={{
                        fontWeight: 400,
                        mb: isMobile ? 2 : 3,
                        padding: isMobile ? theme.spacing(0, 1) : theme.spacing(0, 3),
                        fontSize: isMobile ? "1.5rem" : undefined,
                    }}
                >
                    Latest posts
                </Typography>
                <PostFeed selectedTopics={selectedTopics} />
                </Box>
            </CustomContainer>
        </>
    );
};

export default Home;
