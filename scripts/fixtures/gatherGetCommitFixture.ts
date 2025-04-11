import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

async function main() {
  const { repositoriesService } = await import('../src/services/atlassianRepositoriesService.js');
  const { writeFileSync } = await import('fs');

  const data = await repositoriesService.getCommit('PRJ', 'git-repo', '12345679e4240c758669d14db6aad117e72d');
  writeFileSync('src/services/__fixtures__/getCommit.json', JSON.stringify(data, null, 2));
  // eslint-disable-next-line no-console
  console.log('Fixture written to src/services/__fixtures__/getCommit.json');
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error('Error gathering getCommit fixture:', err);
  process.exit(1);
});
