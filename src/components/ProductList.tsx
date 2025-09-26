import { useProducts } from "../hooks/useProducts";

export default function ProductList() {
    const { data, loading, error } = useProducts();
    if (loading) return "Loading...";
    if (error) return error;
    return (
        <ul>
            {data.map(el => (
                <li>
                    {el.name} - {el.description}
                </li>
            ))}
        </ul>
    );
}
