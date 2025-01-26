# Guide des Bonnes Pratiques Git

Ce projet démontre les meilleures pratiques pour la gestion des branches et des commits dans un projet professionnel.

## Structure des Branches

- `main` : Branche de production uniquement
- `develop` : Branche principale de développement
- Branches de fonctionnalités : `feature/nom-de-la-feature`
- Branches de correction : `fix/nom-du-fix`
- Branches de hotfix : `hotfix/nom-du-hotfix`

## Convention de Nommage des Commits

Nous utilisons la convention Conventional Commits. Chaque commit doit suivre ce format :

```
<type>[scope optional]: <description>

[corps optional]
```

### Types de Commits

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Modification de la documentation
- `style`: Changements de style (formatage, espaces, etc.)
- `refactor`: Refactorisation du code
- `test`: Ajout ou modification de tests
- `chore`: Tâches de maintenance

### Exemple de Commit

```bash
git commit -m "feat: ajouter la validation des formulaires" -m "Implémentation de la validation côté client des formulaires d'inscription avec JavaScript"
```

## Workflow Git

1. Créer une nouvelle branche depuis `develop`:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/ma-feature
   ```

2. Faire ses modifications et commiter:

   ```bash
   git add .
   git commit -m "type: description" -m "description détaillée"
   ```

3. Pousser la branche et créer une Pull Request vers `develop`
   ```bash
   git push origin feature/ma-feature
   ```

## Outils de Qualité

- **Husky**: Hooks Git pour validation avant commit
- **CommitLint**: Validation des messages de commit
- **ESLint**: Linting du code
- **Prettier**: Formatage automatique du code

## Installation

```bash
npm install
```

Les hooks Git et les outils de validation seront automatiquement installés.
