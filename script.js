
document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // GET HTML ELEMENTS
    // =========================================

    const loadingScreen = document.getElementById("loadingScreen");
    const mainContent = document.getElementById("mainContent");
    const loadingProgress = document.getElementById("loadingProgress");
    const loadingPercent = document.getElementById("loadingPercent");
    const loadingTrack = document.getElementById("loadingTrack");
    const loadingVideo = document.getElementById("loadingVideo");

    const giftBox = document.getElementById("giftBox");
    const lettersContainer = document.getElementById("lettersContainer");

    const letterOverlay = document.getElementById("letterOverlay");
    const letterTitle = document.getElementById("letterTitle");
    const letterText = document.getElementById("letterText");
    const closeLetter = document.getElementById("closeLetter");


    // =========================================
    // BLUE LOADING SCREEN — 8 SECONDS
    // =========================================

    function startLoading() {

        // Check that the loading elements exist.
        if (
            !loadingScreen ||
            !mainContent ||
            !loadingProgress ||
            !loadingPercent ||
            !loadingTrack
        ) {
            console.error("Loading screen elements are missing!");
            return;
        }

        const duration = 8000;
        const startTime = performance.now();

        // Start the bar at zero.
        loadingProgress.style.width = "0%";
        loadingPercent.textContent = "0%";
        loadingTrack.setAttribute("aria-valuenow", "0");

        // Try to play Furina's video.
        if (loadingVideo) {
            loadingVideo.play().catch(() => {
                console.log("Video could not autoplay. Loading will continue.");
            });
        }

        function updateProgress(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            const percentage = Math.floor(progress * 100);

            // Update the blue bar and percentage.
            loadingProgress.style.width = percentage + "%";
            loadingPercent.textContent = percentage + "%";

            loadingTrack.setAttribute(
                "aria-valuenow",
                percentage
            );

            // Keep updating until 100%.
            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            } else {

                loadingPercent.textContent = "100%";

                // Reveal the website after loading.
                setTimeout(() => {
                    loadingScreen.classList.add("finished");
                    mainContent.classList.add("revealed");
                }, 300);
            }
        }

        requestAnimationFrame(updateProgress);
    }

    startLoading();


    // =========================================
    // GIFT BOX
    // =========================================

    let giftOpened = false;

    function openGift() {

        if (giftOpened) return;

        giftOpened = true;

        giftBox.classList.add("opened");
        giftBox.setAttribute("aria-expanded", "true");

        // Show the four letters after the box opens.
        setTimeout(() => {

            lettersContainer.hidden = false;

            lettersContainer.classList.add("letters-revealed");

            const instructions = document.querySelectorAll(
                ".gift-instructions"
            );

            if (instructions[1]) {
                instructions[1].textContent =
                    "Choose a letter to read your message! ✧";
            }

        }, 650);
    }

    if (giftBox) {

        giftBox.addEventListener("click", openGift);

        giftBox.addEventListener("keydown", (event) => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                openGift();
            }
        });
    }


    // =========================================
    // YOUR FOUR LETTER MESSAGES
    // EDIT THE TEXT BETWEEN THE QUOTATION MARKS
    // =========================================

    const letterMessages = {

        a: "My dearest Miguel, you must get through to Jefferson. Sit down with him and compromise. Don't stop 'til you agree. Your favorite older sister, Alessandra reminds you there’s someone in your corner all the way across the sea.",

        b: "On my birthday I appreciate the memories we shared together, ever since we were friends during grade 3, it was such an honor to be with you. Stay safe and many blessings arrive to you. K. Abadines",
        
        c: "HAPPPY BIRTHDAY MIGUEL🎊🥳🎂!!!!! May you have a blessed day today and always remember that you are happy which means gay. May you have more birthdays to come and may you finally learn how to not be half-baked. T. Caleb",

        d: "Bankai tenkai hentai senpai, Happy Birthdayo masho! P. Danila"

    };


    // =========================================
    // OPEN A LETTER
    // =========================================

    document.querySelectorAll(".letter-scroll").forEach((scroll) => {

        scroll.addEventListener("click", () => {

            if (!giftOpened) return;

            const letter = scroll.dataset.letter;

            letterTitle.textContent = "Dear Miguel,";

            letterText.textContent =
                letterMessages[letter] || "A little message for you!";

            letterOverlay.classList.add("active");

            letterOverlay.setAttribute("aria-hidden", "false");
        });
    });


    // =========================================
    // CLOSE A LETTER
    // =========================================

    function closeLetterPopup() {

        letterOverlay.classList.remove("active");

        letterOverlay.setAttribute("aria-hidden", "true");
    }

    if (closeLetter) {
        closeLetter.addEventListener("click", closeLetterPopup);
    }

    if (letterOverlay) {

        letterOverlay.addEventListener("click", (event) => {

            if (event.target === letterOverlay) {
                closeLetterPopup();
            }
        });
    }

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeLetterPopup();
        }
    });

});
