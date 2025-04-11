import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

async function main() {
  const { repositoriesService } = await import('../src/services/atlassianRepositoriesService.js');
  const { writeFileSync } = await import('fs');

  const data = await repositoriesService.listFiles('PRJ', 'git-repo');
  writeFileSync('src/services/__fixtures__/listFiles.json', JSON.stringify(data, null, 2));
  // eslint-disable-next-line no-console
  console.log('Fixture written to src/services/__fixtures__/listFiles.json');
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error('Error gathering files fixture:', err);
  process.exit(1);
});
