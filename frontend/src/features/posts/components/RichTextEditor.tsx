import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    FormatStrikethrough,
    FormatListBulleted,
    FormatListNumbered,
    FormatAlignLeft,
    FormatAlignCenter,
    FormatAlignRight,
    FormatAlignJustify,
    FormatQuote,
    Code,
    Link,
    Image,
    Undo,
    Redo,
    Title,
    TextFields,
} from '@mui/icons-material';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder = "Start writing your content..." }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [activeStates, setActiveStates] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        h1: false,
        h2: false,
        blockquote: false,
        pre: false,
    });
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = value;
            updateActiveStates();
        }
    }, [value]);

    const updateActiveStates = () => {
        if (!editorRef.current) return;
        
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        
        // Check if we're inside specific elements
        const isBold = document.queryCommandState('bold');
        const isItalic = document.queryCommandState('italic');
        const isUnderline = document.queryCommandState('underline');
        const isStrikethrough = document.queryCommandState('strikeThrough');
        
        // Check block elements
        const blockElement = container.nodeType === Node.TEXT_NODE 
            ? container.parentElement 
            : container as Element;
        
        const isH1 = blockElement?.tagName === 'H1';
        const isH2 = blockElement?.tagName === 'H2';
        const isBlockquote = blockElement?.tagName === 'BLOCKQUOTE';
        const isPre = blockElement?.tagName === 'PRE';

        setActiveStates({
            bold: isBold,
            italic: isItalic,
            underline: isUnderline,
            strikethrough: isStrikethrough,
            h1: isH1,
            h2: isH2,
            blockquote: isBlockquote,
            pre: isPre,
        });
    };

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            const newContent = editorRef.current.innerHTML;
            onChange(newContent);
            updateActiveStates();
        }
    };

    const handleInput = () => {
        if (editorRef.current) {
            const newContent = editorRef.current.innerHTML;
            onChange(newContent);
            updateActiveStates();
        }
    };

    const handleSelectionChange = () => {
        updateActiveStates();
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            execCommand('createLink', url);
        }
    };

    const handleImageDialogOpen = () => {
        setImageDialogOpen(true);
    };

    const handleImageDialogClose = () => {
        setImageDialogOpen(false);
        setImageUrl('');
        setImageFile(null);
    };

    const handleImageInsert = () => {
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target?.result as string;
                execCommand('insertImage', dataUrl);
                setImageFile(null);
                setImageUrl('');
                handleImageDialogClose();
            };
            reader.readAsDataURL(imageFile);
        } else if (imageUrl.trim()) {
            execCommand('insertImage', imageUrl.trim());
            setImageFile(null);
            setImageUrl('');
            handleImageDialogClose();
        }
    };

    const setFontSize = (size: string) => {
        execCommand('fontSize', size);
    };

    const toolbarItems = [
        {
            icon: <Undo />,
            tooltip: 'Undo',
            action: () => execCommand('undo'),
            active: false,
        },
        {
            icon: <Redo />,
            tooltip: 'Redo',
            action: () => execCommand('redo'),
            active: false,
        },
        { divider: true },
        {
            icon: <Title />,
            tooltip: 'Heading 1',
            action: () => execCommand('formatBlock', '<h1>'),
            active: activeStates.h1,
        },
        {
            icon: <TextFields />,
            tooltip: 'Heading 2',
            action: () => execCommand('formatBlock', '<h2>'),
            active: activeStates.h2,
        },
        { divider: true },
        {
            icon: <FormatBold />,
            tooltip: 'Bold',
            action: () => execCommand('bold'),
            active: activeStates.bold,
        },
        {
            icon: <FormatItalic />,
            tooltip: 'Italic',
            action: () => execCommand('italic'),
            active: activeStates.italic,
        },
        {
            icon: <FormatUnderlined />,
            tooltip: 'Underline',
            action: () => execCommand('underline'),
            active: activeStates.underline,
        },
        {
            icon: <FormatStrikethrough />,
            tooltip: 'Strikethrough',
            action: () => execCommand('strikeThrough'),
            active: activeStates.strikethrough,
        },
        { divider: true },
        {
            icon: <FormatAlignLeft />,
            tooltip: 'Align Left',
            action: () => execCommand('justifyLeft'),
            active: false,
        },
        {
            icon: <FormatAlignCenter />,
            tooltip: 'Align Center',
            action: () => execCommand('justifyCenter'),
            active: false,
        },
        {
            icon: <FormatAlignRight />,
            tooltip: 'Align Right',
            action: () => execCommand('justifyRight'),
            active: false,
        },
        {
            icon: <FormatAlignJustify />,
            tooltip: 'Justify',
            action: () => execCommand('justifyFull'),
            active: false,
        },
        { divider: true },
        {
            icon: <FormatListBulleted />,
            tooltip: 'Bullet List',
            action: () => execCommand('insertUnorderedList'),
            active: false,
        },
        {
            icon: <FormatListNumbered />,
            tooltip: 'Numbered List',
            action: () => execCommand('insertOrderedList'),
            active: false,
        },
        {
            icon: <FormatQuote />,
            tooltip: 'Quote',
            action: () => execCommand('formatBlock', '<blockquote>'),
            active: activeStates.blockquote,
        },
        {
            icon: <Code />,
            tooltip: 'Code',
            action: () => execCommand('formatBlock', '<pre>'),
            active: activeStates.pre,
        },
        { divider: true },
        {
            icon: <Link />,
            tooltip: 'Insert Link',
            action: insertLink,
            active: false,
        },
        {
            icon: <Image />,
            tooltip: 'Insert Image',
            action: handleImageDialogOpen,
            active: false,
        },
    ];

    return (
        <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
            {/* Toolbar */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 1,
                    backgroundColor: '#f5f5f5',
                    borderBottom: '1px solid #e0e0e0',
                    flexWrap: 'wrap',
                    gap: 0.5,
                }}
            >
                {toolbarItems.map((item, index) => {
                    if (item.divider) {
                        return <Divider key={`divider-${index}`} orientation="vertical" flexItem />;
                    }
                    return (
                        <Tooltip key={index} title={item.tooltip}>
                            <IconButton
                                size="small"
                                onClick={item.action}
                                sx={{
                                    backgroundColor: item.active ? 'rgba(25, 118, 210, 0.12)' : 'transparent',
                                    color: item.active ? '#1976d2' : 'inherit',
                                    '&:hover': {
                                        backgroundColor: item.active 
                                            ? 'rgba(25, 118, 210, 0.2)' 
                                            : 'rgba(25, 118, 210, 0.08)',
                                    },
                                }}
                            >
                                {item.icon}
                            </IconButton>
                        </Tooltip>
                    );
                })}
            </Box>

            {/* Font Size Dropdown */}
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 8px', backgroundColor: '#fafafa', borderBottom: '1px solid #e0e0e0' }}>
                <Box
                    component="select"
                    onChange={(e) => setFontSize(e.target.value)}
                    sx={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontSize: '0.875rem',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        '&:focus': {
                            outline: 'none',
                        },
                    }}
                >
                    <option value="1">Small</option>
                    <option value="3">Normal</option>
                    <option value="5">Large</option>
                    <option value="7">Extra Large</option>
                </Box>
            </Box>

            {/* Editor Content */}
            <Box
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onBlur={handleInput}
                onKeyUp={handleSelectionChange}
                onMouseUp={handleSelectionChange}
                onPaste={(e) => {
                    // Handle paste to clean up formatting if needed
                    e.preventDefault();
                    const text = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
                    document.execCommand('insertHTML', false, text);
                }}
                sx={{
                    minHeight: '300px',
                    padding: 2,
                    outline: 'none',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    fontFamily: "'Charter', 'Georgia', 'Times New Roman', serif",
                    '&:empty:before': {
                        content: `"${placeholder}"`,
                        color: '#999',
                        fontStyle: 'italic',
                    },
                    '& h1': {
                        fontSize: '2rem',
                        fontWeight: 600,
                        margin: '1rem 0 0.5rem 0',
                    },
                    '& h2': {
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        margin: '1rem 0 0.5rem 0',
                    },
                    '& p': {
                        margin: '0.5rem 0',
                    },
                    '& blockquote': {
                        borderLeft: '4px solid #1A8917',
                        margin: '1rem 0',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#f8f9fa',
                        fontStyle: 'italic',
                    },
                    '& pre': {
                        backgroundColor: '#f5f5f5',
                        padding: '1rem',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        overflow: 'auto',
                    },
                    '& ul, & ol': {
                        margin: '0.5rem 0',
                        paddingLeft: '2rem',
                    },
                    '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                        margin: '1rem 0',
                    },
                    '& a': {
                        color: '#1A8917',
                        textDecoration: 'underline',
                        '&:hover': {
                            color: '#0d5a0d',
                        },
                    },
                }}
            />

            {/* Image Insert Dialog */}
            <Dialog open={imageDialogOpen} onClose={handleImageDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>Insert Image</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Image URL"
                        type="url"
                        fullWidth
                        variant="outlined"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        sx={{ mb: 2 }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleImageInsert();
                            }
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button variant="outlined" component="label">
                            Choose Image from your device
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setImageFile(file);
                                    setImageUrl('');
                                }}
                            />
                        </Button>
                        {imageFile && <span>{imageFile.name}</span>}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleImageDialogClose}>Cancel</Button>
                    <Button onClick={handleImageInsert} variant="contained" disabled={!imageUrl.trim() && !imageFile}>
                        Insert
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RichTextEditor; 