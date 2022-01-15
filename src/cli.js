import { Command } from 'commander';

const cli = () => {
  const program = new Command();
  program
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .version('1.0.0', '-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format');
  program.parse();
};

export default cli;
