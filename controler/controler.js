

function link(){

}
const event = new Event('build');

// Listen for the event.
elem.addEventListener('build', function (e) { /* ... */ }, false);

// Dispatch the event.
elem.dispatchEvent(event);

const event = new CustomEvent('build', { detail: elem.dataset.time });


function eventHandler(e) {
  console.log('The time is: ' + e.detail);
}



function simulateClick() {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    const cb = document.getElementById('checkbox');
    const cancelled = !cb.dispatchEvent(event);
  
    if (cancelled) {
      // A handler called preventDefault.
      alert("cancelled");
    } else {
      // None of the handlers called preventDefault.
      alert("not cancelled");
    }
  }
