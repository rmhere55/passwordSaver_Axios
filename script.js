const apiUrl = 'https://crudcrud.com/api/f9306a912d9a423bab9da8f5213abd32/passwords';
let passwords = [];

// Fetch passwords from API
const fetchPasswords = async () => {
    try {
        const response = await axios.get(apiUrl);
        passwords = response.data;
        displayPasswords(passwords);
    } catch (error) {
        console.error('Error fetching passwords:', error);
    }
};

// Display passwords in the table
const displayPasswords = (passwordsToDisplay) => {
    const passwordList = document.getElementById('passwordList');
    passwordList.innerHTML = '';

    passwordsToDisplay.forEach(password => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${password.email}</td>
            <td>********</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editPassword('${password._id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deletePassword('${password._id}')">Delete</button>
            </td>
        `;
        passwordList.appendChild(row);
    });
};

// Add a new password
const addPassword = async (email, password) => {
    try {
        const response = await axios.post(apiUrl, { email, password });
        if (response.status === 201) {
            await fetchPasswords();
            document.getElementById('passwordForm').reset();
        } else {
            throw new Error('Failed to add password');
        }
    } catch (error) {
        console.error('Error adding password:', error);
    }
};

// Edit a password
const editPassword = async (id) => {
    const password = passwords.find(p => p._id === id);
    if (password) {
        document.getElementById('email').value = password.email;
        document.getElementById('password').value = password.password;
        document.getElementById('passwordForm').dataset.id = id;
    }
};

// Update a password
const updatePassword = async (id, email, password) => {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, { email, password });
        if (response.status === 200) {
            await fetchPasswords();
            document.getElementById('passwordForm').reset();
        } else {
            throw new Error('Failed to update password');
        }
    } catch (error) {
        console.error('Error updating password:', error);
    }
};

// Delete a password
const deletePassword = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        if (response.status === 200) {
            await fetchPasswords();
        } else {
            throw new Error('Failed to delete password');
        }
    } catch (error) {
        console.error('Error deleting password:', error);
    }
};

// Event listener for form submission
const passwordForm = document.getElementById('passwordForm');
passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (passwordForm.dataset.id) {
        await updatePassword(passwordForm.dataset.id, email, password);
        delete passwordForm.dataset.id;
    } else {
        await addPassword(email, password);
    }
});

// Event listener for search input
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPasswords = passwords.filter(password => password.email.toLowerCase().includes(searchTerm));
    displayPasswords(filteredPasswords);
});

// Fetch passwords on page load
fetchPasswords();
