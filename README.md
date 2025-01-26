# Guide des Bonnes Pratiques Git

Ce projet démontre les meilleures pratiques pour la gestion des branches et des commits dans un projet professionnel.

## Structure des Branches

### Branches Protégées

- `main` : Branche de production uniquement
  - ⚠️ Aucun commit direct n'est autorisé
  - Les modifications ne peuvent venir que de `develop` via Pull Request
  - Représente le code en production

- `develop` : Branche principale de développement
  - ⚠️ Aucun commit direct n'est autorisé
  - Intègre toutes les nouvelles fonctionnalités validées
  - Source pour créer vos branches de travail

### Branches de Travail (Pour les Stagiaires)

En tant que stagiaire, vous devez TOUJOURS créer votre branche à partir de `develop`. Le nom de votre branche doit suivre cette convention :

```
<type>/<description-courte>
```

Les types de branches correspondent aux types de modifications que vous allez apporter :

1. **`feature/`** - Pour les nouvelles fonctionnalités
   - Quand utiliser : Lorsque vous développez une nouvelle fonctionnalité
   - Format : `feature/nom-de-la-feature`
   - Exemples :
     ```bash
     git checkout -b feature/authentification-utilisateur
     git checkout -b feature/formulaire-contact
     git checkout -b feature/integration-api
     ```

2. **`fix/`** - Pour les corrections de bugs
   - Quand utiliser : Lorsque vous corrigez un bug existant
   - Format : `fix/description-du-bug`
   - Exemples :
     ```bash
     git checkout -b fix/erreur-validation-email
     git checkout -b fix/correction-calcul-total
     git checkout -b fix/affichage-mobile
     ```

3. **`docs/`** - Pour la documentation
   - Quand utiliser : Lorsque vous modifiez ou ajoutez de la documentation
   - Format : `docs/description-modification`
   - Exemples :
     ```bash
     git checkout -b docs/guide-installation
     git checkout -b docs/api-endpoints
     ```

4. **`style/`** - Pour les modifications de style
   - Quand utiliser : Pour les changements qui n'affectent pas la logique (CSS, formatage, etc.)
   - Format : `style/description-changement`
   - Exemples :
     ```bash
     git checkout -b style/refonte-theme-principal
     git checkout -b style/responsive-design
     ```

### Workflow Détaillé pour les Stagiaires

1. **Toujours partir de develop à jour**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Créer votre branche avec le bon type**
   ```bash
   # Si vous ajoutez une nouvelle fonctionnalité
   git checkout -b feature/ma-nouvelle-fonctionnalite

   # Si vous corrigez un bug
   git checkout -b fix/correction-bug-specifique

   # Si vous mettez à jour la documentation
   git checkout -b docs/mise-a-jour-guide
   ```

3. **Travailler sur votre branche**
   - Faites vos modifications
   - Testez votre code
   - Committez régulièrement (voir section suivante)

4. **Maintenir votre branche à jour**
   ```bash
   # Mettre à jour develop
   git checkout develop
   git pull origin develop

   # Retourner sur votre branche
   git checkout feature/ma-nouvelle-fonctionnalite
   git merge develop

   # Résoudre les conflits s'il y en a
   ```

5. **Finaliser votre travail**
   ```bash
   # Vérifier que tous les fichiers sont ajoutés
   git status

   # Ajouter vos modifications
   git add .

   # Créer un commit descriptif
   git commit -m "feature: ajouter la validation du formulaire" -m "Implémentation de la validation côté client avec les règles suivantes:
   - Vérification du format email
   - Validation du mot de passe
   - Messages d'erreur personnalisés"

   # Pousser vos modifications
   git push origin feature/ma-nouvelle-fonctionnalite
   ```

6. **Créer une Pull Request**
   - Allez sur GitHub/GitLab
   - Créez une Pull Request vers `develop`
   - Attendez la revue de code
   - Appliquez les modifications demandées si nécessaire

## Convention de Nommage des Commits

Chaque commit doit suivre ce format :
```
<type>: <description courte>

<description détaillée des modifications>
```

### Types de Commits
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Modification de la documentation
- `style`: Changements de style (formatage, espaces, etc.)
- `refactor`: Refactorisation du code
- `test`: Ajout ou modification de tests
- `chore`: Tâches de maintenance

### Exemples de Bons Commits

```bash
# Pour une nouvelle fonctionnalité
git commit -m "feat: ajouter la validation des formulaires" -m "- Ajout de la validation email
- Vérification de la force du mot de passe
- Messages d'erreur en français
- Tests unitaires ajoutés"

# Pour une correction de bug
git commit -m "fix: corriger l'affichage sur mobile" -m "Le formulaire ne s'affichait pas correctement sur les écrans < 768px"

# Pour de la documentation
git commit -m "docs: mettre à jour le guide d'installation" -m "- Ajout des prérequis
- Clarification des étapes d'installation
- Ajout de captures d'écran"
```

## Outils de Qualité

Votre code sera automatiquement vérifié par :

- **Husky**: Hooks Git pour validation avant commit
  - Vérifie la qualité du code avant chaque commit
  - Vérifie le format de vos messages de commit

- **CommitLint**: Validation des messages de commit
  - S'assure que vos commits suivent la convention
  - Empêche les commits avec des messages incorrects

- **ESLint**: Linting du code
  - Vérifie la qualité du code
  - Détecte les erreurs potentielles

- **Prettier**: Formatage automatique du code
  - Formate votre code automatiquement
  - Assure une cohérence dans le style de code

## Installation

```bash
npm install
```

Les hooks Git et les outils de validation seront automatiquement installés.
