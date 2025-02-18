"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";

const JoinClass = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
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
          <h2 className="text-2xl font-semibold mb-4">Join Classroom</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="classCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Class Code
              </label>
              <input
                type="text"
                id="classCode"
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-0 transition-all"
                placeholder="Enter class code"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Join Class
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinClass;