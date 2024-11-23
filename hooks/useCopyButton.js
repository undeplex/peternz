import { useEffect } from 'react';

function useCopyButton() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('pre code');

    // Boucler sur chaque bloc de code et ajouter un bouton "Copier"
    codeBlocks.forEach((block) => {
      // Vérifie si un bouton existe déjà pour éviter les doublons
      if (block.parentNode.querySelector('.copy-button')) return;

      // Créer le bouton
      const button = document.createElement('button');
      button.innerText = 'Copier';
      button.className =
        'copy-button absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs';

      // Fonction de copie
      button.onclick = () => {
        navigator.clipboard.writeText(block.innerText);
        button.innerText = 'Copié !';
        setTimeout(() => (button.innerText = 'Copier'), 2000);
      };

      // Ajouter le bouton au conteneur du bloc de code
      block.parentNode.style.position = 'relative';
      block.parentNode.appendChild(button);
    });
  }, []);
}

export default useCopyButton;