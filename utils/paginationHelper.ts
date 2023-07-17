import ApiService from "../services/ApiService";

export const getData = async (page: number, fetchurl : string) => {
  // const res = await fetch(
  //   `https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=5`
  // );
  const res = await ApiService.getData({
    url : fetchurl + `?&page=${page}&perpage=10`
  });
  return res;
};
export const initialState = {
  queryPageIndex: 1,
  queryPageSize: 10,
  totalCount: null,
};

interface TableProps {
  type: string;
  payload: number;
}

export const PAGE_CHANGED = "PAGE_CHANGED";
export const PAGE_SIZE_CHANGED = "PAGE_SIZE_CHANGED";
export const TOTAL_COUNT_CHANGED = "TOTAL_COUNT_CHANGED";

export const reducer = (state: any, { type, payload }: TableProps) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      };
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export default {
  getData,
  initialState,
  PAGE_CHANGED,
  PAGE_SIZE_CHANGED,
  TOTAL_COUNT_CHANGED,
  reducer,
};
