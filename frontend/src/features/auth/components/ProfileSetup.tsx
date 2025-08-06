import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Paper,
    Chip,
    Avatar,
    IconButton,
    Autocomplete,
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import { updateProfile } from '../api/updateProfile';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';

interface ProfileSetupProps {
    user: {
        id: string;
        email: string;
        username: string;
        fullName: string;
    };
    onSetupComplete: () => void;
}

import { availableTopics } from "../../../utils/topics";

const ProfileSetup: React.FC<ProfileSetupProps> = ({ user, onSetupComplete }) => {
    const dispatch = useDispatch();
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTopicToggle = (topic: string) => {
        setSelectedTopics(prev => 
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (selectedTopics.length < 3) {
            setError('Please select at least 3 topics of interest');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await updateProfile(user.id, {
                bio: bio.trim() || '', // Make bio optional
                avatar: avatar || '', // Make avatar optional
                topicsOfInterest: selectedTopics,
            });

            // Update Redux store with the updated user data
            dispatch(setCredentials({ user: response.user }));

            // Complete setup immediately
            onSetupComplete();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 600,
                width: '100%',
                mx: 'auto',
                mt: 4,
            }}
        >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Complete Your Profile
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Welcome to First Thought! Let's personalize your experience.
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Avatar Section */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    Profile Picture (Optional)
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                        src={avatar}
                        sx={{
                            width: 120,
                            height: 120,
                            mb: 2,
                            border: '3px solid #e0e0e0',
                        }}
                    />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="avatar-upload"
                        type="file"
                        onChange={handleAvatarChange}
                    />
                    <label htmlFor="avatar-upload">
                        <IconButton
                            component="span"
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8,
                                backgroundColor: '#1A8917',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#156d12',
                                },
                            }}
                        >
                            <PhotoCameraIcon />
                        </IconButton>
                    </label>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Upload a profile picture (optional)
                </Typography>
            </Box>

            {/* Bio Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Bio (Optional)
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Tell us about yourself"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Share your interests, background, or what you like to write about... (optional)"
                    helperText={`${bio.length}/500 characters`}
                    inputProps={{ maxLength: 500 }}
                />
            </Box>

            {/* Topics of Interest Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Topics of Interest
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Select topics you're interested in (choose at least 3):
                </Typography>
                <Autocomplete
                    multiple
                    freeSolo
                    options={availableTopics}
                    value={selectedTopics}
                    onChange={(event: any, newValue: string[]) => {
                        setSelectedTopics(newValue);
                    }}
                    renderInput={(params: any) => (
                        <TextField
                            {...params}
                            placeholder="Type to search topics or add custom ones..."
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'background.paper',
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
                            }}
                        />
                    )}
                    renderTags={(value: string[], getTagProps: any) =>
                        value.map((option: string, index: number) => (
                            <Chip
                                {...getTagProps({ index })}
                                key={option}
                                label={option}
                                size="small"
                                color="primary"
                                variant="filled"
                                sx={{
                                    backgroundColor: '#1A8917',
                                    color: 'white',
                                    '& .MuiChip-deleteIcon': {
                                        color: 'white',
                                        '&:hover': {
                                            color: 'error.light',
                                        },
                                    },
                                }}
                            />
                        ))
                    }
                    renderOption={(props: any, option: string) => (
                        <Box component="li" {...props}>
                            <Typography variant="body2">
                                {option}
                            </Typography>
                        </Box>
                    )}
                    PaperComponent={({ children }) => (
                        <Box
                            sx={{
                                mt: 1,
                                boxShadow: 8,
                                borderRadius: 1,
                                backgroundColor: 'background.paper',
                                '& .MuiAutocomplete-listbox': {
                                    maxHeight: 200,
                                    backgroundColor: 'background.paper',
                                },
                            }}
                        >
                            {children}
                        </Box>
                    )}
                />
                <Typography 
                    variant="body2" 
                    color={selectedTopics.length >= 3 ? "text.secondary" : "error"} 
                    sx={{ mt: 1 }}
                >
                    Selected: {selectedTopics.length}/3 topics (minimum required)
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: "text.secondary",
                        fontStyle: "italic",
                        mt: 1,
                        display: "block"
                    }}
                >
                    Type to search existing topics or add custom ones. Press Enter to add custom topics.
                </Typography>
            </Box>

            <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || selectedTopics.length < 3}
                sx={{
                    backgroundColor: '#1A8917',
                    '&:hover': {
                        backgroundColor: '#156d12',
                    },
                }}
            >
                {loading ? <CircularProgress size={24} /> : 'Complete Setup'}
            </Button>
        </Paper>
    );
};

export default ProfileSetup; 