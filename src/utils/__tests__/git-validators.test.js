const {
  validateBranchName,
  validatePRSize,
  validatePRTitle,
  BRANCH_PATTERNS,
  PR_SIZES
} = require('../git-validators');
const { describe, test, expect } = require('@jest/globals');

describe('Git Validators', () => {
  describe('validateBranchName', () => {
    test('valide une branche feature correcte', () => {
      const result = validateBranchName('develop/feature/auth-system');
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('feature');
    });

    test('valide une branche fix correcte', () => {
      const result = validateBranchName('develop/fix/login-error');
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('fix');
    });

    test('valide une branche hotfix correcte', () => {
      const result = validateBranchName('hotfix/security-patch');
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('hotfix');
    });

    test('valide une branche release correcte', () => {
      const result = validateBranchName('release/v1.2.0');
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('release');
    });

    test('rejette une branche mal formatée', () => {
      const result = validateBranchName('feature/wrong-format');
      expect(result.isValid).toBe(false);
    });

    test('rejette une branche avec caractères invalides', () => {
      const result = validateBranchName('develop/feature/INVALID_CHARS');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validatePRSize', () => {
    test('accepte une petite PR', () => {
      const result = validatePRSize(PR_SIZES.small - 1);
      expect(result.isValid).toBe(true);
      expect(result.size).toBe('small');
    });

    test('accepte une PR moyenne', () => {
      const result = validatePRSize(PR_SIZES.medium - 1);
      expect(result.isValid).toBe(true);
      expect(result.size).toBe('medium');
    });

    test('accepte une grande PR', () => {
      const result = validatePRSize(PR_SIZES.large - 1);
      expect(result.isValid).toBe(true);
      expect(result.size).toBe('large');
    });

    test('rejette une PR trop grande', () => {
      const result = validatePRSize(PR_SIZES.large + 1);
      expect(result.isValid).toBe(false);
      expect(result.size).toBe('too_large');
    });
  });

  describe('validatePRTitle', () => {
    test('accepte un titre de PR valide avec type', () => {
      const result = validatePRTitle('feat: implement user authentication');
      expect(result.isValid).toBe(true);
    });

    test('accepte un titre de PR valide avec scope', () => {
      const result = validatePRTitle('fix(auth): correct login validation');
      expect(result.isValid).toBe(true);
    });

    test('rejette un titre sans type', () => {
      const result = validatePRTitle('implement user authentication');
      expect(result.isValid).toBe(false);
    });

    test('rejette un titre trop long', () => {
      const result = validatePRTitle('feat: ' + 'a'.repeat(50));
      expect(result.isValid).toBe(false);
    });

    test('rejette un titre avec type invalide', () => {
      const result = validatePRTitle('invalid: some change');
      expect(result.isValid).toBe(false);
    });
  });
});
