/**
 * Utilitaires pour la gestion du workflow Git
 */

const { execSync } = require('child_process');
const { validateBranchName, validatePRSize } = require('./git-validators');

class GitWorkflow {
  /**
   * Crée une nouvelle branche feature
   * @param {string} featureName - Nom de la feature
   */
  static createFeatureBranch(featureName) {
    const branchName = `develop/feature/${featureName}`;
    const validation = validateBranchName(branchName);
    
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    try {
      // Vérifier qu'on est sur develop
      const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      if (currentBranch !== 'develop') {
        throw new Error('Vous devez être sur la branche develop');
      }

      // Mettre à jour develop
      execSync('git pull origin develop');

      // Créer la nouvelle branche
      execSync(`git checkout -b ${branchName}`);
      
      console.log(`✅ Branche ${branchName} créée avec succès`);
    } catch (error) {
      console.error('❌ Erreur lors de la création de la branche:', error.message);
      throw error;
    }
  }

  /**
   * Prépare une Pull Request
   * @param {string} targetBranch - Branche cible (test ou main)
   */
  static preparePullRequest(targetBranch) {
    if (!['test', 'main'].includes(targetBranch)) {
      throw new Error('La branche cible doit être test ou main');
    }

    try {
      // Vérifier les modifications
      const diffStats = execSync('git diff --stat develop').toString();
      const changedLines = diffStats.split('\n').reduce((acc, line) => {
        const matches = line.match(/(\d+) insertion.+?(\d+) deletion/);
        if (matches) {
          return acc + parseInt(matches[1]) + parseInt(matches[2]);
        }
        return acc;
      }, 0);

      // Valider la taille de la PR
      const sizeValidation = validatePRSize(changedLines);
      if (!sizeValidation.isValid) {
        throw new Error(sizeValidation.message);
      }

      // Vérifier les conflits potentiels
      execSync(`git fetch origin ${targetBranch}`);
      const mergeBase = execSync(`git merge-base HEAD origin/${targetBranch}`).toString().trim();
      const conflicts = execSync(`git diff --name-only --diff-filter=U ${mergeBase}`).toString();
      
      if (conflicts) {
        throw new Error(`Conflits détectés avec ${targetBranch}. Résolvez-les avant de créer la PR.`);
      }

      console.log(`✅ PR prête pour ${targetBranch}`);
      console.log(sizeValidation.message);
    } catch (error) {
      console.error('❌ Erreur lors de la préparation de la PR:', error.message);
      throw error;
    }
  }

  /**
   * Vérifie l'état de la branche courante
   */
  static checkBranchStatus() {
    try {
      // Vérifier les fichiers modifiés
      const status = execSync('git status --porcelain').toString();
      if (status) {
        console.warn('⚠️ Vous avez des modifications non commitées');
      }

      // Vérifier si la branche est à jour
      execSync('git fetch origin');
      const behindCount = execSync('git rev-list HEAD..origin/develop --count').toString().trim();
      if (parseInt(behindCount) > 0) {
        console.warn(`⚠️ Votre branche est en retard de ${behindCount} commits par rapport à develop`);
      }

      // Vérifier les tests
      try {
        execSync('npm test', { stdio: 'pipe' });
        console.log('✅ Tous les tests passent');
      } catch (error) {
        console.error('❌ Certains tests échouent');
      }

      // Vérifier le linting
      try {
        execSync('npm run lint', { stdio: 'pipe' });
        console.log('✅ Le code respecte les standards');
      } catch (error) {
        console.error('❌ Problèmes de linting détectés');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la vérification:', error.message);
      throw error;
    }
  }
}

module.exports = GitWorkflow;
