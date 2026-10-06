# Olympic Games App

Tableau de bord Angular qui présente les résultats des pays aux Jeux Olympiques : nombre total de médailles par pays, puis le détail par édition pour chaque pays.

Projet réalisé dans le cadre de la formation OpenClassrooms « Développeur Full-Stack Java et Angular », à partir d'un projet de départ (*starter*) refactorisé.

## Fonctionnalités

- **Accueil** : un graphique en secteurs avec le nombre total de médailles par pays, ainsi que le nombre de pays et le nombre d'éditions des JO. Un clic sur un secteur ouvre la page du pays.
- **Page pays** (`/country/:id`) : un graphique en courbe avec les médailles par édition, ainsi que le nombre de participations, de médailles et d'athlètes.
- **Page introuvable** : pour toute URL inconnue ou tout pays inexistant.
- **Responsive** : mise en page adaptée au mobile, à la tablette et au desktop.
- **Indicateurs de chargement** : pendant le chargement des pages et des données.

## Stack technique

| Outil | Version |
|---|---|
| Angular | 18 |
| TypeScript | 5.4 |
| RxJS | 7.8 |
| Chart.js | 4 |
| Tests | Jasmine + Karma |

## Prérequis

- Node.js 18.19 ou plus récent (version demandée par Angular 18)
- npm

## Installation et lancement

```bash
git clone https://github.com/K-Duong/olympic-app-angular.git
cd olympic-app-angular
npm install
npm start
```

L'application est ensuite disponible sur `http://localhost:4200/`.

| Commande | Rôle |
|---|---|
| `npm start` | Serveur de développement avec rechargement automatique |
| `npm run build` | Build de production dans `dist/` |
| `npm test` | Tests unitaires (Karma, en mode watch) |
| `npx ng test --watch=false` | Tests unitaires, en une seule exécution |

Les données proviennent d'un fichier local : `src/assets/mock/olympic.json`.

## Architecture

L'organisation du code, les choix techniques et les solutions apportées aux problèmes du projet de départ sont décrits dans [`architecture.md`](./architecture.md).

## Tests

```bash
npx ng test --watch=false
```

Chaque composant a un test de création. On vérifie aussi :
- le loader : le message par défaut, un message personnalisé et l'accessibilité (`role="status"`) ;
- Home et Country : le loader est visible avant la réponse HTTP, simulée avec `HttpTestingController`, et disparaît après.
