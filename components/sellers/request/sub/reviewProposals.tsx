import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ProposalCard } from "../../../../modules/buyers/manage-service/proposalCard";
import ApiService from "../../../../services/ApiService";
import { getData, initialState, reducer } from "../../../../utils/paginationHelper";
import { Loading } from "../../../loading/loading";

const ReviewProposals = ({ id, style }: any) => {
  const [EndPage, setEndPage] = useState(1)
  const [{ queryPageIndex, queryPageSize }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const getData = async (page: number, fetchUrl: string) => {
    const res = await ApiService.getData({
      url: fetchUrl + `?&page=${page}&perPage=10&id=${id}`,
    });
    setEndPage(res?.total)
    return res
  }

  const { isLoading, error, data } = useQuery(
    ["Jobs", queryPageIndex, queryPageSize],
    () => getData(queryPageIndex, `proposal/fetch`),
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );

  if (isLoading) {
    return <Loading title="" />;
  }

  return (
    <div className="w-full min-h-[200px] bg-white mb-[20px] rounded-[20px]">
      <div className="">
        {
          data && data.data.map((ele:any, idx:number) => {
            return(
              <ProposalCard data={ele} key={idx} jobId={id} />
            )
          })
        }
      </div>
    </div>
  );
};

export default ReviewProposals;
