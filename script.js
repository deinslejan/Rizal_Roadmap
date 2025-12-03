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

    // --- Progress Bar Logic ---
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressContainer = document.getElementById('mainProgressContainer');
    
    const milestones = [
        'Start of Journey',
        'Childhood Influences',
        'Cultural Identity',
        'Intellectual Awakening',
        'Social Advocacy',
        'Literary Masterpiece',
        'Moral Resolution',
        'Organized Action',
        'Ultimate Sacrifice'
    ];

    window.addEventListener('scroll', () => {
        // Only calculate progress if timeline view is active/visible
        if (progressContainer.style.display === 'none') return;

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        
        // Prevent division by zero
        if (documentHeight - windowHeight <= 0) return;

        let scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        // Cap percent at 100
        if (scrollPercent > 100) scrollPercent = 100;
        
        progressBar.style.width = scrollPercent + '%';
        
        // Update progress text based on scroll position
        const milestoneIndex = Math.min(Math.floor((scrollPercent / 100) * milestones.length), milestones.length - 1);
        progressText.textContent = milestones[milestoneIndex];
    });

    // --- View Toggle Logic ---
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const timelineSection = document.querySelector('.timeline-section');
    const mapView = document.getElementById('mapView');
    const legendSection = document.querySelector('.legend-section');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active button
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Toggle views and progress bar
            if (view === 'timeline') {
                timelineSection.style.display = 'block';
                mapView.style.display = 'none';
                progressContainer.style.display = 'block'; // Show progress bar
                legendSection.style.display = 'block'; // Show legend
            } else {
                timelineSection.style.display = 'none';
                mapView.style.display = 'block';
                progressContainer.style.display = 'none'; // Hide progress bar
                legendSection.style.display = 'none'; // Hide legend
            }
        });
    });

    // --- Map Location Modal Logic ---
    const locationCards = document.querySelectorAll('.js-location-card');
    const locationModal = document.getElementById('locationModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetails = document.getElementById('modalDetails');

    function openLocationModal(cardElement) {
        const data = cardElement.dataset;
        
        modalTitle.textContent = data.title + ' (' + data.year + ')';
        modalDescription.textContent = data.description;
        
        // Format details as list
        if (data.details) {
            const detailsList = data.details.split(';').map(detail => 
                `<p>• ${detail.trim()}</p>`
            ).join('');
            modalDetails.innerHTML = detailsList;
        }
        
        locationModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLocationModal() {
        locationModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Click on card opens modal
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            openLocationModal(this);
        });
    });

    closeModal.addEventListener('click', closeLocationModal);
    modalOverlay.addEventListener('click', closeLocationModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && locationModal.classList.contains('active')) {
            closeLocationModal();
        }
    });

    // --- SIDEBAR LOGIC (Timeline) ---
    const triggers = document.querySelectorAll('.js-trigger-sidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebarBtn = document.getElementById('closeSidebar');

    // Sidebar Elements
    const sbType = document.getElementById('sbType');
    const sbTitle = document.getElementById('sbTitle');
    const sbSummary = document.getElementById('sbSummary');
    const sbPointsList = document.getElementById('sbPoints');
    const sbSignificance = document.getElementById('sbSignificance');

    function openSidebar(triggerElement) {
        const data = triggerElement.dataset;

        sbTitle.textContent = data.title;
        sbType.textContent = data.type;
        sbSummary.textContent = data.summary;
        sbSignificance.textContent = data.significance;

        const pointsArray = data.keyPoints.split(';');
        let pointsHtml = '';
        pointsArray.forEach(point => {
            if(point.trim() !== '') {
                pointsHtml += `<li>${point.trim()}</li>`;
            }
        });
        sbPointsList.innerHTML = pointsHtml;

        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            openSidebar(this);
        });
    });

    closeSidebarBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

});