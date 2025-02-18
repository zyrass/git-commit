#!/usr/bin/env node

const { program } = require('commander');
const GitWorkflow = require('./utils/git-workflow');
const PRTemplateGenerator = require('./utils/pr-template-generator');
const { validateBranchName } = require('./utils/git-validators');
const fs = require('fs');
const path = require('path');

program
  .version('1.0.0')
  .description('CLI pour la gestion du workflow Git');

// Commande pour créer une branche feature
program
  .command('feature <name>')
  .description('Crée une nouvelle branche feature')
  .action((name) => {
    try {
      GitWorkflow.createFeatureBranch(name);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  });

// Commande pour préparer une PR
program
  .command('prepare-pr <target>')
  .description('Prépare une Pull Request vers la branche cible (test ou main)')
  .option('-t, --title <title>', 'Titre de la PR')
  .option('-d, --description <description>', 'Description de la PR')
  .action((target, options) => {
    try {
      GitWorkflow.preparePullRequest(target);
      
      // Générer le template de PR
      const template = PRTemplateGenerator.generateTemplate({
        title: options.title || 'Titre de la PR',
        description: options.description || '',
        type: target === 'main' ? 'release' : 'feature'
      });

      // Sauvegarder le template
      const prDir = path.join(process.cwd(), '.github');
      if (!fs.existsSync(prDir)) {
        fs.mkdirSync(prDir, { recursive: true });
      }
      fs.writeFileSync(path.join(prDir, 'pull_request_template.md'), template);
      
      console.log('✅ Template de PR généré dans .github/pull_request_template.md');
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  });

// Commande pour vérifier l'état de la branche
program
  .command('status')
  .description('Vérifie l\'état de la branche courante')
  .action(() => {
    try {
      GitWorkflow.checkBranchStatus();
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  });

// Commande pour valider un nom de branche
program
  .command('validate-branch <name>')
  .description('Valide le nom d\'une branche')
  .action((name) => {
    const result = validateBranchName(name);
    if (result.isValid) {
      console.log(`✅ ${result.message}`);
    } else {
      console.error(`❌ ${result.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
