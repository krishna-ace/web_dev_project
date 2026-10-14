const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(__dirname, 'notes.txt');

async function manageFile() {
  
  await fs.writeFile(filePath, 'My first note.\n', 'utf8');
  console.log('File has been created and written scuccessfully.');

  let content = await fs.readFile(filePath, 'utf8');
  console.log('Previous content:', content.trim());

  
  content += 'This line was updated and added later.\n';
  await fs.writeFile(filePath, content, 'utf8');

  const updatedContent = await fs.readFile(filePath, 'utf8');
  console.log('Updated content:\n' + updatedContent);
}

manageFile().catch((error) => {
  console.error('File operation failed:', error.message);
  process.exitCode = 1;
});