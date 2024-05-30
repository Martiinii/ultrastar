"use server";

import { api } from "@ultrastar/libs";
export const handleButtonClick = async () => {
  const response = await api.songs({ id: 28992 }).download.get();
  console.log(response);
};
