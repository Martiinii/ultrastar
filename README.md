# UltraStar scrapper

This is a WIP project to build UltraStar songs scrapper from [probably the biggest song database](https://usdb.animux.de).
I've done a [similar project](https://github.com/Martiinii/UltraScrap-cli) in past but I've always had a bigger idea for it and I finally have time and desire to do so.

## Code structure

This project is using **bun** as package manager alongside **turborepo**.
I have developed this project using **bun@1.1.10**, but any version above **1.1** should do.
Packages can be found in `/packages` directory with the most notable being `ultrastar-api`.

## How to run this application?

Make sure you have [bun](https://bun.sh/) installed (min version `1.2.4`)

Let's start with creating an account on [usdb.animux.de](https://usdb.animux.de).
Create env file `cp apps/api/TEMPLATE.env apps/api/.env`
Go ahead and register a new account and save the credentials into `.env` file.
Make sure to install [yt-dlp](https://github.com/yt-dlp/yt-dlp/wiki/Installation). It is necessary for automatic video downloading.

Then you need to install dependencies with `bun i` and create database using `bun db:push`

Then you can run this application in development mode using `bun dev` (not recommended for production use).
Building and starting app:
`bun run build` and then to start: `bun start`.


## Why are there no songs?

For now, you have to downloads songs by yourself. In the future I will upload default database file, but it is over 200MB (mostly cover images).
To seed the database by yourself, start the application and head over to `http://localhost:3001/api/swagger`.
Once there, head over to **Sync** and choose `/api/sync/download{page?}`. In the table under variables set page value to `1` and click **Test Request**, then press **Send** Button.
It will cause to download every song (over 27000!). It will take several minutes depending on your machine and internet connection (it took ~20 minutes for me).

> [!IMPORTANT]
> Swagger will return timeout after 10 seconds, but it doesn't mean it isn't downloading! Once every song is downloaded, Elysia will output `🔥 Download complete` to console.

After that step is complete, head over to main page and enjoy your songs.

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

## Additional info

If you head over to `http://localhost:3000/connect` a QR code will be displayed. Show it to your friends to they can downloads songs from phones.
