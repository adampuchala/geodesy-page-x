const baseUrl = window.location.href; // Replace with your base URL

window.addEventListener('load', () => {
    // compose_button();
    // document.querySelector('#compose_button').addEventListener('click', () => {
    //     callGenerateMusic();
    // });
    // hide_audio_player();
    // hide_download_button();

    setUpHideNav();
    setUpAppearingImagesAnimation();
    setUpSmoothScroll();
    setUpNavigationHighlighting();
});

function setUpHideNav(){
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const footerHeight = footer.offsetHeight;
    const windowHeight = window.innerHeight;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const footerTop = footer.getBoundingClientRect().top;

        if (footerTop <= windowHeight * 0.10) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    });
}

function setUpAppearingImagesAnimation(){
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after the first scroll into view
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    fadeInElements.forEach(el => {
        observer.observe(el);
    });
}

function setUpSmoothScroll(){
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - header.offsetHeight,
                behavior: 'smooth'
            });
        });
    });
}

function setUpNavigationHighlighting(){
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    const highlightSectionAtTop = () => {
        const headerHeight = header.offsetHeight + 10;

        let sectionAtTopId = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < headerHeight && rect.bottom > headerHeight) {
                sectionAtTopId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === sectionAtTopId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', highlightSectionAtTop);
    window.addEventListener('resize', highlightSectionAtTop);

    // Initial call to highlight the correct section on page load
    highlightSectionAtTop();
}

function callGenerateMusic() {
    const url = `${baseUrl}/api/generate-music`;
    compose_button_progress();
    hide_download_button();
    fetch(url)
        .then(response => response.json())
        .then(data => {
            compose_button();
            show_download_button(data.file_name);
            audio_player_play(data.file_name)
        })
        .catch(error => {
            compose_button();
            hide_download_button();
            console.error(error);
        });
}

function hide_download_button(){
    document.querySelector('#download_button').style.visibility = 'hidden';
}

function show_download_button(fileName){
    document.querySelector('#download_button').href = baseUrl + '/static/audio/' + fileName;
    document.querySelector('#download_button').style.visibility = 'visible';
}

function hide_audio_player(){
    document.querySelector('#audio_player').style.visibility = 'hidden';

}

function audio_player_play(fileName) {
    const player = document.querySelector('#audio_player');
    player.style.visibility = 'visible';
    player.src = baseUrl + '/static/audio/' + fileName;
    player.load();
    player.play();
    player.style.display = 'block';
}

function compose_button() {
    const button = document.querySelector('#compose_button');
    button.disabled = false;
    button.textContent = "LET'S COMPOSE!";
    button.style.backgroundColor = "white";
}

function compose_button_progress() {
    const button = document.querySelector('#compose_button');
    button.disabled = true;
    button.textContent = "GENERATING..";
    button.style.backgroundColor = "grey";
}