export const Hero = () => {
    return (
        <section
        className="bg-no-repeat text-center   text-white py-auto bg-cover bg-center"
        style={{
          backgroundImage: `url('/bg-cropped.jpg')`,
          height: "100%",
        }}
      >
        <div className="pt-20 ">
          <h1 className="capitalize  font-extrabold text-5xl">
            behind BuBe New B2b campaing:team 2022
          </h1>
          <div className="flex justify-center	 my-5">
            <h5>By BuBe Team</h5>
            <div className="border-l-2 border-l-white mx-2"></div>
            <h5>Jan 4 2022</h5>
          </div>
          <h5 className="pb-8">General</h5>
        </div>
      </section>
    )
}