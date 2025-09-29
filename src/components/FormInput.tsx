// src/components/FormInput.tsx
// --- TASK 1: Refactor & Type Conversion ---
// This component needs correct TypeScript typing for its props (label, value, onChange).

import React from 'react';

interface FormInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    value,
    onChange,
    placeholder = '',
    type = 'text',
}) => {
    return (
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor={label} style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                {label}
            </label>
            <input
                id={label}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    padding: '8px',
                    width: '300px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
            />
        </div>
    );
};