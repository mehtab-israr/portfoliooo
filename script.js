// script.js

document.addEventListener("DOMContentLoaded", function() {

    // --- Intersection Observer for General Animations ---
    const wowElements = document.querySelectorAll('.wow');

    if (wowElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.dataset.animation || 'animate__fadeInUp'; // Default animation
                    const delay = entry.target.dataset.wowDelay || '0s';

                    entry.target.style.visibility = 'visible'; // Make visible before animation
                    entry.target.style.animationDelay = delay;
                    entry.target.classList.add(animation);

                    // Optional: Remove observer after animation triggers once
                    observer.unobserve(entry.target);
                } else {
                     // Optional: Hide element again if it goes out of view
                     // entry.target.style.visibility = 'hidden';
                     // entry.target.classList.remove(entry.target.dataset.animation || 'animate__fadeInUp');
                }
            });
        }, {
            root: null, // relative to document viewport
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        wowElements.forEach(el => {
            el.style.visibility = 'hidden'; // Hide elements initially
            observer.observe(el);
        });
    }


    // --- Intersection Observer for Skill Bar Animations ---
    const skillCircles = document.querySelectorAll('.progress-circle');

    if (skillCircles.length > 0) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const progressElement = circle.querySelector('.progress-circle-progress');
                    const percentage = circle.dataset.percentage || 0;
                    const offset = 100 - percentage; // Calculate offset

                    if (progressElement) {
                       // Set the offset to trigger the CSS transition
                       progressElement.style.strokeDashoffset = offset;
                    }

                    // Optional: Trigger animation for the text value as well (example)
                    const textElement = circle.querySelector('.percentage-value');
                    if (textElement) {
                        let current = 0;
                        const target = parseInt(percentage);
                        const increment = target / 50; // Adjust speed (smaller = faster intervals)
                        const interval = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                textElement.textContent = target;
                                clearInterval(interval);
                            } else {
                                textElement.textContent = Math.ceil(current);
                            }
                        }, 20); // Adjust interval timing (ms)
                    }


                    observer.unobserve(circle); // Animate only once
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the circle is visible
        });

        skillCircles.forEach(circle => {
            skillObserver.observe(circle);
        });
    }

}); // End DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Footer v2 Animations ---

    const footerV2 = document.getElementById('footer-v2');
    const wordSpans = footerV2?.querySelectorAll('.footer-title .word-span');
    const socialIcons = footerV2?.querySelectorAll('.social-icon-item');
    const languageLogos = footerV2?.querySelectorAll('.language-logo-item');
    const copyrightText = footerV2?.querySelector('.copyright-text-v2');
    const currentYearSpan = document.getElementById('current-year');

    // Set current year in copyright
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Only proceed if the footer and elements exist
    if (!footerV2 || !wordSpans || !socialIcons || !languageLogos || !copyrightText) {
        console.log("Footer v2 elements not found, skipping animations.");
        return;
    }

    const footerObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the footer is visible
    };

    const footerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate words sequentially
                wordSpans.forEach((span, index) => {
                    setTimeout(() => {
                        span.classList.add('word-visible');
                    }, index * 150); // 150ms delay between words
                });

                // Animate social icons sequentially (bounce)
                socialIcons.forEach((icon, index) => {
                     setTimeout(() => {
                        icon.classList.add('social-icon-visible');
                    }, 300 + (index * 100)); // Start after words, 100ms delay between icons
                });

                // Animate language logos sequentially (slide/bounce)
                languageLogos.forEach((logo, index) => {
                     setTimeout(() => {
                        logo.classList.add('logo-visible');
                    }, 600 + (index * 80)); // Start after icons, 80ms delay between logos
                });

                // Animate copyright text (simple fade, slightly delayed)
                 setTimeout(() => {
                        copyrightText.classList.add('visible');
                    }, 1000); // Delay determined by CSS transition-delay

                // Stop observing the footer once animations are triggered
                observer.unobserve(footerV2);
            }
        });
    };

    const footerObserver = new IntersectionObserver(footerCallback, footerObserverOptions);
    footerObserver.observe(footerV2);

});