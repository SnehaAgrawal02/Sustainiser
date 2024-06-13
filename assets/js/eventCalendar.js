document.addEventListener('DOMContentLoaded', function() {
    const events = [5, 12, 18, 25]; // Example event dates
    const calendar = document.getElementById('calendar');
    const monthNameElement = document.getElementById('month-name');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    function createCalendar(month, year) {
        const daysInMonth = getDaysInMonth(month, year);
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'col-1 day';
            if (events.includes(day)) {
                dayElement.classList.add('event-day');
            }
            dayElement.textContent = day;
            calendar.appendChild(dayElement);
        }
    }

    // Set month name
    monthNameElement.textContent = monthNames[currentMonth] + " " + currentYear;

    // Create the calendar
    createCalendar(currentMonth, currentYear);
});
