"use client";

import { handleButtonClick } from "./actions";

export default function Home() {
  return (
    <main>
      <button
        onClick={() => {
          handleButtonClick();
        }}
      >
        Click me!
      </button>
    </main>
  );
}
