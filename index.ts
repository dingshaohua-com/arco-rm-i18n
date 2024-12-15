/* eslint-disable */
// @ts-nocheck
import { spawnSync } from 'node:child_process';
import { getFilesPath } from './locale-path';
import { start } from './start-remove';
import fs from 'node:fs';
import path from 'node:path';

const { filesPath, localeDirsPath } = getFilesPath();
filesPath.forEach((file) => {
    start(file);
});

localeDirsPath.forEach((localeDir) => {
    fs.rmSync(localeDir, { recursive: true, force: true });
});

spawnSync('npx ', [`prettier --write "${ path.resolve()}/src/**/*.{js,ts,vue,html,css,json}"`], {
  stdio: 'inherit',
  shell: true,
});
