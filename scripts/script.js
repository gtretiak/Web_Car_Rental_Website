// Select all filter list items (like "All Brands", "BMW", etc.)
// document is a root DOM object, query - is an attached method, in brackets is a CSS selector
const filterItems = document.querySelectorAll('.cars-filter li');
// Select all car elements in the list
const carItems = document.querySelectorAll('.car');
// Get the container where cars are displayed
const carsContent = document.getElementById('cars-content');

// Add click handler to each filter item (forEach is a builtin method)
filterItems.forEach((item) => {
  //=> is shorter syntax for writing functions
  item.onclick = () => {
    // Remove 'active' class from all filter items (classList contains them all)
    filterItems.forEach((el) => el.classList.remove('active'));
    // Add 'active' class to clicked filter item
    item.classList.add('active');

    // Get the filter text (e.g., "all brands" or "bmw")
    const filterText = item.textContent.toLowerCase();
    // Filter cars based on selection
    carItems.forEach((car) => {
      // If "all brands" or car name matches filter, show it (flex display)
      if (
        filterText == 'all brands' ||
        // find h4 inside car, get text from it, convert to lowercase and see if it includes 'all brands'
        car.querySelector('h4').textContent.toLowerCase().includes(filterText)
      ) {
        car.style.display = 'flex';
      } // Otherwise hide it
      else car.style.display = 'none';
    });
    // Scroll to the cars section (instant jump)
    carsContent.scrollIntoView({ behavior: 'instant' });
  };
});

// Add click handler to all "Book" buttons
document.querySelectorAll('.car-action .button').forEach((bookButton) => {
  bookButton.addEventListener('click', function (e) {
    // Find closest parent car element and get its name (from <h4>)
    const carName = this.closest('.car').querySelector('h4').textContent;

    // Set the car field value
    document.getElementById('car').value = carName;
  });
});
// Get form input fields
const carField = document.getElementById('car');
const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');

// Add click handler to submit button ("order-action")
document.getElementById('order-action').addEventListener('click', function () {
  let isValid = true;

  if (carField.value.trim() == '') {
    carField.style.borderColor = 'red';
    isValid = false;
    alert('What car do you want to rent?');
  } else carField.style.borderColor = 'white';
  // trim() removes whitespaces
  if (!nameField.value.trim() || nameField.value.trim().length < 2) {
    nameField.style.borderColor = 'red';
    isValid = false;
    alert('The name is too short!');
  } else nameField.style.borderColor = 'white';
  //\D - non digits, \d - digits, g - global flag (meaning all characters, not just first)
  const phoneRegex = /^\d{10,}$/; // At least 10 digits
  const cleanedPhone = phoneField.value.replace(/\D/g, ''); // Remove non-digits
  if (!cleanedPhone || !phoneRegex.test(cleanedPhone)) {
    phoneField.style.borderColor = 'red';
    isValid = false;
    alert('Insert at least 10 digit number!');
  } else phoneField.style.borderColor = 'white';

  // If all fields are valid
  if (isValid) {
    // Show success message
    alert('Thank you for the booking! We will contact you soon.');

    // Clear all fields
    carField.value = '';
    nameField.value = '';
    phoneField.value = '';
  }
});
