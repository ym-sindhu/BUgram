// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const loginData = {    //store user data
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
   
    try {    //pass userdata to backend to verify if user exists and if the password is correct
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Login successful!');
        localStorage.setItem('token', result.token);
        localStorage.setItem('user_id', result.id);
        localStorage.setItem('name', result.userName);
        localStorage.setItem('bio', result.bio);
        localStorage.setItem('email', result.userEmail);
        window.location.href = result.redirectTo;     // redirect to Home page if login succeceful
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  });
  