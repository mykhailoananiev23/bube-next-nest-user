export const SellerWorkExperience = ({workExperience}:any) => {
    return (
        <div className=" bg-white sm:pl-0 py-8 mt-8  max-w-2xl w-full rounded-lg drop-shadow-md">
            <h1 className="text-darkText text-2xl mx-8 font-semibold">
            Work Experience
            </h1>
            <hr className="my-8" />
            {workExperience.map(
            ({ id, title, category, startDate, endDate }:any) => (
                <div className="px-8 p-5 text-xl" key={id}>
                <h1 className="text-darkText">{title}</h1>
                <h2>{`${category} - ${startDate} - ${endDate}`}</h2>
                </div>
            )
            )}
        </div>
    )
}