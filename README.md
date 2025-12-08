# MedFlow

MedFlow est une application web de gestion médicale destinée aux hôpitaux et cliniques. Elle centralise la gestion des médecins, réceptionnistes, patients, rendez-vous, consultations et ordonnances, et inclut un portail patient pour le suivi personnalisé.

---

## Table des matières
- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Contribuer](#contribuer)

---

## Description
MedFlow permet de simplifier la gestion des opérations d’un établissement médical en offrant :
- Gestion des utilisateurs (médecins, réceptionnistes, admin)
- Gestion des patients
- Prise de rendez-vous et gestion d’agenda
- Consultations et ordonnances
- Portail patient interactif

---

## Fonctionnalités

### Epic 1 : Gestion des utilisateurs
- Ajouter et lister des médecins (admin)
- Ajouter et lister des réceptionnistes (admin)

### Epic 2 : Gestion des patients
- Voir, ajouter, modifier et supprimer un patient (réceptionniste)
- Consulter le profil et l’historique médical d’un patient (médecin)
- Visualiser ses informations personnelles (patient)

### Epic 3 : Gestion des rendez-vous & agenda
- Réserver un rendez-vous selon la disponibilité du médecin (patient)
- Visualiser son agenda par jour, semaine ou mois (médecin)

### Epic 4 : Consultations & ordonnances
- Créer une consultation pour un patient (médecin)
- Rédiger et télécharger une ordonnance PDF (médecin)

### Epic 6 : Portail patient
- Consulter ses rendez-vous (patient)

---

## Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/zeineb-ben-ayed/medFlow.git
```

### 2. Installer les dépendances
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Configurer la base de données PostgreSQL
- Créer la base et configurer les variables dans `app.module.ts`.

### 4. Installer et configurer Keycloak via Docker
1. Télécharger et lancer l’image Keycloak :
```bash
docker pull quay.io/keycloak/keycloak:latest
docker run -d --name keycloak -p 8080:8080 quay.io/keycloak/keycloak:latest start-dev
```
2. Accéder à Keycloak via [http://localhost:8080](http://localhost:8080)
3. Créer un **Realm** pour MedFlow
4. Ajouter un **Client** (ex : `medflow-client`) avec type `confidential` ou `public`
5. Ajouter les utilisateurs et définir les rôles : admin, médecin, réceptionniste, patient
6. Configurer les URL de redirection pour le frontend (ex : `http://localhost:3000/*`)

### 5. Lancer l’application
```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd ../frontend
npm run dev
```

---

## Utilisation
- Connectez-vous selon votre rôle : admin, médecin, réceptionniste ou patient.
- Naviguez dans les sections correspondantes :
  - Gestion des utilisateurs  
  - Gestion des patients  
  - Rendez-vous et agenda  
  - Consultations et ordonnances  
  - Portail patient

---

## Structure du projet
```bash
MedFlow/
├── frontend/             # Next.js + Shadcn + Tailwind
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/              # NestJS + GraphQL + Keycloak
│   ├── src/
│   │   ├── appointment/
│   │   ├── user/
│   │   └── main.ts
│   └── package.json
└── README.md
```

---

## Technologies utilisées
- **Frontend** : Next.js, Shadcn UI, Tailwind CSS  
- **Backend** : NestJS, GraphQL, Keycloak (authentification)  
- **Base de données** : PostgreSQL  
- **Authentification & sécurité** : Keycloak  
- **Gestion des versions** : Git / GitHub

---

## Contribuer
1. Forker le projet
2. Créer une branche pour la feature :
```bash
git checkout -b feature/nom-feature
```
3. Committer vos modifications :
```bash
git commit -m "Ajout de ..."
```
4. Pusher sur votre branche :
```bash
git push origin feature/nom-feature
```
5. Ouvrir une Pull Request

---
