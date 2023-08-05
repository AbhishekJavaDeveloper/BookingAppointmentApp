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
    li.innerHTML = `Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone} 
    <button class="delete-btn" data-index="${index}">Delete</button>
    <button class="edit-btn" data-index="${index}">Edit</button>`;
    userList.appendChild(li);
  });

  var deleteButtons = document.getElementsByClassName('delete-btn');
  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', handleDelete);
  }

  var editButtons = document.getElementsByClassName('edit-btn');
  for (var i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', handleEdit);
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

  var index = form.getAttribute('data-index');
  if (index === null) {
    var newUser = {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
    };
    users.push(newUser);
  } 
  else {
    users[index].name = nameValue;
    users[index].email = emailValue;
    users[index].phone = phoneValue;
    form.removeAttribute('data-index');
  }

  saveToLocalStorage(users);
  displayUsers();

  form.reset();
}

function handleEdit(event) {
    var index = event.target.getAttribute('data-index');
    if (index !== null) {
      nameInput.value = users[index].name;
      emailInput.value = users[index].email;
      phoneInput.value = users[index].phone;
      form.setAttribute('data-index', index);
    }
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
