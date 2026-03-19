// navigation
const navButton = document.querySelector("#nav-button");
const navBar = document.querySelector("#nav-bar");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navBar.classList.toggle("show");
});

// dates
const year = document.querySelector("#current-year");
if (year) {
    const today = new Date();
    year.textContent = today.getFullYear();
}
const lastModified = document.querySelector("#last-modified");
if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

// fetch data
const url = "https://planetceles.github.io/wdd231/chamber/data/members.json";
const cards = document.querySelector("#member");

async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}
getMembersData();

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement("section");
        let fullName = document.createElement("h3");
        let phone = document.createElement("p");
        let address = document.createElement("p");
        let membership = document.createElement("p");
        let website = document.createElement("p");
        let portrait = document.createElement("img");
        card.classList.add("member-card");

        fullName.textContent = `${member.name} ${member.lastname}`;
        phone.textContent = `Phone Number: ${member.phone}`;
        address.textContent = `Addresss: ${member.address}`;
        membership.textContent = `Membership: ${member.membership}`;
        website.innerHTML = `Website: <a href="${member.website}" target="_blank">${member.website}</a>`;
        portrait.setAttribute("src", member.imageurl);
        portrait.setAttribute("alt", `${member.name}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "400");
        portrait.setAttribute("height", "auto");

        card.appendChild(portrait);
        card.appendChild(fullName);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membership);
        card.appendChild(website);
        

        cards.appendChild(card);

        if (member.membership === "Gold") {
        card.classList.add("gold");
}
    });
}

// toggle the views
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const memberContainer = document.querySelector("#member");

gridButton.addEventListener("click", () => {
    memberContainer.classList.add("grid");
    memberContainer.classList.remove("list");
});
listButton.addEventListener("click", () => {
    memberContainer.classList.add("list");
    memberContainer.classList.remove("grid");
});




const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]
const container = document.querySelector("#courses-container");
const totalCredits = document.querySelector(".t-course p");

function displayCourses(courseList) {
    container.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("p");
        card.textContent = `${course.subject}${course.number}`;

        if (course.completed) {
            card.classList.add("completed");
        }
        container.appendChild(card);
    });
    const credits = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = `The total credits for courses listed above is ${credits}`;
}

document.querySelector("#all").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

document.querySelector("#cse").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});

displayCourses(courses)