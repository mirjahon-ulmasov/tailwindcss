import { useState } from "react";
import UserList from "./components/UserList";
import { useTheme } from "./hooks/useTheme";

export default function App() {
    const { toggle } = useTheme()
    const [userSearch, setUserSearch] = useState(""); // Renamed for consistency
    
    return (
        <main className="flex flex-col gap-6 items-center min-h-screen p-8 bg-gray-50 dark:bg-gray-700">
            <div className="w-full max-w-2xl flex gap-4 items-center">
                <input 
                    type="text" 
                    placeholder="Search users by name or email..."
                    value={userSearch} 
                    onChange={e => setUserSearch(e.target.value)} 
                    // Enhanced Tailwind Styling for a modern search input
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                />
                <button onClick={toggle} className="px-3 py-1 bg-green-500 rounded-md">toggle</button>
            </div>
            
            <div className="w-full max-w-4xl">
                <UserList search={userSearch} />
            </div>
        </main>
    );
}