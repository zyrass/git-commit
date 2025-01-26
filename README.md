# Guide des Bonnes Pratiques Git

Ce projet démontre les meilleures pratiques pour la gestion des branches et des commits dans un projet professionnel.

## Table des Matières

1. [Structure des Branches](#structure-des-branches)
2. [Convention de Nommage des Commits](#convention-de-nommage-des-commits)
3. [Workflow Détaillé](#workflow-détaillé-pour-les-stagiaires)
4. [Bonnes Pratiques Quotidiennes](#bonnes-pratiques-quotidiennes)
5. [Résolution des Problèmes Courants](#résolution-des-problèmes-courants)
6. [Outils de Qualité](#outils-de-qualité)
7. [Installation](#installation)
8. [Astuces Git Utiles](#astuces-git-utiles)

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

## Bonnes Pratiques Quotidiennes

### 1. Fréquence des Commits

✅ **À faire** :
- Commiter fréquemment (idéalement toutes les 1-2 heures de travail)
- Un commit = une modification logique
- Tester votre code avant de commiter

❌ **À éviter** :
- Un seul gros commit en fin de journée
- Plusieurs fonctionnalités dans un seul commit
- Commiter du code non testé

### 2. Messages de Commit

✅ **Bons exemples** :
```bash
# Spécifique et descriptif
git commit -m "feat: ajouter la validation email" -m "- Regex pour format email
- Messages d'erreur personnalisés
- Tests unitaires"

# Correction de bug avec référence
git commit -m "fix: corriger #123 - erreur d'authentification" -m "- Correction du token expiré
- Ajout de la gestion des erreurs"
```

❌ **Mauvais exemples** :
```bash
# Trop vague
git commit -m "fix: corrections"

# Pas de type
git commit -m "ajout de fonctionnalités"

# Message non informatif
git commit -m "feat: mise à jour"
```

### 3. Gestion des Branches

✅ **Bonnes pratiques** :
- Une branche = une fonctionnalité/correction
- Branches courtes (max 1-2 jours de travail)
- Merger régulièrement `develop` dans votre branche

❌ **À éviter** :
- Branches longues durées
- Plusieurs fonctionnalités dans une branche
- Oublier de mettre à jour depuis `develop`

### 4. Pull Requests

✅ **À faire** :
- Titre clair suivant la convention des commits
- Description détaillée des modifications
- Screenshots pour les changements visuels
- Répondre aux commentaires de review

Exemple de bonne PR :
```markdown
Title: feat: implémentation de la page de profil utilisateur

Description:
- Ajout du formulaire de modification de profil
- Upload d'avatar avec preview
- Validation des champs
- Tests unitaires

Screenshots:
[Image du formulaire]
[Image du preview d'avatar]

Tests effectués:
- ✅ Validation des champs
- ✅ Upload d'images
- ✅ Responsive design
- ✅ Tests unitaires passent
```

## Résolution des Problèmes Courants

### 1. Erreur de Commit

**Problème** : Message de commit rejeté
```bash
error: commit validation failed
```

**Solution** :
```bash
# Modifier le dernier commit
git commit --amend -m "feat: description correcte" -m "description détaillée"

# Ou annuler le commit pour recommencer
git reset --soft HEAD^
```

### 2. Conflits avec Develop

**Problème** : Conflits lors du merge avec develop

**Solution** :
```bash
# 1. Sauvegarder votre travail en cours
git stash

# 2. Mettre à jour develop
git checkout develop
git pull origin develop

# 3. Retourner sur votre branche
git checkout feature/ma-feature
git merge develop

# 4. Résoudre les conflits dans votre éditeur
# Les conflits ressemblent à :
<<<<<<< HEAD
votre code
=======
code de develop
>>>>>>> develop

# 5. Après résolution
git add .
git commit -m "chore: résolution des conflits avec develop"

# 6. Récupérer votre travail
git stash pop
```

### 3. Erreurs de Lint/Format

**Problème** : Le hook pre-commit échoue

**Solution** :
```bash
# 1. Lancer ESLint
npm run lint

# 2. Formater le code
npm run format

# 3. Vérifier les erreurs restantes
npm run lint

# 4. Corriger manuellement les erreurs
# 5. Réessayer le commit
```

### 4. Mauvaise Branche

**Problème** : Travail commencé sur la mauvaise branche

**Solution** :
```bash
# 1. Sauvegarder les modifications
git stash

# 2. Créer la bonne branche depuis develop
git checkout develop
git checkout -b feature/bonne-branche

# 3. Appliquer les modifications
git stash pop
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

## Astuces Git Utiles

### 1. Voir l'Histoire

```bash
# Voir l'historique simple
git log --oneline

# Voir l'historique avec les branches
git log --graph --oneline --all

# Voir les modifications d'un fichier
git log -p filename
```

### 2. Comparer des Branches

```bash
# Voir les différences avec develop
git diff develop

# Voir les fichiers modifiés
git diff --name-status develop
```

### 3. Nettoyer son Espace de Travail

```bash
# Voir les fichiers non suivis
git clean -n

# Supprimer les fichiers non suivis
git clean -f

# Supprimer les branches mergées
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

### 4. Commandes Git Utiles au Quotidien

```bash
# Voir l'état de vos fichiers
git status

# Annuler les modifications d'un fichier
git checkout -- filename

# Voir qui a modifié chaque ligne d'un fichier
git blame filename

# Rechercher dans l'historique
git log -S "terme-recherché"

# Sauvegarder temporairement des modifications
git stash save "description des modifications"
git stash list
git stash pop

# Voir les branches distantes
git remote -v
git branch -r

# Nettoyer les branches locales supprimées en remote
git remote prune origin
```

## Rappels Importants

### Points Clés à Retenir

1. **Toujours** partir d'une branche `develop` à jour
2. **Jamais** de commit direct sur `main` ou `develop`
3. **Un commit = une modification logique**
4. **Toujours** tester avant de commiter
5. **Régulièrement** merger `develop` dans votre branche

### Cycle de Travail Typique

1. 🔄 Mise à jour de develop
2. 🌿 Création de votre branche
3. 💻 Développement et tests
4. 📝 Commits réguliers
5. 🔄 Merge de develop régulier
6. 📤 Push et création de PR
7. 👀 Review et corrections
8. 🎉 Merge dans develop

## Support et Aide

Si vous rencontrez des difficultés :

1. Consultez ce guide
2. Utilisez `git --help` ou `git commande --help`
3. Demandez à votre mentor
4. Consultez la [documentation Git officielle](https://git-scm.com/doc)

N'oubliez pas : il est normal de faire des erreurs au début. L'important est d'apprendre et de s'améliorer progressivement.
