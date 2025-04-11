import { existsSync } from 'fs';
import { resolve } from 'path';
import dotenv from 'dotenv';

const envPath = resolve(process.cwd(), '.env.test');
console.log('CWD:', process.cwd());
console.log('.env.test exists:', existsSync(envPath));
dotenv.config({ path: envPath });

import { repositoriesService } from '../src/services/atlassianRepositoriesService.js';
import { writeFileSync } from 'fs';

// Debug: print env variable
console.log('ATLASSIAN_BITBUCKET_SERVER_URL:', process.env.ATLASSIAN_BITBUCKET_SERVER_URL);

async function main() {
  const data = await repositoriesService.listBranches('PRJ', 'git-repo');
  writeFileSync('src/services/__fixtures__/listBranches.json', JSON.stringify(data, null, 2));
  // eslint-disable-next-line no-console
  console.log('Fixture written to src/services/__fixtures__/listBranches.json');
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error('Error gathering branches fixture:', err);
  process.exit(1);
});
