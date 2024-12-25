// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Toggle Profile Options Menu
function toggleProfileOptions() {
    const menu = document.getElementById("profile-menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

const userName = localStorage.getItem('name');
const email = localStorage.getItem('email');
const bio = localStorage.getItem('bio');
const userID = localStorage.getItem('user_id');

document.getElementById('name').textContent = userName;
document.getElementById('email').textContent = email;
document.getElementById('bio').textContent = bio;

// Remove Profile Picture
function removePfp() {
    const profileImg = document.getElementById("profile-img");
    const sideProfileImg = document.getElementById("side-img");

    profileImg.src = "default-avatar.png";
    sideProfileImg.src = "default-avatar.png"; // Update the secondary profile picture

    alert("Profile Picture Removed!");
    toggleProfileOptions(); // Hide menu after removal
}

// Update Profile Picture
document.getElementById("update-photo").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newSrc = e.target.result;
            document.getElementById("profile-img").src = newSrc; // Update main profile picture
            document.getElementById("side-img").src = newSrc;   // Update secondary profile picture

            alert("Profile Picture Updated!");
            toggleProfileOptions(); // Hide menu after update
        };
        reader.readAsDataURL(file);
    }
});

// Show the Update Personal Info Form
function showUpdateForm() {
    const updateForm = document.getElementById("update-form");
    updateForm.style.display = "block";
}

const form = document.getElementById('updateProfileForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const formData = new FormData();

    formData.append('userId', userId);
    formData.append('email', document.getElementById('email').value);
    formData.append('bio', document.getElementById('bio').value);
    formData.append('profilePicture', document.getElementById('profilePicture').files[0]);

    try {
        const response = await fetch('http://localhost:5000/users/update-profile', {
            method: 'PUT',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            alert('Profile updated successfully!');
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
});
