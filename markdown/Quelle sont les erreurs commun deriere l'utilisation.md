---

id: 1
featured: true
element: false
views: 40
title: "How do you want to build the infras of a single server "
author: "Peter Nzana"
authorImage: "/peterNz.jpg"
category: "computer science"
description: "admin systeme job is now available to any one with just a GED"
date: "2022-10-20T00:00:00Z"
lastUpdated: "2024-11-21T00:00:00Z"
image: "/blog/flag-america-2.jpg"
tags:
 - "technology"
 - "server"
seo:
  metaDescription: "Discover the benefits of learning Mandarin for engineers in a globalized world."
  keywords: "Mandarin, engineers, technology, language learning"
toc:
  - text: "Introduction"
    anchor: "introduction"
  - text: "Step 1: Vocabulary"
    anchor: "step-1-vocabulary"
  - text: "Step 2: Practice"
    anchor: "step-2-practice"
resources:
  - title: "Learning Mandarin for Engineers"
    url: "https://example.com/mandarin-for-engineers"
  - title: "Docker Installation Guide"
    url: "https://example.com/docker-install"

---
# Table des matières

1. [Les bases de PowerShell](#les-bases-de-powershell)  
2. [Commandes de base](#commandes-de-base)  
3. [Variables et types de données](#variables-et-types-de-données)  
4. [Boucles et conditions](#boucles-et-conditions)  
5. [Fonctions](#fonctions)  
6. [Gestion des fichiers et répertoires](#gestion-des-fichiers-et-répertoires)  
7. [Modules et importation](#modules-et-importation)  


## Les bases de PowerShell

### Lancement de PowerShell
Pour ouvrir PowerShell :
1. Recherchez "PowerShell" dans le menu démarrer.
2. Cliquez sur **Windows PowerShell** ou **Windows PowerShell ISE** pour l'interface graphique.

### Cmdlets : Qu'est-ce que c'est ?
Les **cmdlets** (prononcées "command-lets") sont des commandes PowerShell intégrées au langage. Elles suivent généralement le format `Verbe-Nom`.

**Exemple :**
```powershell
Get-Process   # Obtenir la liste des processus actifs
```
### Commande de base
#### Obtenir de l'aide,Pour obtenir des informations sur une commande :
```powershell
Get-Help <Nom-De-La-Commande>
```
Exemple:
```powershell
Get-Help Get-process
```
#### Liste des cmlets disponibles
```powershell
Get-Command
```
Decouvrir la version de PowerShell
```powershell
$PSVersionTable.PSVersion
```
#### Variables et types de donnees 
Declaration de variables

## step-2-practice


### Boucles et conditions
```powershell
if ($condition) {
    # Instructions si vrai
} else {
    # Instructions si faux
}

Exemple:

if (5 -gt 3) {
    Write-Output "5 est plus grand que 3"
} else {
    Write-Output "5 n'est pas plus grand que 3"
}

foreach ($item in $collection) {
    # Instructions
}

Exemple:

$jours = @("Lundi", "Mardi", "Mercredi")
foreach ($jour in $jours) {
    Write-Output "Aujourd'hui, c'est $jour"
}

```
