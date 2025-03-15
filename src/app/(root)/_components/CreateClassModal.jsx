"use client";
import { ToastContainer, toast } from 'react-toastify';
import { useSession  } from "next-auth/react";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const CreateClassModal = ({ isOpen, onClose }) => {
  const { data: session, status } = useSession();
  if (!isOpen) return null;
  const handleCreateClass = async(e) => {
    e.preventDefault();
    const semesterName = e.target.semesterName.value;
    const sectionName = e.target.sectionName.value;
    const classCode = e.target.classCode.value;
    console.log(semesterName,sectionName, classCode);
    const email = session.user.email;
    const newClass = { email ,semesterName, sectionName, classCode };
    const data =await axios.post("https://os-project-backend.vercel.app/classroom", newClass);
    console.log(data.data);
    
    if (data.data.status === 200) {
      return toast.success("Classroom created successfully");
    }else{
      return toast.error("Failed to create classroom");
    }

  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <ToastContainer />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Create Class Room</h2>
          <form onSubmit={handleCreateClass} className="space-y-4">
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Semester Name
              </label>
              <input
                type="text"
                id=""
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-0 transition-all"
                placeholder="Spring 2025"
                name="semesterName"
                required
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Section Name
              </label>
              <input
                type="text"
                id=""
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-0 transition-all"
                placeholder="63_E"
                name="sectionName"
                required
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Class Code
              </label>
              <input
                type="text"
                id=""
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-0 transition-all"
                placeholder="Enter new class code"
                required
                name="classCode"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateClassModal;