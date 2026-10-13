const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(__dirname, 'notes.txt');

async function manageFile() {
  await fs.writeFile(filePath, 'My first note.\n', 'utf8');
  console.log('The file was created and written successfully.');

  let content = await fs.readFile(filePath, 'utf8');
  console.log('Original content:', content.trim());

  content += 'This line was added during the update.\n';
  await fs.writeFile(filePath, content, 'utf8');

  const updatedContent = await fs.readFile(filePath, 'utf8');
  console.log('Updated content:\n' + updatedContent);
}

manageFile().catch((error) => {
  console.error('File operation failed:', error.message);
  process.exitCode = 1;
});
