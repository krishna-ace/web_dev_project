Note Keeper

A lightweight full-stack notes application built with Node.js, HTML, CSS, and JavaScript. Note Keeper lets users save, load, update, and clear a single note containing a title and comment through a simple REST API.

## Features

- Clean, responsive user interface
- One title field and one comment field
- Save notes to a local JSON file
- Load previously saved notes
- Update saved notes
- Clear the note and stored data
- No external packages required

## Project Structure

```text
Note Keeper/
├── index.html       # User interface and styling
├── app.js           # Frontend API integration
├── server.js        # Node.js server and API
├── notes-data.json  # Generated automatically after saving a note
└── README.md
```

## Requirements

- [Node.js](https://nodejs.org/) version 18 or later
- A modern web browser

## Getting Started

1. Open the project folder in Visual Studio Code.
2. Open the integrated terminal.
3. Start the server:

   ```powershell
   node server.js
   ```

4. Open the application in your browser:

   ```text
   http://localhost:3000
   ```

To stop the server, focus the terminal and press `Ctrl + C`.

## How to Use

1. Enter a title and a comment.
2. Select **Save** to store the data.
3. Select **Load** to retrieve the most recently saved note.
4. Change the title or comment, then select **Update** to replace the stored data.
5. Select **Clear** to empty the form and remove saved data.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/notes` | Retrieves the saved note. |
| `PUT` | `/api/notes` | Saves or updates the note. |
| `DELETE` | `/api/notes` | Removes the saved note. |

### Example Request Body

```json
{
  "title": "Project Meeting",
  "comment": "Discuss the project timeline and next steps."
}
```

## Data Storage

The API stores note data in `notes-data.json` in the project folder. The file is created automatically the first time you save or update a note.

## Technology Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js built-in `http` module
- **Storage:** Local JSON file

## License

This project is available for learning and personal use.
