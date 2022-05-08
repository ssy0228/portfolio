// scroll animate
let observedElements = document.querySelectorAll('.play');

const options = { 
  threshold: 0.3,
}

const inViewCallback = entries=> {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');  
   }
  });
}

let observer = new IntersectionObserver(inViewCallback, options); 

observedElements.forEach(element => {
  let dataDelay = element.getAttribute('data-delay');
  element.style.transitionDelay = dataDelay+'s';
  observer.observe(element);
});



