const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(__dirname, 'webdev.txt');

async function manageFile() {
  
  await fs.writeFile(filePath, 'Mera pehla note.\n', 'utf8');
  console.log('File create aur write ho gayi.');

  let content = await fs.readFile(filePath, 'utf8');
  console.log('Pehle ka content:', content.trim());

  
  content += 'Yeh line baad mein update karke add ki gayi hai.\n';
  await fs.writeFile(filePath, content, 'utf8');

  const updatedContent = await fs.readFile(filePath, 'utf8');
  console.log('Updated content:\n' + updatedContent);
}

manageFile().catch((error) => {
  console.error('File operation fail hui:', error.message);
  process.exitCode = 1;
});