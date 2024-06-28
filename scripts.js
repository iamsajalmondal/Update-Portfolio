document.addEventListener("DOMContentLoaded", () => {
    // Selecting DOM elements
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navlinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('.header');
    const projectSection = document.querySelector('#projects');
    const projectBoxes = document.querySelectorAll('.services-box'); // Corrected class name
    const projectsHeading = document.querySelector('.projects .heading');
    const homeSection = document.getElementById('home');
    const homeContent = document.querySelector('.home-content');
    const homeSci = document.querySelector('.home-sci');
    const homeLogo = document.querySelector('.home-logo');
    const aboutSection = document.getElementById('about');
    const aboutContent = document.querySelectorAll('.about-content');
    const readMoreBtn = document.querySelector('.read-more-btn'); // Read More button in About Me section
    const moreText = document.querySelector('.more-text'); // More text span in About Me section
    const projectReadMoreBtn = document.querySelector('.project-read-more-btn'); // Adjust selector as per your HTML structure
    const projectMoreText = document.querySelector('.project-more-text'); // Adjust selector as per your HTML structure    
    const downloadResumeBtn = document.querySelector('.download-resume-btn'); // Resume download button
    const resumeFilePath = 'Sajal Mondal Resume-Copy.pdf'; // Replace with your actual resume file path
    // Select the "Read More" button and the corresponding content in the projects section


    // Function to handle click event on menu icon
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('activate');
    };

    // Function to highlight navigation links based on scroll position
    const highlightNavLinks = () => {
        sections.forEach(section => {
            const top = window.scrollY;
            const offset = section.offsetTop - 100;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (top >= offset && top < offset + height) {
                navlinks.forEach(link => link.classList.remove('activate'));
                document.querySelector(`header nav a[href="#${id}"]`).classList.add('activate');
            }
        });
    };

    // Function to toggle sticky class on header when scrolling
    const toggleStickyHeader = () => {
        header.classList.toggle('sticky', window.scrollY > 100);
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('activate');
    };

    // Function to animate project boxes when they come into view
    const animateProjectBoxes = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let delay = 0;
                    projectBoxes.forEach((box, index) => {
                        setTimeout(() => {
                            box.classList.add('show');
                        }, delay);
                        delay += 200; // Adjust delay between animations
                    });

                    projectsHeading.classList.add('show');
                    observer.unobserve(projectSection);
                } else {
                    projectBoxes.forEach(box => box.classList.remove('show'));
                    projectsHeading.classList.remove('show');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(projectSection);
    };

    // Function to animate home section when it comes into view
    const animateHomeSection = () => {
        const observerOptions = {
            threshold: 0.5
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    homeContent.classList.add('visible');
                    homeSci.classList.add('visible');
                    homeLogo.classList.add('visible');
                } else {
                    homeContent.classList.remove('visible');
                    homeSci.classList.remove('visible');
                    homeLogo.classList.remove('visible');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(homeSection);
    };

    // Function to animate about section when it comes into view
    const animateAboutSection = () => {
        const observerOptions = {
            threshold: 0.5
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let delay = 0;
                    aboutContent.forEach((content, index) => {
                        setTimeout(() => {
                            content.classList.add('visible');
                        }, delay);
                        delay += 200; // Adjust delay between animations
                    });
                } else {
                    aboutContent.forEach(content => content.classList.remove('visible'));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(aboutSection);
    };

    // Function to handle resume download button click
    const downloadResume = () => {
        // Display progress percentage
        const progressPercentage = downloadResumeBtn.querySelector('.progress-percentage');
        progressPercentage.style.display = 'inline-block';

        // Simulate download progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressPercentage.textContent = `${progress}%`;

            // Finish download simulation
            if (progress >= 100) {
                clearInterval(interval);

                // Create link and trigger download
                const link = document.createElement('a');
                link.href = resumeFilePath;
                link.target = '_blank'; // Open in a new tab, adjust as needed
                link.download = 'Sajal_Mondal_Resume.pdf'; // Specify file name for download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Reset button state after download
                progressPercentage.style.display = 'none';
                downloadResumeBtn.textContent = "Download CV"; // Corrected text
                downloadResumeBtn.classList.remove('downloading');
            }
        }, 30); // Simulate a 3-second delay (100 steps * 30ms = 3000ms)

        // Add downloading class for styling
        downloadResumeBtn.classList.add('downloading');
    };

    // Event listener for resume download button
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', downloadResume);
        // Adding touch event listener for mobile devices
        downloadResumeBtn.addEventListener('touchstart', downloadResume);
    }

    // Event listener for Read More button click in About Me section
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            moreText.style.display = moreText.style.display === 'none' ? 'inline' : 'none';
            readMoreBtn.textContent = moreText.style.display === 'none' ? 'Read More' : 'Read Less';
        });
    }

    
    // Event listener for Read More button click in Projects section
    if (projectReadMoreBtn) {
        projectReadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            projectMoreText.classList.toggle('visible'); // Toggle the visibility class
            projectReadMoreBtn.textContent = projectMoreText.classList.contains('visible') ? 'Read Less' : 'Read More';
        });
    }

    // Event listener for scroll events
    window.addEventListener('scroll', () => {
        toggleStickyHeader();
        highlightNavLinks();
    });

    // Run animations when page loads
    animateProjectBoxes();
    animateHomeSection();
    animateAboutSection();
});
