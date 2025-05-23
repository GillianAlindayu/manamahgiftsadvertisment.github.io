const navLinks = document.getElementById('navLinks');

// // Toggle mobile menu
// document.getElementById('menu-toggle').addEventListener('click', function () {
//     navLinks.classList.toggle('active');
// });

// apply active class on the nav bar items on click. 


const navLinks_a = document.querySelectorAll('.nav-links a');
navLinks_a.forEach(link => {
    link.addEventListener('click', function (e) {
        // Remove active class from all links
        navLinks_a.forEach(item => item.classList.remove('active'));

        // Add active class to clicked link
        this.classList.add('active');

    });
});

const boxes = document.querySelectorAll('.box'); 

function checkBoxes(){
    const triggerButton = window.innerHeight * 0.0; 

    boxes.foreEach(box => {
        
        if (boxTop < triggerBottom) {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        } else {
            box.style.opacity = '0';
            box.style.transform = 'translateY(50px)';
        }
    });
}

//set initial style for animation. 
boxes.forEach (box =>{
    box.style.opacity = '0'; 
    box.style.transform = 'translateY(50px)';
    box.style.transition = 'opacity 0.6 seconds, transform 0.6 seconds'; 

})

// Checkboxes on load and scroll 
window.addEventListener('load', checkBoxes);
window.addEventListener('scroll', checkBoxes);

// Add hover effect to the client logos. 

const clientLogos = document.quereySelectorAll('.client-logo img');
clientLogos.forEach(logo => {
    logo.addEventListener('mouseover', function() {
this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)'    });
    logo.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    

    });
   logo.addEventListener('mouseout', function () {
        this.style.boxShadow = 'none';
    });
})