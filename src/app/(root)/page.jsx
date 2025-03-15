"use client";

import { useEffect, useState } from "react";
import EventCard from "./_components/EventsCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Join from "./_components/Join";
import axios from "axios";

// Function to generate a consistent color for each course
const getColorForCourse = (courseName) => {
  const colors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-red-100",
    "bg-amber-100",
  ];

  let hash = 0;
  for (let i = 0; i < courseName.length; i++) {
    hash = courseName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inClassroom, setInClassroom] = useState(null);
  const [sectionName, setSectionName] = useState(null);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
      return;
    }
  
    axios.get(`https://os-project-backend.vercel.app/in-classroom?email=${session?.user?.email}`)
      .then((response) => {
        console.log(response.data);
        setInClassroom(response.data.inClassroom);
        setSectionName(response.data.sectionName);
        setEvents(response.data.events);
      })
      .catch((error) => {
        console.error("Error fetching classrooms data:", error);
      });
  }, [session]);



  // const events = [
  //   { eventName: "Quiz 1", courseName: "Software Engineering", topic: "Slide 1 and 2", date: "12-03-2025", daysLeft: 3 },
  //   { eventName: "Mid Term", courseName: "IOT", topic: "Slide 1 and 2", date: "15-03-2025", daysLeft: 6 },
  //   { eventName: "Project Submission", courseName: "System Analysis", topic: "Slide 1 and 2", date: "20-03-2025", daysLeft: 11 },
  //   { eventName: "Final Presentation", courseName: "Software Engineering", topic: "Slide 1 and 2", date: "25-03-2025", daysLeft: 16 },
  // ];

  if (inClassroom === null) {
    return <p>Loading...</p>; // Show a loading state while fetching
  }

  return (
    <main className="w-full min-h-screen bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {!inClassroom ? (
          <Join />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Upcoming Events for Section {sectionName}</h1>
              <p className="mt-2 text-gray-600">Keep track of your academic schedule</p>
            </div>
            {
              events.length === 0 && (
                <div className="p-4 rounded-lg bg-red-100 text-red-700">
                  No upcoming events
                </div>
              )
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((event, index) => (
                <div key={index} className={`p-4 rounded-lg hover:shadow-md ${getColorForCourse(event.courseName)}`}>
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
