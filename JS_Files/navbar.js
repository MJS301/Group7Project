const header = document.querySelector('header');
const toggle = document.querySelector('.nav_collapse');
const nav = document.querySelector('.navflex');
const list = nav.querySelector('ul');

function closeMenu() {
    nav.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
}

// shows the full navbar if every link fits on one line, otherwise the hamburger
function checkFit() {
    header.classList.remove('nav_collapsed');               // briefly lay out as one row
    const fits = list.scrollWidth <= list.clientWidth;      // do the links overflow?
    header.classList.toggle('nav_collapsed', !fits);
    if (fits) closeMenu();                                  // reset menu when switching back
}

toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('show');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

window.addEventListener('resize', checkFit);
checkFit();