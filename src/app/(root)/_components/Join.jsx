"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import JoinClass from "./JoinClass";
import CreateClassModal from "./CreateClassModal";
const  Join = () => {
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
    return (
        <main className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white ">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-2xl sm:text-5xl font-bold text-gray-900 mb-6">
                        University Task Management
                    </h1>
                    <p className="text-lg text-gray-600">
                        Join or create your classroom to get started
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                    <button
                        onClick={() => setIsJoinModalOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors "
                    >
                        <FaRegUser className="w-5 h-5" />
                        Join Classroom
                    </button>
                    <button
                        onClick={() => setIsCreateClassOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                        <FaPlus className="w-5 h-5" />
                        Create Classroom
                    </button>
                </div>
                <JoinClass isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
                <CreateClassModal isOpen={isCreateClassOpen} onClose={() => setIsCreateClassOpen(false)} />
            </div>

        </main>
    );
};

export default Join;