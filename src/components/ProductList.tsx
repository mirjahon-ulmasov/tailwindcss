// src/components/ProductList.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { ProductCard } from './ProductCard';
import { FormInput } from './FormInput';
import type { Product, SortOption } from '../types/product';

interface ProductListProps {
    products: Product[];
    isLoading: boolean;
    error: string | null;
}

export const ProductList: React.FC<ProductListProps> = ({ products, isLoading, error }) => {
    // --- TASK 3: Filtering/Search Implementation ---
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('none'); // --- TASK 5: Sorting

    // Handle search input change (using useCallback for performance practice)
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    // Handle sort change
    const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value as SortOption);
    }, []);

    // --- TASK 3 & 5: Filtering and Sorting Logic ---
    // Use useMemo to ensure filtering/sorting only runs when inputs (products, searchTerm, sortOption) change.
    const filteredAndSortedProducts = useMemo(() => {
        let result = products;

        // 1. Filtering by search term
        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 2. Sorting
        if (sortOption === 'price-asc') {
            // Must create a copy before sorting to avoid modifying the original state array!
            result = [...result].sort((a, b) => a.price - b.price);
        }

        return result;
    }, [products, searchTerm, sortOption]);


    // --- TASK 2: Loading/Error States ---
    if (isLoading) {
        return <p>Loading products... please wait.</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }
    
    // Display if filtering results in no products
    if (filteredAndSortedProducts.length === 0) {
        return <p>No products found matching "{searchTerm}".</p>;
    }

    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                {/* Search Input (Task 3) */}
                <FormInput
                    label="Search Products"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="e.g., keyboard or mouse"
                />

                {/* Sort Dropdown (Task 5) */}
                <div style={{ margin: '15px 0 0 0' }}>
                    <label htmlFor="sort" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Sort By</label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={handleSortChange}
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    >
                        <option value="none">None</option>
                        <option value="price-asc">Price (Low to High)</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {filteredAndSortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};