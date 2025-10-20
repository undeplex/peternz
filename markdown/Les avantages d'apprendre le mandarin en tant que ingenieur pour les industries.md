---

id: 3
featured: true
element: false
views: 40
title: "What Do You Need To Know Before You Go For Being Self-Taught"
author: "Peter Nzana"
authorImage: "/peterNz.jpg"
authorGender: F
category: "English"
description: "It's a type of misunderstanding when it comes to builing our own foreign language skill"
date: "2024-01-30T00:00:00Z"
lastUpdated: "2024-11-21T00:00:00Z"
image: "/blog/self.png"
tags:
 - "Learning"
 - "Knowledge"

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
# Installation et configuration de Docker sur Linux

## 1. Mise à jour du système
Avant de commencer, assurez-vous que votre système est à jour.


```bash
sudo apt update && sudo apt upgrade -y
```
## 2. Instalation des dependances necessaires
Installez les paquets requis pour permettre à Docker de fonctionner correctement.
```bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
```
## 3. Ajout de la clé GPG de Docker et du dépôt officiel

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
## 4. Installation de Docker Engine
Mettre a jour les paquets et installez Docker
```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
```
## 5. Vérification de l'installation de Docker

Assurez-vous que Docker est installé correctement.

sudo docker --version

## 6. Configuration des permissions pour l'utilisateur

Ajoutez votre utilisateur au groupe docker pour éviter d'utiliser sudo à chaque commande Docker.
```bash
sudo usermod -aG docker $USER
newgrp docker
```
## 7. Test de Docker

Testez Docker en exécutant l'image hello-world.
```bash
docker run hello-world
```
---
# Installation d'un conteneur Docker

## 1. Recherche d'une image sur Docker Hub

Utilisez la commande suivante pour rechercher une image (par exemple, nginx).
```bash
docker search nginx
```

## 2. Téléchargement d'une image Docker

Téléchargez l'image choisie, ici l'image nginx.
```bash
docker pull nginx
```

## 3. Lancement d'un conteneur

Lancez un conteneur basé sur l'image téléchargée.
```bash
docker run -d -p 80:80 --name my-nginx nginx

-d : Exécute le conteneur en arrière-plan.

-p 80:80 : Mappe le port 80 du conteneur au port 80 de l'hôte.

--name my-nginx : Nomme le conteneur my-nginx.
```

## 4. Liste des conteneurs actifs

Vérifiez les conteneurs en cours d'exécution.
```bash
docker ps
```

## 5. Gestion des conteneurs

Arrêter un conteneur :
```bash
docker stop my-nginx
```

- Redémarrer un conteneur :

```bash
docker start my-nginx
```

- Supprimer un conteneur :

```bash
docker rm my-nginx
```
- Supprimer une image :

```bash
docker rmi nginx
```

---

## Gestion avancée des conteneurs

### 1. Création d'un fichier Docker Compose

Créez un fichier docker-compose.yml pour orchestrer plusieurs conteneurs. Exemple avec nginx et mysql :

```bash
version: '3.8'
services:
  web:
    image: nginx
    ports:
      - "80:80"
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: example
```

### 2. Lancer les services avec Docker Compose

Démarrez les conteneurs définis dans le fichier docker-compose.yml.
```bash
docker-compose up -d
```

### 3. Arrêter les services

Arrêtez les conteneurs.
```bash
docker-compose down
```

---

Avec ce guide, vous pouvez installer Docker, configurer votre environnement, et commencer à travailler avec des conteneurs. Assurez-vous de personnaliser les commandes selon vos besoins.

