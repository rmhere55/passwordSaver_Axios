

// Define your API base URL and API key
const apiUrl = 'https://crudcrud.com/api/0a14aa02ca784d098c3a66ff9a64e12e/passs'; // Replace with your actual API URL

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
                <td><button class="edit-btn btnsm" data-id="${password._ed}">edit</button></td>
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

// Event delegation for edit button clicks
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const ed = e.target.dataset.ed;
        await deletePassword(ed);
    }
});

// Initial call to fetch and display passwords on page load
window.onload = showPasswords;
