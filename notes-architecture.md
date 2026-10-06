# Les problèmes existants du projet

## 1. Architecture du projet 
- Manque de structure modulable (core, shared, feature) 
- Structure de composants répétitive : header component
- Appels HTTP directement dans les composants -> antipattern
- Mêmes requêtes HTTP appelées dans différents composants. On peut utiliser shareReplay 

## 2. Qualité du code et data
- Manque des modèles (Country, Olympique)
- Manque de typage des paramètres 
- Variables mal nommées
- Bouts de code à supprimer 
- Code obsolète, inutilisable ou non visible, à supprimer
- Mauvaise gestion des observables
- À la page "/country/id", manque de données sur le nombre de médailles de chaque édition des JO

## 3. Manque de respect de la maquette 
- Web non responsive 
- Manque de header, loading
- Styles non conformes à la maquette
  - Taille du pie chart
  - Font style non conforme
  - Couleur de l'indicateur de valeur non conforme
  - Libellés des pays du pie chart mal positionnés

## 4. Performance et optimisation
- Manque de cache
- Risque de fuite de mémoire des charts
- Pas de lazy loading

