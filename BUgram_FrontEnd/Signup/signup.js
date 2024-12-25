document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();  //this will prevent from reolading
  
    const userData = {        //store all the user data
      username: document.getElementById('username').value,
      age: document.getElementById('age').value,
      gender: document.getElementById('gender').value,
      department: document.getElementById('department').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
  
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {  // Passing all the user data to backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        window.location.href = result.redirectTo;  //Will redirect to next page if Signup successful
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error('Error during signup:', err);
    }
  });

// Theme Switch
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
