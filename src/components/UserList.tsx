import { Fragment, useEffect, useMemo, useState } from "react";
import type { UserDTO, UserList } from "../types/user";
import UserModal from "./UserModal";

export default function UserList({ search }: { search: string }) {

    const [users, setUsers] = useState<UserList>([]);
    const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openUserModal = (user: UserDTO) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeUserModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users/");
            if (response.status !== 200) {
                throw new Error("Users not found");
            }
            const data = await response.json();
            setUsers(data);
        } catch (e: unknown) {
            const error = e instanceof Error ? e.message : String(e);
            alert(error);
        }
    }

    const filteredUsers = useMemo(() => {
        const lowerCaseSearch = search.toLowerCase().trim();
        if (!lowerCaseSearch) {
            return users;
        }

        return users.filter(
            user =>
                user.name.toLowerCase().includes(lowerCaseSearch) || user.email.toLowerCase().includes(lowerCaseSearch)
        );
    }, [search, users]);

    return (
        <Fragment>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-gray-400">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                colSpan={2}
                            >
                                Company
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.length ? (
                            filteredUsers.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={
                                        index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"
                                    }
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user.name}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 truncate max-w-xs"
                                        title={user.email}
                                    >
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.company.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => openUserModal(user)}
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                        >
                                            More
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500 bg-gray-100">
                                    No users found matching "{search}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedUser && <UserModal user={selectedUser} isOpen={isModalOpen} close={closeUserModal} />}
        </Fragment>
    );
}
