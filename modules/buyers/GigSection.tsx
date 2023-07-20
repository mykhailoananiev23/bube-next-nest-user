import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gigs } from "../../hooks/data";
import { GigCard } from "./GigCard";
import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { GigsSearchBoxes } from "../../modules/buyers/GigsSearchBoxes";
import { getCookie } from "cookies-next";
import { Loading } from "../../components/loading/loading";

export const GigSection = () => {
  const [searchWord, setSearchWord] = useState<any>("");
  const [favorGigs, setFavorGigs] = useState<any>([]);
  
  const fetchFavor = async () => {
    const userId = Number(getCookie("NewUserId"));
    const url = `/favourites/fetch?userId=${userId}&type=gig`;
    const response = await ApiService.getData({ url });
    setFavorGigs(response);
  };

  useEffect(() => {
    fetchFavor();
  }, []);

  const getData = async () => {
    var url = "gigs/fetch?perpage=8";
    if (searchWord !== "") {
      url = url + `&s=${searchWord}`;
    }

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
  const ButtonToggler = ({ children }: any) => (
    <button className="border-neutral-600 text-neutral-600 border-[1px] rounded-full w-max h-max hover:text-black hover:border-black">
      {children}
    </button>
  );

  const ButtonGroup = ({ title, next, previous, goToSlide, ...rest }: any) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap justify-start">
          <h2 className="capitalize text-3xl font-bold text-neutral-800">
            {title}
          </h2>
        </div>
        {gigs?.data.length >= 4 ? (
          <div className="mb-4  gap-4 flex justify-end items-center">
            <ButtonToggler>
              <ChevronLeftIcon onClick={() => previous()} width={28} />
            </ButtonToggler>
            <ButtonToggler>
              <ChevronRightIcon onClick={() => next()} width={28} />
            </ButtonToggler>
          </div>
        ) : null}
      </div>
    );
  };

  const handleSetSearchWord = (e: any) => {
    if (e.code === "Enter") {
      setSearchWord(e.target.value);
    }
  };

  useEffect(() => {
    refetch();
  }, [searchWord]);

  if(isLoading){
    return <Loading title="get git data"></Loading>
  }

  return (
    <>
      <GigsSearchBoxes/>
      <section className="flex justify-center gap-8 p-8 bg-white">
        <div className="w-full max-w-sm sm:max-w-2xl md:max-w-[96rem]">
          <div className="w-full mx-auto relative flex flex-col-reverse">
            {gigs?.data.length === 0 ? (
              <div className="min-h-[300px] w-full flex justify-center items-center bg-gray-200 rounded-[10px]">
                <div className="text-medium text-slate-500 text-center min-h-[30px]">
                  no matched fields
                </div>
              </div>
            ) : (
              <>
                {gigs?.data && (
                  <Carousel
                    additionalTransfrom={0}
                    arrows={false}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container-padding-bottom"
                    customButtonGroup={
                      <ButtonGroup title="Gigs you may like" />
                    }
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite={false}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside
                    renderDotsOutside={false}
                    responsive={{
                      desktop: {
                        breakpoint: {
                          max: 3000,
                          min: 1024,
                        },
                        items: 4,
                        partialVisibilityGutter: 40,
                      },
                      mobile: {
                        breakpoint: {
                          max: 464,
                          min: 0,
                        },
                        items: 1,
                        partialVisibilityGutter: 30,
                      },
                      tablet: {
                        breakpoint: {
                          max: 1024,
                          min: 464,
                        },
                        items: 2,
                        partialVisibilityGutter: 30,
                      },
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                  >
                    {gigs?.data.map((item: any) => (
                      <div key={item.id} className="m-5">
                        <GigCard
                          fetchFavor={fetchFavor}
                          favor={favorGigs}
                          data={item}
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
                  </Carousel>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
