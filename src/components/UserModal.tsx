import { type FC } from "react";
import type { UserDTO } from "../types/user";

interface UserModalProps {
    user: UserDTO;
    isOpen: boolean;
    close: () => void;
}

const DetailRow: FC<{ label: string, value: string | undefined }> = ({ label, value }) => (
    <div className="flex justify-between items-start py-2 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <span className="text-sm font-semibold text-gray-800 text-right max-w-xs">{value || 'N/A'}</span>
    </div>
);

export default function UserModal({ user, isOpen, close }: UserModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
            onClick={close}
        >
            <div 
                className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6"
                onClick={(e) => e.stopPropagation()} // Prevents click inside from closing the modal
            >
                <div className="flex justify-between items-center pb-4 border-b">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {user.name} Details
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        onClick={close}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                    </button>
                </div>

                <div className="pt-4 space-y-2">
                    <h4 className="text-lg font-semibold text-blue-700 mt-4 mb-2">Contact & Identity</h4>
                    <DetailRow label="Username" value={user.username} />
                    <DetailRow label="Email" value={user.email} />
                    <DetailRow label="Phone" value={user.phone} />
                    <DetailRow label="Website" value={user.website} />

                    <h4 className="text-lg font-semibold text-blue-700 mt-6 mb-2">Address</h4>
                    <DetailRow label="Street & Suite" value={`${user.address.street}, ${user.address.suite}`} />
                    <DetailRow label="City" value={user.address.city} />
                    <DetailRow label="Zipcode" value={user.address.zipcode} />
                    <DetailRow label="Geo" value={`Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}`} />

                    <h4 className="text-lg font-semibold text-blue-700 mt-6 mb-2">Company</h4>
                    <DetailRow label="Company Name" value={user.company.name} />
                    <DetailRow label="Catch Phrase" value={user.company.catchPhrase} />
                    <DetailRow label="Business Strategy" value={user.company.bs} />
                </div>

                <div className="flex justify-end pt-4 mt-6 border-t">
                    <button
                        onClick={close}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}