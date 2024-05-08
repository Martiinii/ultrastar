# UltraStar scrapper

This is a WIP project to build UltraStar songs scrapper from [probably the biggest song database](https://usdb.animux.de).
I've done a [similar project](https://github.com/Martiinii/UltraScrap-cli) in past but I've always had a bigger idea for it and I finally have time and desire to do so.

## Code structure

This project is using **bun** as package manager alongside **turborepo**.
Packages can be found in `/packages` directory with the most notable being `ultrastar-api`.

In future there will be **Next.js** app under `/apps`

## How to run this application?

First, let's start with creating an account on [usdb.animux.de](https://usdb.animux.de). Go ahead and register a new account and save the credentials into `.env` file.

Currently there is no easy way to run application as it is being actively developed.
You can however run library (and all other apps - _currently none_) with:

```sh
bun i && bun dev
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `@repo/tsconfig`: `tsconfig.json`s used throughout the monorepo
- `@repo/ultrastar-api`: Scrapper API to be used by web app

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```sh
bun build
```

### Develop

To develop all apps and packages, run the following command:

```sh
bun dev
```

Or to watch for changes:

```sh
bun watch
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```sh
cd ultrastar
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
