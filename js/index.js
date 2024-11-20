// Array to store bookmarks (we'll fetch this from localStorage)
let bookmarks = [];

// Select form and table elements
const userForm = document.getElementById("userForm");
const userTable = document.getElementById("userTable");

// Regex for site name (3 to 50 characters, alphanumeric, spaces, hyphens, and underscores)
const siteNameRegex = /^[a-zA-Z0-9\s_-]{3,50}$/;

// Regex for site URL (validates URLs like http://example.com or https://www.example.com)
const siteUrlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

// Function to render bookmarks in the table
function renderBookmarks() {
  userTable.innerHTML = ""; // Clear existing table rows

  // Iterate over bookmarks and display them
  bookmarks.forEach((bookmark, index) => {
    const row = document.createElement("tr"); // Create a new table row
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${bookmark.name}</td>
      <td>
        <a href="${bookmark.url}" target="_blank" class="btn btn-success me-2">
          <i class="fas fa-eye"></i> Visit
        </a>
        <button onclick="deleteBookmark(${index})" class="btn btn-danger">
          <i class="fas fa-trash"></i> Delete
        </button>
      </td>
    `;
    userTable.appendChild(row); // Append row to the table body
  });
}

// Function to load bookmarks from localStorage
function loadBookmarks() {
  const storedBookmarks = localStorage.getItem("bookmarks");
  if (storedBookmarks) {
    bookmarks = JSON.parse(storedBookmarks); // Parse the JSON string into an array
  }
}

// Function to handle form submission
userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get values from input fields
  const name = document.getElementById("name").value.trim();
  const url = document.getElementById("url").value.trim();

  // Validate site name using regex
  if (!siteNameRegex.test(name)) {
    alert(
      "Invalid site name. Please use characters(3-50 characters)."
    );
    return;
  }

  // Validate site URL using regex
  if (!url) {
    alert("Fill out both fields!");
    return;
  }

  if (!siteUrlRegex.test(url)) {
    alert("Invalid site URL. Please provide a valid URL.");
    return;
  }

  // Add new bookmark to the array
  bookmarks.push({ name, url });

  // Save updated bookmarks array to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Clear the form
  userForm.reset();

  // Re-render the table
  renderBookmarks();
});

// Function to delete a bookmark
function deleteBookmark(index) {
  if (confirm("Are you sure you want to delete this bookmark?")) {
    bookmarks.splice(index, 1); 
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks)); 

    renderBookmarks(); 
  }
}

loadBookmarks(); 
renderBookmarks(); 