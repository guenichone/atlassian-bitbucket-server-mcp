import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import { projectsService } from '../../src/services/atlassianProjectsService';
import { writeFileSync } from 'fs';

async function main() {
	const data = await projectsService.listProjects();
	writeFileSync('src/services/__fixtures__/listProjects.json', JSON.stringify(data, null, 2));
	 
	console.log('Fixture written to src/services/__fixtures__/listProjects.json');
}

main().catch(err => {
	 
	console.error('Error gathering listProjects fixture:', err);
	process.exit(1);
});
