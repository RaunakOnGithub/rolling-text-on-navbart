// Wait for the page to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Get ALL links (using the correct class name)
    const links = document.querySelectorAll(".rolling-text");

    // 2. Loop over each link
    links.forEach((element) => {
        
        // 3. Get the original text and clear the element
        let innerText = element.innerText;
        element.innerHTML = " ";

        // 4. Create the "top" block of letters
        let textContainer = document.createElement("div");
        textContainer.classList.add("block");

        for (let letter of innerText) {
            let span = document.createElement("span");
            span.innerText = letter.trim() === "" ? "\xa0" : letter; // Handle spaces
            span.classList.add("letter");
            textContainer.appendChild(span);
        }

        // 5. Add the top block
        element.appendChild(textContainer);
        
        // 6. Add the "bottom" block (a clone of the top)
        element.appendChild(textContainer.cloneNode(true));

        // --- GSAP ANIMATION ---
        
        // 7. Get all letters (top and bottom) for this specific link
        let letters = element.querySelectorAll(".letter");

        // 8. Create a paused GSAP timeline
        const tl = gsap.timeline({ paused: true });

        // 9. Add the animation to the timeline
        tl.to(letters, {
            yPercent: -100,             // Move letters up by 100% of their height
            duration: 0.5,
            stagger: 0.03,              // The magic! Stagger the start of each letter's animation
            ease: "power2.inOut"        // A smooth ease
        });

        // 10. Play the animation on mouse enter
        element.addEventListener("mouseenter", () => {
            tl.play();
        });

        // 11. Reverse the animation on mouse leave
        element.addEventListener("mouseleave", () => {
            tl.reverse();
        });
    });
});