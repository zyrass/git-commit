/**
 * Utilitaires de validation pour les conventions Git
 */

const BRANCH_PATTERNS = {
  feature: /^develop\/feature\/[a-z0-9-]+$/,
  fix: /^develop\/fix\/[a-z0-9-]+$/,
  hotfix: /^hotfix\/[a-z0-9-]+$/,
  release: /^release\/v\d+\.\d+\.\d+$/
};

const PR_SIZES = {
  small: 200,
  medium: 400,
  large: 800
};

/**
 * Valide le nom d'une branche selon les conventions
 * @param {string} branchName - Nom de la branche à valider
 * @returns {Object} Résultat de la validation
 */
function validateBranchName(branchName) {
  for (const [type, pattern] of Object.entries(BRANCH_PATTERNS)) {
    if (pattern.test(branchName)) {
      return {
        isValid: true,
        type,
        message: `Branche valide de type: ${type}`
      };
    }
  }

  return {
    isValid: false,
    message: 'Le nom de la branche ne respecte pas les conventions'
  };
}

/**
 * Valide la taille d'une PR
 * @param {number} changedLines - Nombre de lignes modifiées
 * @returns {Object} Résultat de la validation
 */
function validatePRSize(changedLines) {
  let size;
  if (changedLines <= PR_SIZES.small) size = 'small';
  else if (changedLines <= PR_SIZES.medium) size = 'medium';
  else if (changedLines <= PR_SIZES.large) size = 'large';
  else size = 'too_large';

  return {
    isValid: changedLines <= PR_SIZES.large,
    size,
    message: size === 'too_large' 
      ? `PR trop grande (${changedLines} lignes > ${PR_SIZES.large})`
      : `PR de taille ${size} (${changedLines} lignes)`
  };
}

/**
 * Valide le titre d'une PR selon les conventions
 * @param {string} title - Titre de la PR
 * @returns {Object} Résultat de la validation
 */
function validatePRTitle(title) {
  const pattern = /^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?: .{1,50}$/;
  
  return {
    isValid: pattern.test(title),
    message: pattern.test(title)
      ? 'Titre de PR valide'
      : 'Le titre doit suivre le format: type(scope): description'
  };
}

module.exports = {
  validateBranchName,
  validatePRSize,
  validatePRTitle,
  BRANCH_PATTERNS,
  PR_SIZES
};
