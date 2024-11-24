// import { useEffect } from 'react';

// function useCopyButton() {
//   useEffect(() => {
//     const codeBlocks = document.querySelectorAll('pre code');

//     // Boucler sur chaque bloc de code et ajouter un bouton "Copier"
//     codeBlocks.forEach((block) => {
//       // Vérifie si un bouton existe déjà pour éviter les doublons
//       if (block.parentNode.querySelector('.copy-button')) return;

//       // Créer le bouton
//       const button = document.createElement('button');
//       button.innerText = 'Copy';
//       button.className =
//         'copy-button absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs';

//       // Fonction de copie
//       button.onclick = () => {
//         navigator.clipboard.writeText(block.innerText);
//         button.innerText = 'Copy !';
//         setTimeout(() => (button.innerText = 'Copier'), 2000);
//       };

//       // Ajouter le bouton au conteneur du bloc de code
//       block.parentNode.style.position = 'relative';
//       block.parentNode.appendChild(button);
//     });
//   }, []);
// }

// export default useCopyButton;
import { useEffect } from 'react';

function useCopyButton() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach((block) => {
      // Check if the button already exists to prevent duplicates
      if (block.parentNode.querySelector('.copy-button')) return;

      // Create the button
      const button = document.createElement('button');
      button.className =
        'copy-button absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center justify-center';

      // Add an SVG icon for the copy button
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2M16 8h2a2 2 0 012 2v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-2m-4-6h8" />
        </svg>
      `;

      // Copy function
      button.onclick = () => {
        navigator.clipboard.writeText(block.innerText);

        // Temporarily change the button content to "Copied"
        const originalContent = button.innerHTML;
        button.textContent = 'Copied';
        setTimeout(() => {
          button.innerHTML = originalContent;
        }, 2000);
      };

      // Add the button to the code block's container
      block.parentNode.style.position = 'relative';
      block.parentNode.appendChild(button);
    });
  }, []);
}

export default useCopyButton;