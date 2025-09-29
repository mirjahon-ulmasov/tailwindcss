import axios from "axios"
import { useEffect, useState } from "react"

interface Product {
    id: number
    name: string
    description: string
}

interface UseProductResult {
    data: Product[]
    loading: boolean
    error: string | null
}

export function useProductsAxios(): UseProductResult {
    const [data, setData] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function getProducts() {
            try {
                setLoading(true)
                const response = await axios.get<Product[]>("https://jsonplaceholder.typicode.com/todos")
                if(response.status != 200) {
                    throw new Error("Could not fetch data")
                }
                setData(response.data)
            } catch(err: unknown) {
                const errorMsg = err instanceof Error ? err.message : String(err)
                setError(errorMsg)
            } finally {
                setLoading(false)
            }
        }

        getProducts()
    }, [])

    return { data, loading, error}
} 