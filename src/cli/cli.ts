#!/usr/bin/env node

import { program } from 'commander'
import { startJsxonServer } from './start-jsxon-server'

program
  .name('jsxon')
  .description('Generate a JSON describing an UI by writing JSX')
  .argument('<folder>', 'Folder containing the JSX files')
  .option('-bc, --babel-config <path>', 'Path to the Babel configuration file')
  .action(async (entryFolder, options) => {
    startJsxonServer(entryFolder, options)
  })
  .allowExcessArguments(false)
  .allowUnknownOption(false)
  .helpOption(true)
  .showHelpAfterError()

program.parse()
