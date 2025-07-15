document.addEventListener('DOMContentLoaded', function() {
    
    const menu = document.getElementById('menu');
    const menuIcon = document.querySelector('.menu-icon');

    menuIcon.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
    
    
    const text = "Empowering Communities One Step at a Time";
    let index = 0;
    const speed = 100; 
    const typingTextElement = document.getElementById("typing-text");

    function typeWriter() {
        if (index < text.length) {
            typingTextElement.innerHTML = text.slice(0, index + 1) + '<span class="cursor"></span>';
            index++;
            setTimeout(typeWriter, speed);
        } else {
            
            typingTextElement.innerHTML = text + '<span class="cursor"></span>';
        }
    }

    
    typeWriter();
    
    
    let slideIndex = 1;
    showSlides(slideIndex);

    
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    
    let autoSlide = setInterval(function () {
        plusSlides(1);
    }, 3000); 

    let hasAnimated = false; 

function animateStats() {
    if (hasAnimated) return; 

    setTimeout(() => { 
        const stats = document.querySelectorAll('.stat h3');
        stats.forEach(stat => {
            const target = +stat.dataset.target; 
            let count = 0;
            const increment = Math.ceil(target / 500); 

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    if (count > target) count = target; 
                    stat.textContent = count;
                    requestAnimationFrame(updateCount);
                }
            };
            updateCount();
        });

        hasAnimated = true; 
    }, 2000); 
}


const statsSection = document.querySelector('.statistics');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateStats(); 
        observer.disconnect(); 
    }
});

observer.observe(statsSection); 

const themeToggle = document.getElementById('theme-toggle');

    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    themeToggle.checked = currentTheme === 'dark';

    
    themeToggle.addEventListener('change', function() {
        if (themeToggle.checked) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); 
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); 
        }
    });  

});


document.getElementById('volunteerForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;
    const availability = document.getElementById('availability').value;
    const formMessage = document.getElementById('form-message');

    
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    
    if (name === '' || email === '' || phone === '' || interest === '' || availability === '') {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please fill in all required fields.';
        return;
    }

    if (!email.match(emailPattern)) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    
    formMessage.textContent = ''; 
    showModal(); 

    
    document.getElementById('volunteerForm').reset();
});


function showModal() {
    const modal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close');

    modal.style.display = 'block';

    
    closeModal.onclick = function () {
        modal.style.display = 'none';
    };

    
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}


document.getElementById('donationForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    
    const name = document.getElementById('donorName').value;
    const email = document.getElementById('donorEmail').value;
    const address = document.getElementById('donorAddress').value;
    const amount = document.getElementById('donationAmount').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    
    document.querySelectorAll('.error-message').forEach(function (el) {
        el.textContent = '';
    });

    let isValid = true; 

    
    if (name === '') {
        document.getElementById('nameError').textContent = 'Please enter your full name.';
        isValid = false;
    }

    
    if (email === '' || !email.match(emailPattern)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    
    if (address === '') {
        document.getElementById('addressError').textContent = 'Please enter your address.';
        isValid = false;
    }

    
    if (amount === '' || isNaN(amount) || parseFloat(amount) <= 0) {
        document.getElementById('amountError').textContent = 'Please enter a valid donation amount greater than zero.';
        isValid = false;
    }

    
    if (paymentMethod === '') {
        document.getElementById('paymentError').textContent = 'Please select a payment method.';
        isValid = false;
    }

    
    if (isValid) {
        alert('Thank you for your generous donation!');
        document.getElementById('donationForm').reset(); 
    }
});



