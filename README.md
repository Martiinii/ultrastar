# UltraStar karaoke song scrapper 🎤

This is a WIP project (that will receive total rewrite at some point in the future) -  UltraStar songs scrapper from [probably the biggest song database](https://usdb.animux.de).
I've done a [similar project](https://github.com/Martiinii/UltraScrap-cli) in past but I've always had a bigger idea for it and I finally have time and desire to do so.

![Screenshot_20250507_222426](https://github.com/user-attachments/assets/09bef9ca-7cb6-4a11-8dbc-ec3597c5669f)


## Download songs metadata with ease
Head over to http://localhost:3000/download and simply click the button to start seeding database

![Screenshot_20250507_222717](https://github.com/user-attachments/assets/09496862-f7db-475b-b43d-60e429e3876a)

## Let friends join the fun in 3 seconds!
1. Visit http://localhost:3000/connect to display the QR code
2. Friends scan with their phones
3. Instantly sync and download songs without setup hassle

![Screenshot_20250507_222819](https://github.com/user-attachments/assets/c9e9791e-2a33-48a6-8596-539d7e503e33)
![screencast](https://github.com/user-attachments/assets/e708d15d-0954-4683-b8b4-8cadfe81b169)


## Code structure

This project is using **bun** as package manager alongside **turborepo**.
I have developed this project using **bun@1.2.4**, but any version above **1.2.4** would do.
Packages can be found in `/packages` directory with the most notable being `ultrastar-api`.

## How to run this application?

Make sure you have [bun](https://bun.sh/) installed (min version `1.2.4`)

1. Let's start with creating an account on [usdb.animux.de](https://usdb.animux.de).
2. Create env file `cp apps/api/TEMPLATE.env apps/api/.env`
3. Go ahead and register a new account and save the credentials into `.env` file.
4. Make sure to install [yt-dlp](https://github.com/yt-dlp/yt-dlp/wiki/Installation). It is necessary for automatic video downloading.

Then you need to install dependencies with `bun i` and create database using `bun db:push`\
To build the app use: `bun run build` and then to start: `bun start`.

To run application in development mode use `bun dev` (not recommended for normal use).

## Why are there no songs?

For now, you have to downloads songs by yourself. In the future I will upload default database file, but it is over 200MB (mostly cover images).
To seed the database by yourself, start the application and head over to `http://localhost:3000/download` and click button to automatically download songs metadata.
This can take some time (depending on your network speed, CPU, etc. should take between 5 to 20 minutes)
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
