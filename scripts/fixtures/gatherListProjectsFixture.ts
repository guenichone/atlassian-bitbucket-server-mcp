import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

async function main() {
  const { projectsService } = await import('../src/services/atlassianProjectsService.js');
  const { writeFileSync } = await import('fs');

  const data = await projectsService.listProjects();
  writeFileSync('src/services/__fixtures__/listProjects.json', JSON.stringify(data, null, 2));
  // eslint-disable-next-line no-console
  console.log('Fixture written to src/services/__fixtures__/listProjects.json');
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error('Error gathering listProjects fixture:', err);
  process.exit(1);
});
