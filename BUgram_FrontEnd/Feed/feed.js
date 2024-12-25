  // Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// this is the home page

let currentPage = 1;
const limit = 10; 
const feedContainer = document.getElementById("feed-container");

async function fetchPosts() {   // This will fetch 10 posts at a time, to keep the server smooth
  try {                         //  the limit is passed for pagination
    const response = await fetch(`http://localhost:5000/posts/posts?limit=${limit}&page=${currentPage}`);
    if (!response.ok) throw new Error("Failed to fetch posts");

    const posts = await response.json();
    renderPosts(posts);
    // console.log(posts.image_url);
    currentPage++;
  } catch (error) {
    console.error("Error fetching posts:", error);
    feedContainer.innerHTML = `<p>Failed to load posts. Please try again later.</p>`; //Display error message if unsucceful
  }
} 
const BASE_URL = "http://127.0.0.1:5501/"; //this is the adress of backend server so we can load imgs

function renderPosts(posts) {
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";

    const imageUrl = post.image_url ? `${BASE_URL}/${post.image_url}` : null;
    
    //DOM is used to load posts in HTml
    postElement.innerHTML = `
      <div class="post-header">
       <div class="profile-pic">
            <img src="https://via.placeholder.com/50" alt="User Avatar">
         </div>
        <div class="post-user">
           <h3>${post.username}</h3>
        </div>
        <span>${new Date(post.created_at).toLocaleString()}</span>
      </div>
      <div class="post-content">
        ${post.image_url ? `<img src="${imageUrl}" alt="Post image">` : ""}
        <p>${post.content}</p>
      </div>
      <div class="post-actions">
                <button class="like-btn">👍Like</button>
                <button class="share-btn" id="share-btn">🔗Share</button>
            </div>`
    ;
    feedContainer.appendChild(postElement);
  });
}
fetchPosts();
//Load more posts on a button click
//document.getElementById("load-more").addEventListener("click", fetchPosts);
//only allowing 10 posts per page for now