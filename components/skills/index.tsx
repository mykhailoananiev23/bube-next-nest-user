export default function SkillsFrom({data}:any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {data.map(({ id, name }: any) => (
        <div
          key={id}
          className="space-x-1 mb-4 md:space-x-6 space-y-3 rounded-full text-center mr-4 text-darkText bg-[#EFEFEF] "
        >
          <button className=" py-2 ">{name}</button>
        </div>
      ))}
    </div>
  );
}
