const PRTemplateGenerator = require('../pr-template-generator');
const { describe, test, expect } = require('@jest/globals');

describe('PR Template Generator', () => {
  describe('generateTemplate', () => {
    test('génère un template complet avec toutes les options', () => {
      const options = {
        title: 'Nouvelle fonctionnalité d\'authentification',
        type: 'feature',
        description: 'Implémentation de l\'authentification OAuth',
        tests: ['Tests unitaires auth', 'Tests d\'intégration OAuth'],
        screenshots: ['path/to/screenshot1.png'],
        tickets: ['JIRA-123', 'JIRA-124']
      };

      const template = PRTemplateGenerator.generateTemplate(options);
      
      expect(template).toContain(options.title);
      expect(template).toContain(options.description);
      expect(template).toContain('Tests unitaires auth');
      expect(template).toContain('JIRA-123');
      expect(template).toContain('![Screenshot]');
    });

    test('génère un template minimal avec options requises uniquement', () => {
      const options = {
        title: 'Fix bug login',
      };

      const template = PRTemplateGenerator.generateTemplate(options);
      
      expect(template).toContain(options.title);
      expect(template).toContain('<!-- Si applicable');
      expect(template).toContain('- [ ] Tests unitaires');
    });
  });

  describe('generateTypeCheckboxes', () => {
    test('coche le type sélectionné', () => {
      const result = PRTemplateGenerator.generateTypeCheckboxes('feature');
      expect(result).toContain('[x] 🚀 Nouvelle fonctionnalité');
      expect(result).toContain('[ ] 🐛 Correction de bug');
    });

    test('ne coche rien si type invalide', () => {
      const result = PRTemplateGenerator.generateTypeCheckboxes('invalid');
      expect(result).not.toContain('[x]');
    });
  });

  describe('generateTestsList', () => {
    test('génère la liste des tests fournis', () => {
      const tests = ['Test 1', 'Test 2'];
      const result = PRTemplateGenerator.generateTestsList(tests);
      expect(result).toContain('- [x] Test 1');
      expect(result).toContain('- [x] Test 2');
    });

    test('génère une liste vide par défaut', () => {
      const result = PRTemplateGenerator.generateTestsList([]);
      expect(result).toContain('- [ ] Tests unitaires');
      expect(result).toContain('- [ ] Tests d\'intégration');
    });
  });

  describe('generateScreenshotsList', () => {
    test('génère les liens markdown pour les screenshots', () => {
      const screenshots = ['img1.png', 'img2.png'];
      const result = PRTemplateGenerator.generateScreenshotsList(screenshots);
      expect(result).toContain('![Screenshot](img1.png)');
      expect(result).toContain('![Screenshot](img2.png)');
    });

    test('génère un commentaire si pas de screenshots', () => {
      const result = PRTemplateGenerator.generateScreenshotsList([]);
      expect(result).toContain('<!-- Si applicable');
    });
  });

  describe('generateTicketsList', () => {
    test('génère la liste des tickets', () => {
      const tickets = ['TICKET-1', 'TICKET-2'];
      const result = PRTemplateGenerator.generateTicketsList(tickets);
      expect(result).toContain('- TICKET-1');
      expect(result).toContain('- TICKET-2');
    });

    test('génère un commentaire si pas de tickets', () => {
      const result = PRTemplateGenerator.generateTicketsList([]);
      expect(result).toContain('<!-- Référencez');
    });
  });
});
