document.querySelector(".post-btn").addEventListener("click", async function (e) {
    e.preventDefault(); 

    const postText = document.querySelector(".post-text").value;
    const postImage = document.querySelector("#file-input").files[0]; //THe post is stored im first element of files[]
    const id = localStorage.getItem('user_id');
    const formData = new FormData();     //FormData() is JS object for handling form data 
    const userName = localStorage.getItem('name');
    formData.append('user_id', id); 
    formData.append('content', postText);
    if (postImage) formData.append('image_url', postImage);
    
    try {
        const response = await fetch('http://localhost:5000/posts/posts', {
            method: 'POST',
            body: formData,
        });
        
        const result = await response.json();
        if (response.ok) {
            alert('Post created successfully!');
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (err) {
        console.error('Error creating post:', err);
    }

    if (postText || postImage) {
        const postContainer = document.querySelector(".feed-container");
        const newPost = document.createElement("div");
        newPost.classList.add("post");

        // Post Header
        const postHeader = document.createElement("div");
        postHeader.classList.add("post-header");

        const profilePic = document.createElement("div");
        profilePic.classList.add("profile-pic");
        profilePic.innerHTML = '<img src="https://via.placeholder.com/50" alt="User Avatar">';

        const postUser = document.createElement("div");
        const user = document.createElement("span");
        user.textContent=userName;
        user.classList.add("username");
        postUser.classList.add("post-user");
        
    
    postUser.innerHTML = `
            <span class="post-time" >Just now</span>
        `; 
        postHeader.appendChild(profilePic);
        postHeader.appendChild(postUser);
        postUser.appendChild(user);

        // Post Content
        const postContent = document.createElement("div");
        postContent.classList.add("post-content");

        const postTextElement = document.createElement("p");
        postTextElement.textContent = postText;

        postContent.appendChild(postTextElement);

        if (postImage) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(postImage);
            postContent.appendChild(img);
        }

        // Post Actions (Like, Comment, Share)
        const postActions = document.createElement("div");
        postActions.classList.add("post-actions");
        postActions.innerHTML = `
            <button class="like-btn">Like</button>
            <button class="share-btn">Share</button>
        `;

        // Append everything
        newPost.appendChild(postHeader);
        newPost.appendChild(postContent);
        newPost.appendChild(postActions);

        postContainer.prepend(newPost);

        // Clear input after post
        document.querySelector(".post-text").value = "";
        document.querySelector("#file-input").value = "";
    }
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}