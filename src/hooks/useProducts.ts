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

export function useProducts(): UseProductResult {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function getProducts() {
            try {
                setLoading(true)
                const response = await fetch("https://jsonplaceholder.typicode.com/todos")
                if(response.status != 200) {
                    throw new Error("Could not fetch data")
                }
                const data = await response.json()
                setData(data)
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