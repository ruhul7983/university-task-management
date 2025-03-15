import React from "react";
import { Calendar, BookOpen, Hash } from "lucide-react";

const EventCard = ({ eventName, courseName, topic, date }) => {
  const daysLeft = Math.floor((new Date(date) - new Date()) / (1000 * 60 * 60 * 24)) +1;
  return (
    <div className=" rounded-lg shadow-sm  transition-shadow p-6  ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{eventName}</h3>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${daysLeft < 0
                ? "bg-gray-400 text-gray-800" 
                : daysLeft === 0
                  ? "bg-blue-300 text-blue-700" 
                  : daysLeft <= 3
                    ? "bg-red-300 text-red-700"
                    : daysLeft <= 7
                      ? "bg-yellow-300 text-yellow-700"
                      : "bg-green-300 text-green-700"
              }`}
          >
            {daysLeft < 0 ? "Overdue" : daysLeft === 0 ? "Today" : `${daysLeft} days left`}
          </div>

        </div>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>{courseName}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Hash className="w-4 h-4 mr-2" />
            <span>{topic}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
