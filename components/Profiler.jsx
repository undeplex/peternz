import Link from 'next/link'
import React from 'react'
import ExpandableText from './ExpendableText';

export default function Profiler() {
    const longText = `
Fort d'une solide expérience dans l'univers du web, Pierre est également en charge de toutes les intégrations en matière d'UI/UX (expérience utilisateur et interface utilisateur). Il joue un rôle clé dans l'optimisation des parcours clients, en veillant à ce que chaque point de contact digital reflète  l’identité et les valeurs de la marque.

Son expertise s'étend à l'implémentation de solutions technologiques innovantes pour améliorer la performance des plateformes en ligne, maximiser l'engagement des utilisateurs, et augmenter la conversion. Polyvalent et axé sur les résultats, Pierre met un point d'honneur à créer des expériences digitales cohérentes et engageantes qui soutiennent la croissance de la marque Doic dans un environnement numérique en constante évolution.
`;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        {/* Header */}
        <div className="flex gap-4 items-center">
            <img 
                src="/peterNz.jpg" 
                alt="Pierre Nzana" 
                className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-500 shadow-md"
            />
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Pierre Nzana</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                    {["Developper", "System Engineer", "DevOps", "CopyWriter"].map((role, index) => (
                        <span 
                            key={index} 
                            className="bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-white text-xs font-medium px-2 py-1 rounded-full"
                        >
                            #{role}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Bio */}
        <div className="mt-6 text-gray-700 dark:text-gray-300 text-sm space-y-3">
            <p>
                Pierre occupe le poste de <strong>Brand Executive Officer (BEO)</strong> chez Undeplex, où il supervise la stratégie et le développement de la marque. Il est également responsable de la gestion des actifs numériques de l’entreprise, y compris la création de contenu stratégique (copywriting) pour renforcer la présence en ligne de Doic.
            </p>
            <ExpandableText content={longText} />
        </div>
    </div>
  )
}
