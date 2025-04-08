document.addEventListener("DOMContentLoaded", function () {
    const gridItems = document.querySelectorAll('.notice, .announcement');
    const searchInput = document.getElementById('search-input');
    const languageSelect = document.getElementById('language-select');
    const filterSelect = document.getElementById('filter-select');

    // Language data
    const languageData = {
        en: {
            searchPlaceholder: "Search...",
            noticesTitle: "Notices",
            announcementsTitle: "Announcements",
            contactUs: "Contact Us",
            ifYouHaveQuestions: "If you have any questions, please contact us at:",
            email: "Email: info@nepal.gov.np",
            phone: "Phone: +977-1-XXXXXXX"
        },
        ne: {
            searchPlaceholder: "खोजी गर्नुहोस्...",
            noticesTitle: "सूचनाहरू",
            announcementsTitle: "घोषणाहरू",
            contactUs: "हामीलाई सम्पर्क गर्नुहोस्",
            ifYouHaveQuestions: "यदि तपाईंसँग कुनै प्रश्न छ भने, कृपया हामीलाई सम्पर्क गर्नुहोस्:",
            email: "इमेल: info@nepal.gov.np",
            phone: "फोन: +977-1-XXXXXXX"
        }
    };

    // Function to update text based on selected language
    function updateLanguage(lang) {
        document.getElementById('search-input').placeholder = languageData[lang].searchPlaceholder;
        document.querySelector('#notices h2').innerText = languageData[lang].noticesTitle;
        document.querySelector('#announcements h2').innerText = languageData[lang].announcementsTitle;
        document.querySelector('#contact h2').innerText = languageData[lang].contactUs;
        document.querySelector('.contact-info p:nth-of-type(1)').innerText = languageData[lang].ifYouHaveQuestions;
        document.querySelector('.contact-info p:nth-of-type(2)').innerText = languageData[lang].email;
        document.querySelector('.contact-info p:nth-of-type(3)').innerText = languageData[lang].phone;
    }

    // Add event listener for language change
    languageSelect.addEventListener('change', function() {
        updateLanguage(this.value);
    });

    // Add the visible class after a short delay to trigger the animation
    setTimeout(() => {
        gridItems.forEach(item => {
            item.classList.add('visible'); // Add visible class to trigger animation
        });
    }, 100); // Delay in milliseconds

    function checkVisibility() {
        const triggerBottom = window.innerHeight * 0.8; // Trigger when 80% of the item is visible

        gridItems.forEach(item => {
            const box = item.getBoundingClientRect();
            if (box.top < triggerBottom) {
                item.classList.add('visible'); // Add visible class when in view
            } else {
                item.classList.remove('visible'); // Remove visible class when out of view
            }
        });
    }

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase(); // Get the search term
        gridItems.forEach(item => {
            const title = item.querySelector('h3').innerText.toLowerCase(); // Get the title
            const content = item.querySelector('p').innerText.toLowerCase(); // Get the content
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                item.style.display = ''; // Show item if it matches
            } else {
                item.style.display = 'none'; // Hide item if it doesn't match
            }
        });
    });

    // Filter functionality
    filterSelect.addEventListener('change', function() {
        const filterValue = this.value; // Get the selected filter value
        gridItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = ''; // Show all items
            } else if (filterValue === 'notice' && item.classList.contains('notice')) {
                item.style.display = ''; // Show only notices
            } else if (filterValue === 'announcement' && item.classList.contains('announcement')) {
                item.style.display = ''; // Show only announcements
            } else {
                item.style.display = 'none'; // Hide items that don't match the filter
            }
        });
    });

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check

    // Modal functionality for notices and announcements
    document.querySelectorAll('.notice, .announcement').forEach(item => {
        item.addEventListener('click', event => {
            // Add a subtle animation effect
            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 200);
            
            const title = item.querySelector('h3').innerText;
            const date = item.querySelector('p').innerText;
            const content = item.querySelectorAll('p')[1].innerText;
            
            // Create a modal
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h3>${title}</h3>
                    <p class="date">${date}</p>
                    <p>${content}</p>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            const closeBtn = modal.querySelector('.close');
            closeBtn.onclick = () => {
                modal.remove();
            };
            
            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.remove();
                }
            };
        });
    });
});