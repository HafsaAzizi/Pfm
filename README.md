# Pfm
# Projet de Gestion de Commandes de Restauration

Ce projet permet aux clients de passer des commandes en ligne et aux administrateurs de gérer le menu, les commandes et suivre les statistiques de ventes. Il comprend un formulaire de commande, la gestion des menus et des statistiques en temps réel.

## Table des matières

- [Authentification](#authentification)
- [Client](#client)
- [Administrateur](#administrateur)
- [Tableau de bord dynamique](#tableau-de-bord-dynamique)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Contribuer](#contribuer)

## Authentification

### Pour s'authentifier en tant que client :
- Email : client@example.com
- Mot de passe : client123

### Pour s'authentifier en tant qu'administrateur :
- Email : admin@example.com
- Mot de passe : admin123

## Client

Les clients peuvent :

### 1. Remplir un formulaire pour passer une commande :
- Parcourir les catégories et les menus disponibles.
- Visualiser les prix des différents plats.

### 2. Ajouter une commande :
- Sélectionner les menus souhaités.
- Choisir la quantité pour chaque plat.
- Soumettre la commande.

### 3. Suivre l'état de la commande :
- En attente
- En cours
- Livrée

Les clients peuvent suivre l'évolution de leur commande via une interface dynamique.

## Administrateur

L'administrateur peut :

### 1. Gérer les menus :
- Ajouter, modifier ou supprimer des plats dans le menu.
- Gérer les catégories de plats.

### 2. Visualiser les commandes en temps réel :
- Voir toutes les commandes passées par les clients.
- Modifier l'état des commandes (par exemple, marquer une commande comme livrée).

### 3. Suivre les revenus :
- Suivre les revenus journaliers, hebdomadaires et mensuels via des statistiques en temps réel.

### 4. Recevoir des notifications :
- L'administrateur reçoit des notifications pour les commandes non livrées depuis un certain temps.

## Tableau de bord dynamique

Le tableau de bord fournit des statistiques détaillées sur les ventes :

- Plat le plus vendu.
- Revenus par catégorie.
- Commandes en attente et terminées.

## Technologies utilisées

- *Frontend :*
  - Angular
  - HTML, CSS, TypeScript
- *Backend :*
  - Spring Boot
  - MySQL
- *Docker :*
  - Docker Compose pour gérer les conteneurs backend, frontend, base de données, et phpMyAdmin.

## Installation

### Prérequis :
1. *Git :*
   - Assurez-vous d'avoir installé Git. Si ce n'est pas le cas, téléchargez-le depuis [git-scm.com](https://git-scm.com/).

2. *Docker et Docker Compose :*
   - Installez Docker et Docker Compose pour gérer les conteneurs.

### Étapes pour démarrer le projet :

1. *Clonez le projet :*
   ```bash
   git clone <repository_url>
   cd <nom_du_dossier_du_projet>
