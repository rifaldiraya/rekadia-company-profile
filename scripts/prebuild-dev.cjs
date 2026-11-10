const { copyFile } = require('./utils.cjs');
const { join } = require('path');
const process = require('process');

const ENV_FILE = join(process.cwd(), '.env.development')
const TARGET_FILE = join(process.cwd(), '.env.local')

copyFile(ENV_FILE, TARGET_FILE)