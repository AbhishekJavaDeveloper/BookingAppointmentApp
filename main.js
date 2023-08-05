var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var form = document.getElementById('my-form');
var userList = document.getElementById('users');

var users = JSON.parse(localStorage.getItem('users')) || [];

function saveToLocalStorage(data) {
  localStorage.setItem('users', JSON.stringify(data));
}

function displayUsers() {
  userList.innerHTML = '';
  users.forEach(function (user, index) {
    var li = document.createElement('li');
    li.innerHTML = `Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone} <button class="delete-btn" data-index="${index}">Delete</button>`;
    userList.appendChild(li);
  });

  // Add click event listeners to all delete buttons
  var deleteButtons = document.getElementsByClassName('delete-btn');
  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', handleDelete);
  }
}

function handleSubmit(event) {
  event.preventDefault();

  var nameValue = nameInput.value.trim();
  var emailValue = emailInput.value.trim();
  var phoneValue = phoneInput.value.trim();

  if (nameValue === '' || emailValue === '' || phoneValue === '') {
    alert('Please fill in all fields.');
    return;
  }

  var newUser = {
    name: nameValue,
    email: emailValue,
    phone: phoneValue,
  };

  users.push(newUser);
  saveToLocalStorage(users);
  displayUsers();

  form.reset();
}

function handleDelete(event) {
  var index = event.target.getAttribute('data-index');
  if (index !== null) {
    users.splice(index, 1); 
    saveToLocalStorage(users); 
    displayUsers();
  }
}

form.addEventListener('submit', handleSubmit);

displayUsers();
