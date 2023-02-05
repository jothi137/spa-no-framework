window.addEventListener('DOMContentLoaded', (event) => {
    loadMainNav();
});


window.addEventListener('load', (e) => {
    document.addEventListener('click', (e) => {
        const { target } = e;
        if (!target.matches("nav#mainNav a")) {
            return;
        }
        const pathName = window.location.pathname;
        console.log(pathName);
        window.history.pushState({}, '', pathName);
        handleRouting(e);
    })
});

const loadMainNav = async () => {
    const mainTemplate = await fetch('../templates/MainNav.html');
    const nav = await mainTemplate.text();
    const mainDiv = document.getElementById("main");
    mainDiv.innerHTML = nav;
}

const routeTemplates = {
    "/404": {
        template: '/templates/404.html',
    },
    "/about": {
        template: '/templates/about.html',
    },
    "/contact": {
        template: '/templates/contact.html',
    },
    "/": {
        template: '/templates/home.html',
    }
}
const handleRouting = (e) => {
    const event = e || window.event; // get window.event if event argument not provided
	event.preventDefault();
	// window.history.pushState(state, unused, target link);
	window.history.pushState({}, "", event.target.href);
    loadTemplates();
}

const loadTemplates = async () => {
    const route = window.location.pathname;
    const template = routeTemplates[route].template || routeTemplates['/404'].template;

    const loadTemp = await fetch(template);
    const text = await loadTemp.text();

    const mainDiv = document.getElementById("content");
    mainDiv.innerHTML = text;
}

loadTemplates();