import config from "@/config.json";

export const getSong = async (id: number) => {
  const response = await fetch(`${config.apiUrl}/?link=detail&id=${id}`);
  const html = await response.text();

  return html;
};
