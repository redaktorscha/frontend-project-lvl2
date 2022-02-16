#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((path1, path2) => {
    const formatter = program.opts().format;
    console.log(genDiff(path1, path2, formatter));
  });
program.parse();

const userArgs = process.argv.slice(2);
genDiff(...userArgs);
