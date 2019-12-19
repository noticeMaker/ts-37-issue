# TypeScript 3.7+/Monorepo (Lerna) issue

TypeScript 3.7+ seems to have issues in a Lerna monorepo finding composite package references when there is a change.

In this example repo, there are two projects `@ts-37-issue/utilities` and `@ts-37-issues/server`.

`@ts-37-issue/utilities` is a typescript composite project. It exports a single function as the default export.
