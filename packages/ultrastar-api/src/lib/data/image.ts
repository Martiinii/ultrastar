import config from "../../config.json";

export const getCoverImage = async (id: number) => {
  const url = `${config.apiUrl}/data/cover/${id}.jpg`;
  const response = await fetch(url);
  if (!response.ok) return null;

  const data = await response.arrayBuffer();
  return new Uint8Array(data);
};
