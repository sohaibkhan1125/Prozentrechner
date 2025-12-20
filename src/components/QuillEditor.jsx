import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import './QuillEditor.css';

// Font Awesome for Icons (assuming it's already available in project or we use CDN link in index.html, 
// but since provided code had it, we'll assume icons classes work. If not, might need to import font-awesome)

const QuillEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);
    const quillInstance = useRef(null);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [codeOutput, setCodeOutput] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (quillInstance.current) return;

        // Custom Toolbar Configuration
        const toolbarOptions = [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean']
        ];

        quillInstance.current = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
                toolbar: {
                    container: toolbarOptions,
                    handlers: {
                        image: imageHandler
                    }
                },
                history: {
                    delay: 1000,
                    maxStack: 50,
                    userOnly: true
                }
            },
            placeholder: 'Start writing your document here...'
        });

        // Set initial value
        if (value) {
            quillInstance.current.root.innerHTML = value;
            updateStats();
        }

        // Event listeners
        quillInstance.current.on('text-change', () => {
            const content = quillInstance.current.root.innerHTML;
            if (onChange) {
                onChange(content);
            }
            updateStats();
        });

        // Check theme preference
        const savedTheme = localStorage.getItem('editor_theme_preference');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
        }

    }, []); // Empty dependency array for init

    // Update value if changed externally (be careful of loops)
    useEffect(() => {
        if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
            // Only update if significantly different to avoid cursor jumps on simple typing
            // For a simple implementation, we might skip this or do a diff check
            // But typically controlled components need this.
            // However, replacing innerHTML resets cursor. A common issue with Quill wrappers.
            // Let's assume parent controls 'value' initially or on load, and then we rely on internal state mostly.
            // If value is completely new (e.g. loaded from DB), update it.
            const currentContent = quillInstance.current.root.innerHTML;
            if (value !== currentContent && !quillInstance.current.hasFocus()) {
                quillInstance.current.root.innerHTML = value || '';
                updateStats();
            }
        }
    }, [value]);


    const updateStats = () => {
        if (!quillInstance.current) return;
        const text = quillInstance.current.getText();
        const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
        const chars = text.length > 1 ? text.length - 1 : 0;
        setWordCount(words);
        setCharCount(chars);
    };

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const range = quillInstance.current.getSelection();
                    quillInstance.current.insertEmbed(range.index, 'image', reader.result);
                    quillInstance.current.setSelection(range.index + 1);
                };
            } else {
                alert('Please select a valid image file');
            }
        };
    };

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('editor_theme_preference', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('editor_theme_preference', 'light');
        }
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        // Body scroll handling handled by checking isFullscreen in rendering or manual document.body style
        if (!isFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const clearContent = () => {
        if (window.confirm('Are you sure you want to clear the editor? This cannot be undone.')) {
            quillInstance.current.setContents([]);
            onChange('');
        }
    };

    const convertToCode = () => {
        const html = quillInstance.current.root.innerHTML;
        setCodeOutput(formatHTML(html));
        setShowCodeModal(true);
    };

    const formatHTML = (html) => {
        let formatted = '';
        let indent = '';
        const tab = '    ';
        html.split(/>\s*</).forEach(function (element) {
            if (element.match(/^\/\w/)) {
                indent = indent.substring(tab.length);
            }
            formatted += indent + '<' + element + '>\r\n';
            if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input") && !element.startsWith("img") && !element.startsWith("br")) {
                indent += tab;
            }
        });
        return formatted.substring(1, formatted.length - 3);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(codeOutput).then(() => {
            alert('HTML code copied to clipboard');
        });
    };

    const downloadHtml = () => {
        const blob = new Blob([codeOutput], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`quill-editor-wrapper ${isFullscreen ? 'fullscreen' : ''}`}>
            {/* Header */}
            <div className="editor-header-controls" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                    <i className="fas fa-pen-nib"></i> Professional Editor
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="editor-btn editor-btn-primary" onClick={convertToCode} title="View Source">
                        <i className="fas fa-code"></i> Convert Text to Code
                    </button>
                    <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 5px' }}></div>
                    <button className="editor-btn editor-btn-icon" onClick={toggleTheme} title="Toggle Dark Mode">
                        <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>
                    <button className="editor-btn editor-btn-icon" onClick={toggleFullscreen} title="Fullscreen">
                        <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
                    </button>
                    <button className="editor-btn editor-btn-icon" onClick={clearContent} title="Clear All">
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div ref={editorRef} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}></div>

            {/* Stats Bar */}
            <div className="editor-stats-bar">
                <div className="editor-stats-group">
                    <span>{wordCount} words</span>
                    <span>{charCount} characters</span>
                </div>
            </div>

            {/* Code Modal */}
            {showCodeModal && (
                <div className="editor-modal active" onClick={(e) => { if (e.target.className.includes('editor-modal')) setShowCodeModal(false) }}>
                    <div className="editor-modal-content">
                        <div className="editor-modal-header">
                            <h3><i className="fas fa-file-code"></i> Generated HTML Code</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="editor-btn" onClick={copyCode}>
                                    <i className="fas fa-copy"></i> Copy HTML
                                </button>
                                <button className="editor-btn" onClick={downloadHtml}>
                                    <i className="fas fa-download"></i> Download .html
                                </button>
                                <button className="editor-btn editor-btn-icon" onClick={() => setShowCodeModal(false)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="editor-modal-body">
                            <pre className="editor-code-output">{codeOutput}</pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuillEditor;
