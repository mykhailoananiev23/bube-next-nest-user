import { useRef, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export const FaqCards = (props: any) => {
  const answerElRef: any = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current?.childNodes[0]?.offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="space-y-3 mt-5 overflow-hidden border-b px-5 last:border-b-0"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-[#363636] font-normal">
        {faqsList.question}
        {state ? (
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div>
          <p className="text-[#363636]">{faqsList.answers}</p>
        </div>
      </div>
    </div>
  );
};
