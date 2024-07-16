// Generic read/get local storage and write to/set local storage

// define the content to be stored via an id on the form
let formContent = document.querySelector("#emailList")

// create an event listener for the form connected to the submit button
formContent.addEventListener('submit', handleFormSubmit)

// read the local storage by parsing the data there, creating an array of the objects there or an empty array
let emailList = JSON.parse(localStorage.getItem("post")) || []

// create the function to read the form inputs when the form is submitted and push them to an object to store in local storage (this has an added function of redirecting to a different page after form submission. Remove the redirect if you want the user to stay on the page. Maybe add something to clear the form in that case.)
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


// // Event listener for Start button
const startButton = document.querySelector("#startGame")
startButton.addEventListener('click', redirect())


// // Redirect to game page
// function redirect(){
//   window.location.href="./cardtable.html";
// }