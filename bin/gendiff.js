#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../src/generateDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Calculates differences between 2 data structures. Accepts *.json and *.yaml files.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <char>', 'output format (plain, stylish, json, debug)')
  .parse()
  .action(() => {
    const [filepath1, filepath2] = program.args.slice(0, 2);
    const { format } = program.opts();
    console.log(getDiff(filepath1, filepath2, format));
  });

program.parse();
