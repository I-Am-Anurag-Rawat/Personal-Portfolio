const navbar = document.querySelector(".navbar");
const navbarOffsetTop = navbar.offsetTop;
const sections = document.querySelectorAll("section");
const navbarLinks = document.querySelectorAll(".navbar-link");
const progress = document.querySelector(".progress-bars-wrapper");
const progressBarPercents = [90, 80, 85, 80, 80, 70, 70];




const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('input[type="submit"]'); // Get the submit button
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Disable the submit button
    submitBtn.disabled = true;
    submitBtn.value = 'Sending...';
    const formData = new FormData(form);
    fetch('', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'), // send CSRF token for Django security
        },
        body: formData
      })
      .then(response => {
        if(response.status == 204)
        {
          console.log('Resetting form on 204');
          form.reset(); // clear the form
          return null;
        }
        else
        {
          return response.json()
        }
      })  // get JSON response from Django
      .then(data => {
        if(data) {
          form.reset(); // clear the form
        }
      })
      .catch(error => {
        console.error('Error sending form:', error);
      })
      .finally(() => {
          // Re-enable the button no matter what
          submitBtn.disabled = false;
          submitBtn.value = 'Send'; // Restore original text
      });
});

// Get CSRF token from cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
}


window.addEventListener("scroll", () => {
  mainFn();
});

const mainFn = () => {
  if (window.pageYOffset >= navbarOffsetTop) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  sections.forEach((section, i) => {
    if (window.pageYOffset >= section.offsetTop - 10) {
      navbarLinks.forEach((navbarLink) => {
        navbarLink.classList.remove("change");
      });
      navbarLinks[i].classList.add("change");
    }
  });

  if (window.pageYOffset + window.innerHeight >= progress.offsetTop) {
    document.querySelectorAll(".progress-percent").forEach((el, i) => {
      el.style.width = `${progressBarPercents[i]}%`;
      el.previousElementSibling.firstElementChild.textContent =
        progressBarPercents[i];
    });
  }
};

mainFn();

window.addEventListener("resize", () => {
  window.location.reload();
});