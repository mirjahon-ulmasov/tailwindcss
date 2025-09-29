// src/components/ProductCard.tsx
import React from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
}

// --- TASK 4: Performance Optimization ---
// Goal: Prevent this component from re-rendering if its 'product' prop doesn't change.
// Use React.memo here!

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // console.log(`Rendering ProductCard: ${product.name}`); // Use this to check for unnecessary re-renders

    return (
        <div style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            margin: '10px', 
            borderRadius: '8px', 
            width: '250px',
            backgroundColor: '#f9f9f9'
        }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>{product.name}</h3>
            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
            <p style={{ fontSize: '0.9em', color: '#666' }}>{product.description}</p>
        </div>
    );
};