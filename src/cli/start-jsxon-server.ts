import createFastify from 'fastify';
import fs from 'node:fs';
import path from 'node:path';
import createJiti from 'jiti';
import * as babel from '@babel/core';

const jiti = createJiti(__filename);

const DEFAULT_PORT = 3000;
const DEFAULT_BABEL_CONFIGS = ['./babel.config.json', './babel.config.js', './.babelrc', './.babelrc.js'];

export const startJsxonServer = async (
  entryFolder: string,
  options: {
    babelConfig?: string
    port?: number
  },
) => {
  const port = options.port ?? DEFAULT_PORT;
  const babelConfig = options.babelConfig ? path.resolve(options.babelConfig)
    : findBabelConfig(process.cwd());

  const server = createFastify();
  registerFolder(server, path.resolve(entryFolder), {
    babelConfig,
  });

  await server.listen({
    port,
  });

  console.log(`Server running at http://localhost:${port}`);
};

const registerFolder = (
  server: ReturnType<typeof createFastify>,
  folder: string,
  options: {
    babelConfig?: string
  },
) => {
  for (const file of fs.readdirSync(folder)) {
    const filePath = path.join(folder, file);
    if (fs.statSync(filePath).isDirectory()) {
      registerFolder(server, filePath, options);
    } else {
      registerFile(server, filePath, options);
    }
  }
};

const registerFile = (
  server: ReturnType<typeof createFastify>,
  filePath: string,
  options: {
    babelConfig?: string
  },
) => {
  const route = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

  const transformedCode = !options.babelConfig ? fs.readFileSync(filePath, 'utf-8')
    : babel.transformFileSync(filePath, {
      configFile: options.babelConfig,
    })?.code;

  if (!transformedCode) {
    console.warn(`Failed to transform ${filePath}`);
    return;
  }
  
  const output = (jiti.evalModule(transformedCode, {
    ext: path.extname(filePath),
    id: filePath,
    filename: filePath,
  }) as { default: unknown })?.default;
  const getOutput = async () => {
    const result = typeof output === 'function' ? await output() : output;
    result._isJSXon = true;
    return result;
  }

  server.get(prefixBySlash(route), async () => {
    return getOutput();
  });

  console.log(`Registered ${prefixBySlash(route)}`);
}

const findBabelConfig = (folder: string): string | undefined => {
  for (const config of DEFAULT_BABEL_CONFIGS) {
    const configPath = path.join(folder, config);
    if (fs.existsSync(config)) {
      return configPath;
    }
  }
}

const prefixBySlash = (str: string) => {
  return str.startsWith('/') ? str : `/${str}`;
}
