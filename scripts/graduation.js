const mstTime = document.getElementById("mst-time");
const todayDate = document.getElementById("today-date");
const year = document.getElementById("current-year");

function updateMSTDateTime() {
    const now = new Date();

    const timeOptions = {
        timeZone: "America/Denver",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    };

    const dateOptions = {
        timeZone: "America/Denver",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    if (mstTime) {
        const formattedTime = now.toLocaleTimeString("en-US", timeOptions);
        mstTime.textContent = `${formattedTime} MST`;
    }

    if (todayDate) {
        const formattedDate = now.toLocaleDateString("en-US", dateOptions);
        todayDate.textContent = formattedDate;
    }
    if (year) {
        const today = new Date();
        year.textContent = today.getFullYear();
    }
}

// Sync to exact next second
function startPreciseClock() {
    updateMSTDateTime();

    const now = new Date();
    const delay = 1000 - now.getMilliseconds();

    setTimeout(() => {
        updateMSTDateTime();
        setInterval(updateMSTDateTime, 1000);
    }, delay);
}

startPreciseClock();


const countdownEl = document.getElementById("meeting-countdown");

function getNextMeetingTime() {
    const now = new Date();

    // Convert current time to MST parts
    const mstNow = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Denver" })
    );

    const day = mstNow.getDay(); // 0=Sun, 4=Thu
    const hour = mstNow.getHours();
    const minute = mstNow.getMinutes();
    const second = mstNow.getSeconds();

    // Create next meeting date (Thursday 9:00 AM)
    const nextMeeting = new Date(mstNow);
    nextMeeting.setHours(9, 0, 0, 0);

    const daysUntilThursday = (4 - day + 7) % 7;
    nextMeeting.setDate(mstNow.getDate() + daysUntilThursday);

    // If today is Thursday and past 9AM → move to next week
    if (daysUntilThursday === 0 && (hour > 9 || (hour === 9 && minute >= 0))) {
        nextMeeting.setDate(nextMeeting.getDate() + 7);
    }

    return nextMeeting;
}

function updateCountdown() {
    const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Denver" })
    );

    const nextMeeting = getNextMeetingTime();
    const diff = nextMeeting - now;

    if (diff <= 0) {
        countdownEl.textContent = "Meeting is starting now!";
        countdownEl.classList.remove("warning");
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    let message = "Weekly meeting in ";

    if (days > 0) {
        message += `${days} days, ${hours} hours`;
    } else if (hours > 0) {
        message += `${hours} hours, ${minutes} minutes`;
    } else if (minutes > 0) {
        message += `${String(minutes).padStart(2, "0")} min, ${String(seconds).padStart(2, "0")} sec`;
    } else {
        message += `${String(seconds).padStart(2, "0")} sec`;
    }

    countdownEl.textContent = message;

    // 🔥 Add warning under 5 minutes (300 seconds)
    if (totalSeconds <= 300) {
        countdownEl.classList.add("warning");
    } else {
        countdownEl.classList.remove("warning");
    }
}

// Precision sync (like real clock)
function startCountdown() {
    updateCountdown();

    const delay = 1000 - new Date().getMilliseconds();

    setTimeout(() => {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }, delay);
}

startCountdown();