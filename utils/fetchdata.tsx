import ApiService from "../services/ApiService";

export const fetchData = async (url: string) => {
  try {
    return await ApiService.getData({ url });
  } catch (e) {
    throw new Error(`API error:${e}`);
  }
};
