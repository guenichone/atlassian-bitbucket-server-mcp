import * as dotenv from 'dotenv';
const dotenvResult = dotenv.config({ path: '.env.test' });

console.log('CWD:', process.cwd());
console.log('dotenv.config() result:', dotenvResult);
console.log('ATLASSIAN_BITBUCKET_SERVER_URL:', process.env.ATLASSIAN_BITBUCKET_SERVER_URL);

async function main() {
  const { writeFileSync } = await import('fs');
  const { repositoriesService } = await import('../src/services/atlassianRepositoriesService.js');

  const data = await repositoriesService.getDefaultBranch('PRJ', 'git-repo');
  writeFileSync('src/services/__fixtures__/getDefaultBranch.json', JSON.stringify(data, null, 2));
  // eslint-disable-next-line no-console
  console.log('Fixture written to src/services/__fixtures__/getDefaultBranch.json');
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error('Error gathering default branch fixture:', err);
  process.exit(1);
});
