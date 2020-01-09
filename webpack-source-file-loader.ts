import webpack from 'webpack';
import path from 'path';
import loaderUtils from 'loader-utils';

function findEntry(mod: any): string {
  const firstReasonModule = mod?.reasons?.[0]?.module;
  if (firstReasonModule?.resource) {
    return findEntry(firstReasonModule)
  }
  const {context = '', resource = ''} = mod;
  return path.relative(context, resource);
}

type Options = {
  placeholder?: string
}

function throwError(message: string): never {
  throw new Error(message);
}

export default function webpackSourceFileLoader(this: webpack.loader.LoaderContext, source: string): string {
  const options = loaderUtils.getOptions(this) as Options
  const placeholder = options.placeholder ?? throwError('Option "placeholder" is required');

  const entryFileName = findEntry(this);
  if (source.includes(placeholder)) {
    return source.split(path.sep).map((line, i) => {
      return line.replace(placeholder, `${entryFileName}:${i + 1}`)
    }).join(path.sep);
  } else {
    return source;
  }
};
