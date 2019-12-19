# TypeScript 3.7 Issue in Lerna Monorepo using Yarn Workspaces

TypeScript 3.7+ seems to have issues in a Lerna monorepo using yarn workspaces. TypeScript 3.6.4 does not exhibit the same problem.

(In fact, simply switching all references to typescript in the various package.json files to `"3.6.4"` without a preceding `^`, running `yarn` again, and reloading the Visual Studio Code editor window (`CTRL+SHIFT+P > Reload Window`) fixes the issue).

It is assumed you have a global install of `yarn`, such that you can install this project from the repository root using yarn and not npm, (just in case that somehow matters to this bug).

#### Setup

In this example repo, there are two projects `@issue/utilities` and `@issues/server`.

`@issue/utilities` is a typescript composite library. For the purpose of keeping it simple, this project exports a single default function - but I experienced this issue in a signficantly larger project with named exports.

`@issue/server` is a node application that invokes the function exported in `@issue/utilities`.

There are several scripts you can run at the root when testing which will save a great deal of time

- `yarn build`: Instructs typescript to build the projects.
- `yarn clean`: Instructs every project to delete their build outputs and `tsconfig.tsbuildinfo`
- `yarn rebuild`: Runs `clean` and then `build`
- `yarn start`: Runs `build` and then starts the output of `@issue/server`

In general, both in TypeScript 3.6.4 and TypeScript 3.7.3, the code will transpile and afterwards, run identically.

The issue is in the editing experience. If you build and then open the file `packages/server/src/index.ts` in VS Code, typescript loads and hovering over the `run` function will show that intellisense has an understanding of the exported function from `@issue/utilities`.

Now simply add a blank line at the end of the file - TypeScript will suddenly not understand the import of `@issue/utilities` (the import will have squiggly red lines under it and the type will be unknown) until I again reload the window making editing a painful experience. I experienced this in both Visual Studio Code 1.4.1.0 and Visual Studio 2019 16.4.2 almost identically.

I upgraded the two package.json to use typescript 3.8 daily build and got the same error. I downgrade them to use typescript 3.6.4 and the issue goes away.
