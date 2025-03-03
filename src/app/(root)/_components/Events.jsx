const getColorForCourse = (courseName) => {
    const colors = [
        "bg-blue-100 ",
        "bg-green-100 ",
        "bg-yellow-100 ",
        "bg-purple-100 ",
        "bg-red-100 ",
        "bg-amber-100 ",
    ];

    // Create a hash code from course name
    let hash = 0;
    for (let i = 0; i < courseName.length; i++) {
        hash = courseName.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Pick a color from the array using the hash value
    const index = Math.abs(hash) % colors.length;
    return colors[index];
};

const Events = () => {
    const events = [
        {
            eventName: "Quiz 1",
            courseName: "Software Engineering",
            courseCode: "CSE222",
            date: "12-03-2025",
            daysLeft: 3,
        },
        {
            eventName: "Mid Term",
            courseName: "IOT",
            courseCode: "CSE222",
            date: "15-03-2025",
            daysLeft: 6,
        },
        {
            eventName: "Project Submission",
            courseName: "System Analysis",
            courseCode: "CSE222",
            date: "20-03-2025",
            daysLeft: 11,
        },
        {
            eventName: "Final Presentation",
            courseName: "Software Engineering",
            courseCode: "CSE222",
            date: "25-03-2025",
            daysLeft: 16,
        },
    ];
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
                <p className="mt-2 text-gray-600">Keep track of your academic schedule</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {events.map((event, index) => (
                    <div key={index} className={`p-4 rounded-lg hover:shadow-md ${getColorForCourse(event.courseName)}`}>
                        <EventCard {...event} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;