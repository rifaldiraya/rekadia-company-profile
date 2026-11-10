const { copyFile } = require('./utils.cjs');
const { join } = require('path');
const process = require('process');

const ENV_FILE = join(process.cwd(), '.env.staging')
const TARGET_FILE = join(process.cwd(), '.env.local')

copyFile(ENV_FILE, TARGET_FILE)