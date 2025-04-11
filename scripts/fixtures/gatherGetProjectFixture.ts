import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

async function main() {
  const { projectsService } = await import('../src/services/atlassianProjectsService.js');
  const { writeFileSync } = await import('fs');

  const data = await projectsService.getProject('PRJ');
  writeFileSync('src/services/__fixtures__/getProject.json', JSON.stringify(data, null, 2));
  // eslint-disable-next-line no-console
  console.log('Fixture written to src/services/__fixtures__/getProject.json');
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error('Error gathering getProject fixture:', err);
  process.exit(1);
});
