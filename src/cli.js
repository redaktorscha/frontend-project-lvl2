import { Command } from 'commander';

const cli = () => {
  const program = new Command();
  program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number');
  program.parse();
};

export default cli;
