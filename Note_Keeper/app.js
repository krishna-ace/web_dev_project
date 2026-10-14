const form = document.querySelector('#notesForm');
const status = document.querySelector('#status');
const apiUrl = 'http://localhost:3000/api/notes';

function getFormData() {
  return {
    title: document.querySelector('#title').value,
    comment: document.querySelector('#comment').value
  };
}

function setFormData(data) {
  document.querySelector('#title').value = data.title || '';
  document.querySelector('#comment').value = data.comment || '';
}

async function saveData(message) {
  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(getFormData())
  });

  if (!response.ok) {
    throw new Error('Save failed');
  }

  status.textContent = message;
}

document.querySelector('#saveButton').addEventListener('click', async () => {
  try {
    await saveData('Data saved successfully.');
  } catch {
    status.textContent = 'Unable to connect to the API.';
  }
});

document.querySelector('#loadButton').addEventListener('click', async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    setFormData(data);
    status.textContent = 'Data loaded successfully.';
  } catch {
    status.textContent = 'Unable to connect to the API.';
  }
});

document.querySelector('#updateButton').addEventListener('click', async () => {
  try {
    await saveData('Data updated successfully.');
  } catch {
    status.textContent = 'Unable to connect to the API.';
  }
});

document.querySelector('#clearButton').addEventListener('click', async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Clear failed');
    }

    form.reset();
    status.textContent = 'Data cleared successfully.';
  } catch {
    status.textContent = 'Unable to connect to the API.';
  }
});