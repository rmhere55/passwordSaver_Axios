// const apiUrl = 'https://crudcrud.com/api/fc4df6e35039410188fb76795a83010f/Passwords'; // Replace with your actual API URL

// const addPassword = async (website, username, password) => {
//     try {
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ website, username, password }),
//         });
//         if (!response.ok) {
//             throw new Error('Failed to add password');
//         }
//         alert('Password Saved');
//         showPasswords();
//     } catch (error) {
//         console.error('Error adding password:', error);
//     }
// };

// const deletePassword = async (id) => {
//     try {
//         const response = await fetch(`${apiUrl}/${id}`, {
//             method: 'DELETE',
//         });
//         if (!response.ok) {
//             throw new Error('Failed to delete password');
//         }
//         alert('Password Deleted');
//         showPasswords();
//     } catch (error) {
//         console.error('Error deleting password:', error);
//     }
// };

// const showPasswords = async () => {
//     try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error('Failed to fetch passwords');
//         }
//         const data = await response.json();
//         // Update your table or UI based on the data from the backend
//     } catch (error) {
//         console.error('Error fetching passwords:', error);
//     }
// };

// window.onload = () => showPasswords();

// document.querySelector('.btn').addEventListener('click', (e) => {
//     e.preventDefault();
//     const website = document.querySelector('input[name="website"]').value;
//     const username = document.querySelector('input[name="username"]').value;
//     const password = document.querySelector('input[name="password"]').value;
//     addPassword(website, username, password);
// });

// document.querySelectorAll('.delete-btn').forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         e.preventDefault();
//         const id = btn.dataset.id; // Assuming you have a data-id attribute on your delete buttons
//         deletePassword(id);
//     });
// });


// Import Axios library
// const axios = require('axios');

// Define your API base URL and API key
const apiUrl = 'https://crudcrud.com/api/fc4df6e35039410188fb76795a83010f/passwords'; // Replace with your actual API URL

// Function to fetch and display passwords on page load
const showPasswords = async () => {
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const tableBody = document.querySelector('table tbody');
        tableBody.innerHTML = ''; // Clear existing table rows
        data.forEach((password) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${password.website}</td>
                <td>${password.username}</td>
                <td>${password.password}</td>
                <td><button class="delete-btn btnsm" data-id="${password._id}">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching passwords:', error);
    }
};

// Function to add a new password
const addPassword = async (website, username, password) => {
    try {
        const response = await axios.post(apiUrl, { website, username, password });
        if (response.status === 201) {
            alert('Password Saved');
            await showPasswords(); // Update UI after adding new password
        } else {
            throw new Error('Failed to add password');
        }
    } catch (error) {
        console.error('Error adding password:', error);
    }
};

// Function to delete a password
const deletePassword = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        if (response.status === 200) {
            alert('Password Deleted');
            await showPasswords(); // Update UI after deleting password
        } else {
            throw new Error('Failed to delete password');
        }
    } catch (error) {
        console.error('Error deleting password:', error);
    }
};

// Event listener for form submission to add a password
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const website = document.querySelector('input[name="website"]').value;
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    await addPassword(website, username, password);
});

// Event delegation for delete button clicks
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        await deletePassword(id);
    }
});

// Initial call to fetch and display passwords on page load
window.onload = showPasswords;
