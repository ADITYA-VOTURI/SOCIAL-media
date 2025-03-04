window.onload = function () {
    if (localStorage.getItem("loggedInUser")) {
        showSocialMedia();
    } else {
        let isNewUser = confirm("Are you a new user?");
        if (isNewUser) {
            document.getElementById("registerSection").style.display = "block";
        } else {
            document.getElementById("loginSection").style.display = "block";
        }
    }
};

// Function to show welcome notification
function showWelcomeMessage(username) {
    let welcomeMsg = document.getElementById("welcomeMessage");
    welcomeMsg.innerText = `🎉 Welcome, ${username}!`;
    welcomeMsg.style.display = "block";
    
    setTimeout(() => {
        welcomeMsg.style.display = "none";
    }, 3000); // Hide after 3 seconds
}

// Register a new user
function register() {
    let user = document.getElementById("regUsername").value;
    let pass = document.getElementById("regPassword").value;
    let message = document.getElementById("message");

    if (user && pass) {
        if (localStorage.getItem(user)) {
            alert("Username already exists! Try logging in.");
        } else {
            localStorage.setItem(user, pass);
            message.innerText = "✅ Registration Successful!";
            message.style.color = "green";
            document.getElementById("nextBtn").style.display = "block";
            showWelcomeMessage(user);
        }
    } else {
        alert("Enter username and password!");
    }
}

// Proceed to login after registration
function showLogin() {
    document.getElementById("registerSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}

// Login user
function login() {
    let user = document.getElementById("loginUsername").value;
    let pass = document.getElementById("loginPassword").value;
    let message = document.getElementById("message");

    if (localStorage.getItem(user) === pass) {
        localStorage.setItem("loggedInUser", user);
        message.innerText = "✅ Login Successful!";
        message.style.color = "green";
        document.getElementById("nextBtn").style.display = "block";
        showWelcomeMessage(user);
    } else {
        alert("Invalid credentials!");
    }
}

// Show social media feed
function showSocialMedia() {
    document.getElementById("loginContainer").classList.add("hidden");
    document.getElementById("socialMediaContainer").classList.remove("hidden");
    let user = localStorage.getItem("loggedInUser");
    document.getElementById("userDisplay").innerText = user;
    showWelcomeMessage(user);
    loadPosts();
}

// Logout user
function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

// Add a new post and show all previous posts
function addPost() {
    let postText = document.getElementById("postInput").value;
    let user = localStorage.getItem("loggedInUser");

    if (postText.trim()) {
        let posts = JSON.parse(localStorage.getItem("posts") || "[]");
        posts.push({ user, text: postText });
        localStorage.setItem("posts", JSON.stringify(posts));

        document.getElementById("postInput").value = ""; // Clear input box
        loadPosts(); // Reload all posts
    }
}

// Load all posts from localStorage
function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    let postContainer = document.getElementById("posts");
    postContainer.innerHTML = ""; // Clear current post display

    posts.forEach(post => {
        let div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `<strong>@${post.user}</strong>: ${post.text}`;
        postContainer.appendChild(div);
    });
}
