const CALENDAR_ID =
    '5e02ed53d168186921c77d383ed856b720fe696921ced1ff8df524d4841ddc29@group.calendar.google.com';

const API_KEY = 'AIzaSyDflhLsg1H039ahVAtdfX_zXRpzMGQm3CU';
const MAX_RESULTS = 26;

const API_URL =
    `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events` +
    `?key=${API_KEY}` +
    `&maxResults=${MAX_RESULTS}` +
    `&singleEvents=true` +
    `&orderBy=startTime` +
    `&timeMin=${new Date().toISOString()}`;


async function getPublicCalendarEvents() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        displayEvents(data.items);
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        document.getElementById('events-list').innerHTML = '<p>Unable to load events.</p>';
    }
}

function displayEvents(events) {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = ''; // clear old events

    if (!events || events.length === 0) {
        eventsList.innerHTML = '<p>No upcoming events found.</p>';
        return;
    }

    events.forEach(event => {
        const start = event.start.dateTime || event.start.date;
        const date = new Date(start);
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = date.toLocaleString(undefined, options);

        const li = document.createElement('li');
        li.innerHTML = `<strong>${event.summary}</strong> — ${formattedDate}`;
        eventsList.appendChild(li);
    });
}

// Call it on page load
getPublicCalendarEvents();
