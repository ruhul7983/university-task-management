"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import { useSession } from "next-auth/react"
import axios from "axios"

export default function AddEvent() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { data: session } = useSession();




    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const form = e.target;
        const eventName = form.eventName.value;
        const date = form.date.value;
        const courseName = form.courseName.value;
        const topic = form.topic.value;
        const event = {
            eventName,
            date,
            courseName,
            topic,
            email: session?.user?.email,
        };
        
        const addEvent = await axios.post("https://os-project-backend.vercel.app/add-event", 
            event,
        )
        console.log(addEvent);
        
        // Here you would typically send the data to your backend
        if (addEvent.data.status === true) {
            setIsSubmitting(false)
            toast.success("Event added successfully!")
            return
        }
        // Simulating an API call
        setIsSubmitting(false)
        toast.error("Failed to add event")
        //   router.push("/cr") // Redirect to events list
    }

    return (
        <div className="max-w-2xl mx-auto py-8">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-6">Add New Event</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="eventName" className="block text-sm font-medium mb-1">
                        Event Name
                    </label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        placeholder="Quiz 1, Mid Term, etc."
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* <div>
            <label htmlFor="time" className="block text-sm font-medium mb-1">
              Time
            </label>
            <div className="relative">
              <input
                type="time"
                id="time"
                name="time"
                value={eventData.time}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div> */}
                </div>

                <div>
                    <label htmlFor="courseName" className="block text-sm font-medium mb-1">
                        Course Name
                    </label>
                    <input
                        type="text"
                        id="courseName"
                        name="courseName"
                        placeholder="Operating System"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium mb-1">
                        Topic
                    </label>
                    <input
                        type="text"
                        id="topic"
                        name="topic"
                        placeholder="Chapter 1, 2, etc."
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div> */}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Adding Event..." : "Add Event"}
                </button>
            </form>
        </div>
    )
}

