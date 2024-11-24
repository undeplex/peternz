export function addCopyButtonsToCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach((block) => {
    // Avoid adding duplicate buttons
    if (block.parentNode.querySelector('.copy-button')) return;

    const button = document.createElement('button');
    button.className = 'copy-button absolute top-0 right-0 m-2 bg-blue-500 text-white p-2 rounded flex items-center justify-center';

    // Set the initial button content to an SVG icon
    const originalContent = `
     <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg>
    `;
    button.innerHTML = originalContent;

    // Copy functionality
    button.onclick = () => {
      navigator.clipboard.writeText(block.innerText);

      // Temporarily change the button content to "Copied!"
      button.innerText = 'Copié !'; // Adjust the text if needed
      setTimeout(() => {
        button.innerHTML = originalContent;
      }, 2000);
    };

    // Ensure the parent block has a relative position for the button
    block.parentNode.style.position = 'relative';
    block.parentNode.appendChild(button);
  });
}