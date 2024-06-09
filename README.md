# UltraStar scrapper

This is a WIP project to build UltraStar songs scrapper from [probably the biggest song database](https://usdb.animux.de).
I've done a [similar project](https://github.com/Martiinii/UltraScrap-cli) in past but I've always had a bigger idea for it and I finally have time and desire to do so.

## Code structure

This project is using **bun** as package manager alongside **turborepo**.
I have developed this project using **bun@1.1.10**, but any version above **1.1** should do.
Packages can be found in `/packages` directory with the most notable being `ultrastar-api`.

## How to run this application?

First, let's start with creating an account on [usdb.animux.de](https://usdb.animux.de). Go ahead and register a new account and save the credentials into `.env` file.
Make sure to install [yt-dlp](https://github.com/yt-dlp/yt-dlp/wiki/Installation). It is necessary for automatic video downloading.

Then you need to install dependencies with `bun i` and create database using `bun db:push`

Then you can run this application in development mode using `bun dev`.

> [!CAUTION]
> I've had several issues with bun, turbo and Next.js causing memory leaks. It is caused probably because Node.js is used to run the dev server (app router currently relies on Node.js APIs that Bun does not yet implement). To circumvent this issue, you can run api using `bun dev -- filter @ultrastar/api` and web app using `cd apps/web && bun dev`.

```sh
bun i && bun dev
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

Apps:

- `@ultrastar/api`: Backend API server using Elysia.js;
- `@ultrastar/web`: Next.js application for frontend;

  Packages:

- `@ultrastar/libs`: Shared libraries like Elysia's Eden connector;
- `@ultrastar/ts-config`: `tsconfig.json`s used throughout the monorepo;
- `@ultrastar/types`: Custom types used throughout the project like pieces of [TS Reset](https://github.com/total-typescript/ts-reset) or API types;
- `@ultrastar/ui`: UI design system using [shadcn/ui](https://github.com/shadcn/ui/);
- `@ultrastar/ultrastar-api`: Scrapper API;
- `@ultrastar/youtube-api`: Youtube API for downloading and searching videos;

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/) (besides some configs, to be fixed).

### Build

To build all apps and packages, run the following command:

```sh
bun build
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
