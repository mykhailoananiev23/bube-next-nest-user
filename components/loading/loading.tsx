import { Spinner } from "@material-tailwind/react";

export const Loading = ({title}:any) => {
    const test = () => {

    }
    return (
        <div className="fixed min-w-full min-h-screen bg-white z-[9999999] top-0 left-0 flex justify-center items-center">
            <Spinner  className="h-12 w-12" onResize={test} onResizeCapture={() => {}} />
            <div>{title}</div>
        </div>
    )
}