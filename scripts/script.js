const filterItems = document.querySelectorAll('.cars-filter li');
const carItems = document.querySelectorAll('.car');
const carsContent = document.getElementById('cars-content');

filterItems.forEach((item) => {
  item.onclick = () => {
    filterItems.forEach((el) => el.classList.remove('active'));
    item.classList.add('active');

    const filterText = item.textContent.toLowerCase();
    carItems.forEach((car) => {
      if (
        filterText == 'all brends' ||
        car.querySelector('h4').textContent.toLowerCase().includes(filterText)
      ) {
        car.style.display = 'flex';
      } else car.style.display = 'none';
    });
    carsContent.scrollIntoView({ behavior: 'instant' });
  };
});

document.querySelectorAll('.car-action .button').forEach((bookButton) => {
  bookButton.addEventListener('click', function (e) {
    // Get the car name from the h4 in the same car article
    const carName = this.closest('.car').querySelector('h4').textContent;

    // Set the car field value
    document.getElementById('car').value = carName;
  });
});

const carField = document.getElementById('car');
const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');

document.getElementById('order-action').addEventListener('click', function () {
  let isValid = true;

  if (carField.value.trim() == '') {
    carField.style.borderColor = 'red';
    isValid = false;
    alert('What car do you want to rent?');
  } else carField.style.borderColor = 'white';
  if (!nameField.value.trim() || nameField.value.trim().length < 2) {
    nameField.style.borderColor = 'red';
    isValid = false;
    alert('The name is too short!');
  } else nameField.style.borderColor = 'white';

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
