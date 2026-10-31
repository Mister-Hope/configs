import { comment } from "./comments.js";
import type {
  BaseOptions,
  Config,
  IgnoresOptions,
  ImportOptions,
  LanguageOptions,
} from "./helpers.js";
import { ignores } from "./ignores.js";
import { js } from "./js.js";
import { jsImport } from "./jsImport.js";
import { prettier } from "./prettier.js";
import { ts, tsParser } from "./ts.js";
import { tsImport } from "./tsImport.js";
import { vitest } from "./vitest.js";
import type { WXAppOptions } from "./wxapp.js";
import { wxapp } from "./wxapp.js";

export interface HopeOptions {
  ignores?: IgnoresOptions;
  languageOptions?: LanguageOptions;

  /** @default true */
  comment?: BaseOptions;

  /** @default true */
  js?: BaseOptions;

  /** @default true */
  jsImport?: ImportOptions | boolean;

  /** @default true */
  ts?: BaseOptions;

  /** @default true */
  tsImport?: ImportOptions | boolean;

  /** @default true */
  prettier?: boolean;

  /** @default true */
  vitest?: BaseOptions;

  /** @default false */
  wxapp?: WXAppOptions | boolean;
}

const getOptions = <T>(
  option?: T,
): T extends boolean ? Record<string, never> : Exclude<T, boolean> =>
  (typeof option === "object" ? option : {}) as T extends boolean
    ? Record<string, never>
    : Exclude<T, boolean>;

export const hope = (
  { languageOptions = {}, ...options }: HopeOptions = {},
  ...extraConfigs: Config[]
): Config[] => {
  const hasProject = Object.hasOwn(languageOptions.parserOptions ?? {}, "project");

  const configs: Config[] = [
    ignores(options.ignores),
    ...(options.js === false ? [] : js(getOptions(options.js))),
    ...(options.jsImport === false ? [] : jsImport(getOptions(options.jsImport))),
    ...(options.ts === false ? [] : ts(getOptions(options.ts))),
    ...(options.tsImport === false ? [] : tsImport(getOptions(options.tsImport))),
    ...(options.vitest === false ? [] : vitest(getOptions(options.vitest))),
    ...(options.comment === false ? [] : comment(getOptions(options.comment))),
    ...(typeof options.wxapp === "object" || options.wxapp === true
      ? wxapp(typeof options.wxapp === "object" ? options.wxapp : {})
      : []),
    {
      languageOptions: {
        ...languageOptions,
        parserOptions: {
          ...(options.ts === false
            ? {}
            : {
                parser: tsParser,
                tsconfigDirName: import.meta.dirname,
                // enable projectService for typescript-eslint if project is not defined
                ...(hasProject ? {} : { projectService: true }),
              }),
          ...languageOptions.parserOptions,
        },
      },
    },
    ...extraConfigs,
    // prettier config shall come last
    ...(options.prettier === false ? [] : [prettier]),
  ];

  return configs;
};
