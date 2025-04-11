import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

async function main() {
  const { repositoriesService } = await import('../src/services/atlassianRepositoriesService.js');
  const { writeFileSync } = await import('fs');

  const data = await repositoriesService.listRepositories('PRJ');
  writeFileSync('src/services/__fixtures__/listRepositories.json', JSON.stringify(data, null, 2));
  // eslint-disable-next-line no-console
  console.log('Fixture written to src/services/__fixtures__/listRepositories.json');
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error('Error gathering listRepositories fixture:', err);
  process.exit(1);
});
