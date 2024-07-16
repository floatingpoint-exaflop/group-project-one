// define the content to be stored via an id on the form
let formContent = document.querySelector("#emailList")

// create an event listener for the form connected to the submit button
formContent.addEventListener('submit', handleFormSubmit)

// read the local storage by parsing the data there, creating an array of the objects there or an empty array
let emailList = JSON.parse(localStorage.getItem("post")) || []

// create the function to read the form inputs when the form is submitted and push them to an object to store in local storage
function handleFormSubmit(e){
  e.preventDefault()

  let fname = document.querySelector('#fname').value
  let lname = document.querySelector('#lname').value
  let email = document.querySelector('#email').value
  let post = {fname, lname, email}

  emailList.push(post)
  localStorage.setItem('post', JSON.stringify(emailList))
  $('#emailList')[0].reset();
}

// // Redirect to game page
function redirect(){
  window.location.href="./cardtable.html";
}