
export function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
      // Avoid adding duplicate buttons
      if (block.parentNode.querySelector('.copy-button')) return;
  
      const button = document.createElement('button');
      button.innerText = 'Copier';
      button.className = 'copy-button absolute top-0 right-0 m-2 bg-blue-500 text-white p-2 rounded';
      button.onclick = () => {
        navigator.clipboard.writeText(block.innerText);
        button.innerText = 'Copié !';
        setTimeout(() => (button.innerText = 'Copier'), 2000);
      };
      block.parentNode.style.position = 'relative'; // Ensure relative position for the parent
      block.parentNode.appendChild(button);
    });
  }