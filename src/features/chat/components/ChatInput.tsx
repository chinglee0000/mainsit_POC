/**
 * ChatInput Component
 * 
 * Modern AI chat input with voice, file upload, and multi-modal capabilities
 */

import React, { useState } from 'react';
import { Send, Sparkles, Mic, Paperclip, Image as ImageIcon, X } from 'lucide-react';
import type { Suggestion } from '../../../types/a2ui';

interface ChatInputProps {
    inputValue: string;
    isTyping: boolean;
    suggestions: Suggestion[];
    inputRef: React.RefObject<HTMLTextAreaElement | null>;
    onInputChange: (value: string) => void;
    onSubmit: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onSuggestionClick: (payload: string) => void;
    disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    inputValue,
    isTyping,
    suggestions,
    inputRef,
    onInputChange,
    onSubmit,
    onKeyDown,
    onSuggestionClick,
    disabled = false,
}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleVoiceInput = () => {
        if (disabled) return;
        setIsRecording(!isRecording);
        // TODO: Implement voice recording logic
        console.log('Voice input:', isRecording ? 'stopped' : 'started');
    };

    const handleFileAttach = () => {
        if (disabled) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setAttachedFiles(prev => [...prev, ...files]);
    };

    const removeFile = (index: number) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div style={{
            padding: '16px',
            flexShrink: 0,
            opacity: disabled ? 0.6 : 1,
            pointerEvents: disabled ? 'none' : 'auto',
            transition: 'opacity 0.2s'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Suggestions - No background, floating style */}
                {suggestions.length > 0 && !disabled && (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '12px'
                    }}>
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                className="btn-ghost"
                                style={{
                                    fontSize: '14px',
                                    padding: '10px 16px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: 'transparent',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'var(--color-text-secondary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.background = 'transparent';
                                }}
                                onClick={() => onSuggestionClick(s.payload)}
                            >
                                <Sparkles size={12} style={{ color: 'var(--color-primary)', opacity: 0.8 }} />
                                {s.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Attached Files Preview */}
                {attachedFiles.length > 0 && (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '12px'
                    }}>
                        {attachedFiles.map((file, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '6px 12px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    color: 'var(--color-text-secondary)'
                                }}
                            >
                                <ImageIcon size={14} />
                                <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {file.name}
                                </span>
                                <button
                                    onClick={() => removeFile(i)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-text-dim)',
                                        cursor: 'pointer',
                                        padding: '2px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Input Area */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    {/* File Attachment Button */}
                    <button
                        onClick={handleFileAttach}
                        disabled={disabled}
                        className="btn-ghost"
                        style={{
                            width: '36px',
                            height: '36px',
                            padding: '0',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-secondary)',
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            flexShrink: 0
                        }}
                        title="Attach files"
                    >
                        <Paperclip size={18} />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => {
                            if (disabled) return;
                            onInputChange(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                        }}
                        onKeyDown={onKeyDown}
                        placeholder={disabled ? "Please complete verification above..." : "Message twin3..."}
                        rows={1}
                        readOnly={disabled}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-text-primary)',
                            fontSize: '15px',
                            resize: 'none',
                            outline: 'none',
                            maxHeight: '120px',
                            lineHeight: '1.5',
                            padding: '8px 0',
                            cursor: disabled ? 'not-allowed' : 'text'
                        }}
                    />

                    {/* Voice Input Button */}
                    <button
                        onClick={handleVoiceInput}
                        disabled={disabled}
                        className="btn-ghost"
                        style={{
                            width: '36px',
                            height: '36px',
                            padding: '0',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isRecording ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            flexShrink: 0,
                            animation: isRecording ? 'pulse 1.5s ease-in-out infinite' : 'none'
                        }}
                        title="Voice input"
                    >
                        <Mic size={18} />
                    </button>

                    {/* Send Button */}
                    <button
                        onClick={onSubmit}
                        disabled={isTyping || !inputValue.trim() || disabled}
                        className="btn btn-primary"
                        style={{
                            width: '36px',
                            height: '36px',
                            padding: '0',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: isTyping || !inputValue.trim() || disabled ? 0.5 : 1,
                            transition: 'all 0.2s',
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            flexShrink: 0
                        }}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
