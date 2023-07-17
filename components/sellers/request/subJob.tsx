import style from "../../../utils/style";
import Hires from "./sub/hires";
import InviteFreelancers from "./sub/inviteFreelancers";
import ReviewProposals from "./sub/reviewProposals";
import ViewPost from "./sub/viewPost";

export const SelRequestSubJob = ({ data, tabId }: any) => {
  switch (tabId) {
    case "vr":
      return <ViewPost style={style} data={data} />;
    case "if":
      return <InviteFreelancers style={style} data={data} />;
    case "rp":
      return <ReviewProposals style={style} id={data.id} />;
    default:
      return <Hires style={style} data={data} />;
  }
};
