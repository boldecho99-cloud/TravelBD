// ========== Hotel Data ==========
const hotels = [
    {
        id: 1,
        name: "সী প্যারাডাইস রিসোর্ট",
        location: "কক্সবাজার",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
        price: 5500,
        rating: 4.8,
        reviews: 324,
        stars: 5,
        badge: "বেস্ট সেলার",
        amenities: ["wifi", "pool", "restaurant"],
        category: "mid"
    },
    {
        id: 2,
        name: "রয়েল টিউলিপ হোটেল",
        location: "ঢাকা",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500",
        price: 12000,
        rating: 4.9,
        reviews: 512,
        stars: 5,
        badge: "লাক্সারি",
        amenities: ["wifi", "pool", "spa", "restaurant"],
        category: "luxury"
    },
    {
        id: 3,
        name: "হিলটপ রিসোর্ট",
        location: "সিলেট",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500",
        price: 4200,
        rating: 4.5,
        reviews: 189,
        stars: 4,
        badge: "জনপ্রিয়",
        amenities: ["wifi", "restaurant", "parking"],
        category: "mid"
    },
    {
        id: 4,
        name: "লেক ভিউ ইন",
        location: "রাঙামাটি",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500",
        price: 2800,
        rating: 4.3,
        reviews: 156,
        stars: 3,
        badge: "বাজেট ফ্রেন্ডলি",
        amenities: ["wifi", "restaurant"],
        category: "budget"
    },
    {
        id: 5,
        name: "সানসেট বিচ রিসোর্ট",
        location: "কক্সবাজার",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500",
        price: 7500,
        rating: 4.7,
        reviews: 278,
        stars: 5,
        badge: "সী ফেসিং",
        amenities: ["wifi", "pool", "spa", "restaurant"],
        category: "luxury"
    },
    {
        id: 6,
        name: "গ্র্যান্ড সুলতান টি রিসোর্ট",
        location: "শ্রীমঙ্গল",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500",
        price: 8500,
        rating: 4.6,
        reviews: 234,
        stars: 5,
        badge: "টি গার্ডেন ভিউ",
        amenities: ["wifi", "pool", "restaurant", "parking"],
        category: "luxury"
    },
    {
        id: 7,
        name: "ইকোনমি ইন",
        location: "চট্টগ্রাম",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500",
        price: 1800,
        rating: 4.0,
        reviews: 98,
        stars: 3,
        badge: "সাশ্রয়ী",
        amenities: ["wifi", "parking"],
        category: "budget"
    },
    {
        id: 8,
        name: "প্যান প্যাসিফিক সোনারগাঁও",
        location: "ঢাকা",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500",
        price: 15000,
        rating: 4.9,
        reviews: 687,
        stars: 5,
        badge: "প্রিমিয়াম",
        amenities: ["wifi", "pool", "spa", "restaurant", "gym"],
        category: "luxury"
    },
    {
        id: 9,
        name: "নদী তীর রিসোর্ট",
        location: "সুন্দরবন",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500",
        price: 3500,
        rating: 4.4,
        reviews: 145,
        stars: 4,
        badge: "প্রকৃতি",
        amenities: ["wifi", "restaurant", "boat"],
        category: "mid"
    }
];

// ========== DOM Elements ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const hotelGrid = document.getElementById('hotelGrid');
const searchForm = document.getElementById('searchForm');
const bookingModal = document.getElementById('bookingModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const priceFilter = document.getElementById('priceFilter');
const ratingFilter = document.getElementById('ratingFilter');
const sortFilter = document.getElementById('sortFilter');
const newsletterForm = document.getElementById('newsletterForm');
const bookingForm = document.getElementById('bookingForm');
const loadMoreBtn = document.getElementById('loadMore');

let displayedHotels = 6;
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    setMinDates();
    renderHotels(hotels.slice(0, displayedHotels));
    setupEventListeners();
});

// ========== Event Listeners ==========
function setupEventListeners() {
    // Mobile nav toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile nav on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Search form
    searchForm.addEventListener('submit', handleSearch);

    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Filters
    priceFilter.addEventListener('change', applyFilters);
    ratingFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);

    // Modal
    closeModal.addEventListener('click', () => {
        bookingModal.classList.remove('active');
    });

    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
        }
    });

    // Booking form
    bookingForm.addEventListener('submit', handleBooking);

    // Newsletter
    newsletterForm.addEventListener('submit', handleNewsletter);

    // Load more
    loadMoreBtn.addEventListener('click', () => {
        displayedHotels += 3;
        applyFilters();
        if (displayedHotels >= hotels.length) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // Destination cards
    document.querySelectorAll('.destination-card').forEach(card => {
        card.addEventListener('click', () => {
            const destination = card.dataset.destination;
            document.getElementById('destination').value = destination;
            document.getElementById('destination').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ========== Render Hotels ==========
function renderHotels(hotelList) {
    hotelGrid.innerHTML = hotelList.map(hotel => `
        <div class="hotel-card" data-id="${hotel.id}">
            <div class="hotel-image">
                <img src="${hotel.image}" alt="${hotel.name}" loading="lazy">
                <span class="hotel-badge">${hotel.badge}</span>
                <button class="hotel-wishlist ${wishlist.includes(hotel.id) ? 'active' : ''}" data-id="${hotel.id}">
                    <i class="fa${wishlist.includes(hotel.id) ? 's' : 'r'} fa-heart"></i>
                </button>
            </div>
            <div class="hotel-content">
                <p class="hotel-location">
                    <i class="fas fa-map-marker-alt"></i> ${hotel.location}
                </p>
                <h3 class="hotel-name">${hotel.name}</h3>
                <div class="hotel-rating">
                    <span class="stars">${'★'.repeat(hotel.stars)}${'☆'.repeat(5-hotel.stars)}</span>
                    <span class="rating-score">${hotel.rating}</span>
                    <span class="reviews">(${hotel.reviews} রিভিউ)</span>
                </div>
                <div class="hotel-amenities">
                    ${hotel.amenities.includes('wifi') ? '<span><i class="fas fa-wifi"></i> ওয়াইফাই</span>' : ''}
                    ${hotel.amenities.includes('pool') ? '<span><i class="fas fa-swimming-pool"></i> পুল</span>' : ''}
                    ${hotel.amenities.includes('restaurant') ? '<span><i class="fas fa-utensils"></i> রেস্তোরাঁ</span>' : ''}
                </div>
                <div class="hotel-footer">
                    <div class="hotel-price">
                        ৳${hotel.price.toLocaleString('bn-BD')}
                        <span>/রাত</span>
                    </div>
                    <button class="btn btn-primary book-btn" data-id="${hotel.id}">
                        বুক করুন
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners to new elements
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', () => openBookingModal(btn.dataset.id));
    });

    document.querySelectorAll('.hotel-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWishlist(parseInt(btn.dataset.id));
        });
    });
}

// ========== Filter & Sort ==========
function applyFilters() {
    let filtered = [...hotels];

    // Price filter
    const price = priceFilter.value;
    if (price !== 'all') {
        filtered = filtered.filter(hotel => hotel.category === price);
    }

    // Rating filter
    const rating = ratingFilter.value;
    if (rating !== 'all') {
        filtered = filtered.filter(hotel => hotel.stars >= parseInt(rating));
    }

    // Sort
    const sort = sortFilter.value;
    switch(sort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filtered.sort((a, b) => b.reviews - a.reviews);
    }

    renderHotels(filtered.slice(0, displayedHotels));
    
    // Update load more button
    loadMoreBtn.style.display = filtered.length > displayedHotels ? 'inline-flex' : 'none';
}

// ========== Search ==========
function handleSearch(e) {
    e.preventDefault();
    
    const destination = document.getElementById('destination').value.toLowerCase();
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    
    let filtered = hotels.filter(hotel => 
        hotel.location.toLowerCase().includes(destination) ||
        hotel.name.toLowerCase().includes(destination)
    );
    
    if (filtered.length === 0) {
        filtered = hotels;
        showToast('কোন ফলাফল পাওয়া যায়নি, সব হোটেল দেখাচ্ছি');
    } else {
        showToast(`${filtered.length}টি হোটেল পাওয়া গেছে!`);
    }
    
    renderHotels(filtered);
    
    // Scroll to hotels section
    document.getElementById('hotels').scrollIntoView({ behavior: 'smooth' });
}

// ========== Booking Modal ==========
function openBookingModal(hotelId) {
    const hotel = hotels.find(h => h.id === parseInt(hotelId));
    
    modalBody.innerHTML = `
        <div style="display: flex; gap: 15px; margin-bottom: 20px; padding: 15px; background: var(--light); border-radius: 8px;">
            <img src="${hotel.image}" alt="${hotel.name}" style="width: 100px; height: 80px; object-fit: cover; border-radius: 8px;">
            <div>
                <h4 style="margin-bottom: 5px;">${hotel.name}</h4>
                <p style="color: var(--gray); font-size: 0.9rem;"><i class="fas fa-map-marker-alt"></i> ${hotel.location}</p>
                <p style="color: var(--primary); font-weight: 700;">৳${hotel.price.toLocaleString('bn-BD')}/রাত</p>
            </div>
        </div>
    `;
    
    // Set check-in/out dates from search form
    document.getElementById('modalCheckIn').value = document.getElementById('checkIn').value;
    document.getElementById('modalCheckOut').value = document.getElementById('checkOut').value;
    
    bookingModal.classList.add('active');
}

// ========== Booking Submit ==========
function handleBooking(e) {
    e.preventDefault();
    
    // Simulate booking
    showToast('বুকিং সফল হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।');
    bookingModal.classList.remove('active');
    bookingForm.reset();
}

// ========== Newsletter ==========
function handleNewsletter(e) {
    e.preventDefault();
    showToast('সাবস্ক্রিপশন সফল হয়েছে!');
    newsletterForm.reset();
}

// ========== Wishlist ==========
function toggleWishlist(hotelId) {
    const index = wishlist.indexOf(hotelId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('উইশলিস্ট থেকে সরানো হয়েছে');
    } else {
        wishlist.push(hotelId);
        showToast('উইশলিস্টে যোগ করা হয়েছে');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    applyFilters();
}

// ========== Toast ==========
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========== Set Min Dates ==========
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    checkInInput.min = today;
    checkInInput.value = today;
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    checkOutInput.min = tomorrowStr;
    checkOutInput.value = tomorrowStr;
    
    checkInInput.addEventListener('change', () => {
        const nextDay = new Date(checkInInput.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutInput.min = nextDay.toISOString().split('T')[0];
        
        if (checkOutInput.value <= checkInInput.value) {
            checkOutInput.value = nextDay.toISOString().split('T')[0];
        }
    });
}

// ========== Scroll Animation ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.hotel-card, .destination-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
