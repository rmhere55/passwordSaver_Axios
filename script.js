const apiUrl = 'https://crudcrud.com/api/fc4df6e35039410188fb76795a83010f'; // Replace with your actual API URL

const addPassword = async (website, username, password) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ website, username, password }),
        });
        if (!response.ok) {
            throw new Error('Failed to add password');
        }
        alert('Password Saved');
        showPasswords();
    } catch (error) {
        console.error('Error adding password:', error);
    }
};

const deletePassword = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete password');
        }
        alert('Password Deleted');
        showPasswords();
    } catch (error) {
        console.error('Error deleting password:', error);
    }
};

const showPasswords = async () => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch passwords');
        }
        const data = await response.json();
        // Update your table or UI based on the data from the backend
    } catch (error) {
        console.error('Error fetching passwords:', error);
    }
};

window.onload = () => showPasswords();

document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault();
    const website = document.querySelector('input[name="website"]').value;
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    addPassword(website, username, password);
});

document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.dataset.id; // Assuming you have a data-id attribute on your delete buttons
        deletePassword(id);
    });
});
