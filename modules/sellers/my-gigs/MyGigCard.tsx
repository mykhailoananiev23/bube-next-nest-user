import { CheckIcon } from "@heroicons/react/20/solid"
import { PencilIcon, StopIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useRouter } from "next/router"
import s_image3 from "../../../public/images/s_image3.png"
import ApiService from "../../../services/ApiService"
export const MyGigCard = ({ data, refetch }: any) => {
    const router = useRouter()
    const publishChange = async () => {
        var isPublished = Number(data.status) === 1 ? 0 : 1
        const res = await ApiService.postData({url: `/gigs/publish/${data.id}?stt=${isPublished}`, data:{}})
        res && refetch()
    }
    const gotoEditGig = () => {
        router.push(`/sellers/edit-gig?gigId=${data.id}`)
    }
    return (
        <article className="bg-white rounded-xl p-4 flex flex-col gap-4 max-w-sm sm:max-w-md lg:flex-row lg:max-w-5xl hover:shadow-md">
            <div style={{backgroundImage:`url('${s_image3.src}')`}} className={`w-full h-[216px] aspect-video lg:min-w-[20rem] lg:max-w-[24rem] bg-cover bg-no-repeat rounded-xl`}>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between">
                    <h3 className="text-2xl font-semibold">{data.title}</h3>
                    <button onClick={gotoEditGig}><PencilIcon width={24} /></button>
                </div>
                <p className="text-neutral-600">{data.desc}</p>
                <ul className="flex flex-wrap gap-3">
                    {data.skill.map((skill:any, index:number) => (
                        <li key={index} className="py-2 px-4 rounded-xl font-semibold bg-neutral-100">{skill.name}</li>
                    ))}
                </ul>
                <div className="flex flex-wrap justify-between border-t-2 border-neutral-100 pt-4">
                    <span className="text-2xl font-bold">${data.price}</span>
                    <button onClick={ publishChange } className="flex gap-1 items-center font-semibold text-blue-600 hover:text-blue-800">
                        <span>{Number(data.status) ? "Published" : "Unpublished"}</span>
                        <span>{Number(data.status) ? <CheckIcon width={20} /> : <StopIcon width={20} />}</span>
                    </button>
                </div>
            </div>
        </article>
    )
}