import ApiService from "../services/ApiService";

export const getTotalSpent = async (id: number) => {
    var result = 0;
    const res = await ApiService.getData({url : `/reviews/findAll?&userId=${id}`})
    console.log(res)
    return result;
}