# HCC API

HCC API est une API dédiée à la gestion d’un club de handball. Elle permet notamment de gérer les utilisateurs, les matchs et les actualités (news) du club.

## Prérequis

- Node JS
- npm

## Installation

1. Clonez le repository

```bash
git clone https://votre-repository-url.git
```

2. Installer les dépendances

```bash
npm install
```

## Lancer le serveur de l'API

Pour démarrer l'API, lancez la commande :

```bash
npm run start
```

## Endpoints de l'API

### Créer un compte

```http
POST http://localhost:3000/auth/register
```

#### Body JSON :

```json
{
  "email": "votre@email.com",
  "password": "votremotdepasse",
  "role": "player/coach/contributor"
}
```

<br/>

### Se connecter

```http
POST http://localhost:3000/auth/login
```

#### Body JSON :

```json
{
  "email": "votre@email.com",
  "password": "votremotdepasse"
}
```

Après la connexion, vous recevrez un access token. Celui-ci devra être fourni dans le header Authorization sous la forme suivante :

```bash
Authorization: Bearer <votre_access_token>
```

<br/>

### Voir la liste des utilisateurs

```http
GET http://localhost:3000/users
```

<br/>

### Voir un utilisateur particulier

```http
GET http://localhost:3000/users/:id
```

Remplacez :id par l’identifiant de l’utilisateur.
<br/>

### Voir la liste des matchs

```http
GET http://localhost:3000/matches
```

<br/>

### Voir un match particulier

```http
GET http://localhost:3000/matches/:id
```

Remplacez :id par l’identifiant du match.
<br/>

### Créer un match

```http
POST http://localhost:3000/matches
```

#### Body JSON :

```json
{
  "adversary": "Nom de l'équipe adverse",
  "date": "2025-03-20",
  "score": "3-2"
}
```

<br/>

### Mettre à jour un match existant

```http
PUT http://localhost:3000/matches/:id
```

#### Body JSON :

```json
{
  "adversary": "Équipe Machin",
  "date": "2025-03-25",
  "score": "2-1"
}
```

<br/>

### S'inscrire à un match (rôle player)

```http
PUT http://localhost:3000/matches/:id/enroll
```

#### Body JSON :

```json
{
  "playerId": 5
}
```

<br/>

### Se désinscrire d'un match (rôle player)

```http
PUT http://localhost:3000/matches/:id/unenroll
```

#### Body JSON :

```json
{
  "playerId": 5
}
```

<br/>

### Créer une news (rôle contributor)

```http
POST http://localhost:3000/news
```

#### Body JSON :

```json
{
  "title": "Titre de la news",
  "content": "Contenu de la news"
}
```

<br/>

### Voir la liste des news

```http
GET http://localhost:3000/news
```

<br/>

### Voir une news en particulier

```http
GET http://localhost:3000/news/:id
```

Remplacez :id par l'identifiant de la news.
<br/>

### Notes additionnelles

- Authentification : N’oubliez pas d’inclure votre token JWT dans le header Authorization pour accéder aux endpoints protégés.
- Environnement : Adaptez l’URL de base (http://localhost:3000) si vous utilisez un autre port ou domaine.
- Validation des rôles : Certains endpoints requièrent des rôles spécifiques (ex. : coach, contributor, player).
