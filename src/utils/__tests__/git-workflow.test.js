const GitWorkflow = require('../git-workflow');
const { execSync } = require('child_process');
const { describe, test, expect, beforeEach } = require('@jest/globals');
const jest = require('jest');

// Mock de child_process.execSync
jest.mock('child_process', () => ({
  execSync: jest.fn()
}));

describe('Git Workflow', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
  });

  describe('createFeatureBranch', () => {
    test('crée une branche feature valide', () => {
      // Mock des commandes git
      execSync
        .mockReturnValueOnce(Buffer.from('develop')) // git rev-parse
        .mockReturnValueOnce(Buffer.from('')); // git pull

      GitWorkflow.createFeatureBranch('auth-feature');

      // Vérifie que les bonnes commandes git ont été appelées
      expect(execSync).toHaveBeenCalledWith('git rev-parse --abbrev-ref HEAD');
      expect(execSync).toHaveBeenCalledWith('git pull origin develop');
      expect(execSync).toHaveBeenCalledWith('git checkout -b develop/feature/auth-feature');
    });

    test('échoue si pas sur develop', () => {
      execSync.mockReturnValueOnce(Buffer.from('main'));

      expect(() => {
        GitWorkflow.createFeatureBranch('auth-feature');
      }).toThrow('Vous devez être sur la branche develop');
    });

    test('échoue si nom de branche invalide', () => {
      expect(() => {
        GitWorkflow.createFeatureBranch('INVALID_NAME');
      }).toThrow();
    });
  });

  describe('preparePullRequest', () => {
    test('prépare une PR valide vers test', () => {
      execSync
        .mockReturnValueOnce(Buffer.from('10 files changed, 100 insertions(+), 50 deletions(-)'))
        .mockReturnValueOnce(Buffer.from(''))
        .mockReturnValueOnce(Buffer.from('abc123'))
        .mockReturnValueOnce(Buffer.from(''));

      GitWorkflow.preparePullRequest('test');

      expect(execSync).toHaveBeenCalledWith('git diff --stat develop');
      expect(execSync).toHaveBeenCalledWith('git fetch origin test');
    });

    test('échoue si PR trop grande', () => {
      execSync.mockReturnValueOnce(Buffer.from('10 files changed, 1000 insertions(+), 500 deletions(-)'));

      expect(() => {
        GitWorkflow.preparePullRequest('test');
      }).toThrow(/PR trop grande/);
    });

    test('échoue si conflits détectés', () => {
      execSync
        .mockReturnValueOnce(Buffer.from('10 files changed, 100 insertions(+), 50 deletions(-)'))
        .mockReturnValueOnce(Buffer.from(''))
        .mockReturnValueOnce(Buffer.from('abc123'))
        .mockReturnValueOnce(Buffer.from('file1.js\nfile2.js'));

      expect(() => {
        GitWorkflow.preparePullRequest('test');
      }).toThrow(/Conflits détectés/);
    });
  });

  describe('checkBranchStatus', () => {
    test('vérifie une branche propre et à jour', () => {
      execSync
        .mockReturnValueOnce(Buffer.from('')) // git status
        .mockReturnValueOnce(Buffer.from('')) // git fetch
        .mockReturnValueOnce(Buffer.from('0')) // git rev-list
        .mockReturnValueOnce(Buffer.from('')) // npm test
        .mockReturnValueOnce(Buffer.from('')); // npm run lint

      GitWorkflow.checkBranchStatus();

      expect(execSync).toHaveBeenCalledWith('git status --porcelain');
      expect(execSync).toHaveBeenCalledWith('git fetch origin');
      expect(execSync).toHaveBeenCalledWith('git rev-list HEAD..origin/develop --count');
    });

    test('détecte les modifications non commitées', () => {
      execSync
        .mockReturnValueOnce(Buffer.from('M file1.js')) // git status
        .mockReturnValueOnce(Buffer.from('')) // git fetch
        .mockReturnValueOnce(Buffer.from('0')); // git rev-list

      const consoleSpy = jest.spyOn(console, 'warn');
      
      GitWorkflow.checkBranchStatus();

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('modifications non commitées'));
    });

    test('détecte une branche en retard', () => {
      execSync
        .mockReturnValueOnce(Buffer.from('')) // git status
        .mockReturnValueOnce(Buffer.from('')) // git fetch
        .mockReturnValueOnce(Buffer.from('5')); // git rev-list

      const consoleSpy = jest.spyOn(console, 'warn');
      
      GitWorkflow.checkBranchStatus();

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('en retard de 5 commits'));
    });
  });
});
