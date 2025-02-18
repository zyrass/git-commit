/**
 * Générateur de template pour les Pull Requests
 */

class PRTemplateGenerator {
  /**
   * Génère le template de base d'une PR
   * @param {Object} options - Options de la PR
   * @returns {string} Template formaté en markdown
   */
  static generateTemplate({
    title,
    type = 'feature',
    description = '',
    tests = [],
    screenshots = [],
    tickets = []
  }) {
    return `# ${title}

## Description
${description}

## Type de changement
${this.generateTypeCheckboxes(type)}

## Impact des changements
<!-- Décrivez l'impact de vos changements sur l'application -->

## Tests effectués
${this.generateTestsList(tests)}

## Captures d'écran
${this.generateScreenshotsList(screenshots)}

## Tickets liés
${this.generateTicketsList(tickets)}

## Checklist avant review
- [ ] J'ai effectué une auto-review de mon code
- [ ] J'ai commenté mon code aux endroits complexes
- [ ] J'ai mis à jour la documentation
- [ ] J'ai ajouté des tests
- [ ] J'ai vérifié la couverture de code
- [ ] J'ai testé les cas limites
`;
  }

  /**
   * Génère les cases à cocher pour le type de PR
   * @param {string} selectedType - Type sélectionné
   * @returns {string} Liste de cases à cocher en markdown
   */
  static generateTypeCheckboxes(selectedType) {
    const types = [
      ['🚀 Nouvelle fonctionnalité', 'feature'],
      ['🐛 Correction de bug', 'bug'],
      ['📚 Documentation', 'docs'],
      ['🎨 Style', 'style'],
      ['♻️ Refactoring', 'refactor'],
      ['⚡ Performance', 'perf'],
      ['✅ Tests', 'test']
    ];

    return types
      .map(([label, type]) => `- [${type === selectedType ? 'x' : ' '}] ${label}`)
      .join('\n');
  }

  /**
   * Génère la liste des tests effectués
   * @param {string[]} tests - Liste des tests
   * @returns {string} Liste formatée en markdown
   */
  static generateTestsList(tests) {
    if (!tests.length) {
      return '- [ ] Tests unitaires\n- [ ] Tests d\'intégration\n- [ ] Tests manuels';
    }

    return tests.map(test => `- [x] ${test}`).join('\n');
  }

  /**
   * Génère la liste des captures d'écran
   * @param {string[]} screenshots - Liste des chemins des captures
   * @returns {string} Liste formatée en markdown
   */
  static generateScreenshotsList(screenshots) {
    if (!screenshots.length) {
      return '<!-- Si applicable, ajoutez des captures d\'écran -->';
    }

    return screenshots
      .map(screenshot => `![Screenshot](${screenshot})`)
      .join('\n\n');
  }

  /**
   * Génère la liste des tickets liés
   * @param {string[]} tickets - Liste des identifiants de tickets
   * @returns {string} Liste formatée en markdown
   */
  static generateTicketsList(tickets) {
    if (!tickets.length) {
      return '<!-- Référencez les tickets JIRA/GitHub liés -->';
    }

    return tickets
      .map(ticket => `- ${ticket}`)
      .join('\n');
  }
}

module.exports = PRTemplateGenerator;
