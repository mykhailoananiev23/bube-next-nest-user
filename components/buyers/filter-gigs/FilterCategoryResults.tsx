import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { GigCard } from "../../../modules/buyers/GigCard";
import ApiService from "../../../services/ApiService";

export const FilterCategoryResults = ({ className }: any) => {
  const [favorGigs, setFavorGigs] = useState<any>([]);
  const fetchFavor = async () => {
    const userId = await getCookie("userID");
    const url = `/favourites/fetch?userId=${userId}&type=gig`;
    const response = await ApiService.getData({ url });
    setFavorGigs(response);
  };

  useEffect(() => {
    fetchFavor();
  }, []);
  const getData = async () => {
    var url = "gigs/fetch?perpage=8";
    const res = await ApiService.getData({
      url: url,
    });
    return res;
  };
  const {
    data: gigs,
    isLoading,
    isError,
    refetch,
  } = useQuery(["gigs"], getData);
  return (
    <div className={className + " " + "grid xl:grid-cols-3 md:grid-cols-2"}>
      {gigs?.data.map((item: any) => (
        <div key={item.id} className="m-5">
          <GigCard
            data={item}
            fetchFavor={fetchFavor}
            favor={favorGigs}
            title={item.title}
            authorLogo={
              "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg"
            }
            href={item.id}
            authorName={item.user.firstName}
            img={
              "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            }
            price={item.price}
            level={1}
            orders={56}
            rating={4.6}
          />
        </div>
      ))}
    </div>
  );
};
