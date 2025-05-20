
const scriptURL = 'https://script.google.com/macros/s/AKfycbyisfGs-qs9Mt2fPDd8COYMLDsP0S8kTjbyuC56pF-FmHWjc8k6mEx8h73HyOYrpxt1/exec'

const form = document.forms['submitToGoogleSheet']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => alert("Thank you! your Message is submitted successfully."))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message))
})