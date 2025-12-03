document.addEventListener('DOMContentLoaded', () => {
    // --- Create animated particles ---
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (20 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }

    // --- DOM Elements ---
    const triggers = document.querySelectorAll('.js-trigger-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeBtn = document.getElementById('closeSidebar');

    // --- Sidebar Content Elements to Populate ---
    const sbType = document.getElementById('sbType');
    const sbTitle = document.getElementById('sbTitle');
    const sbSummary = document.getElementById('sbSummary');
    const sbPointsList = document.getElementById('sbPoints');
    const sbSignificance = document.getElementById('sbSignificance');


    // --- Functions ---

    // Function to open the sidebar and populate data
    function openSidebar(triggerElement) {
        // 1. Get data from the clicked element's data-attributes
        const data = triggerElement.dataset;

        // 2. Populate static text fields
        sbTitle.textContent = data.title;
        sbType.textContent = data.type;
        sbSummary.textContent = data.summary;
        sbSignificance.textContent = data.significance;

        // 3. Process the Key Points (split by semicolon and create list items)
        // We split the string stored in data-key-points by the ';' character
        const pointsArray = data.keyPoints.split(';');
        let pointsHtml = '';
        pointsArray.forEach(point => {
            // Only add if the point isn't empty (avoids empty bullets)
            if(point.trim() !== '') {
                pointsHtml += `<li>${point.trim()}</li>`;
            }
        });
        sbPointsList.innerHTML = pointsHtml;

        // 4. Show sidebar and overlay
        sidebar.classList.add('active');
        overlay.classList.add('active');
        // Prevent body scrolling when sidebar is open
        document.body.style.overflow = 'hidden';
    }

    // Function to close sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
    }


    // --- Event Listeners ---

    // Add click event to all timeline boxes
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            openSidebar(this);
        });
    });

    // Close events
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar); // Close when clicking outside

    // Close on Escape key press for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

});