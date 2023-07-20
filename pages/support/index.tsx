import { ReactElement } from "react";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";

const SupportInboxPage: NextPageWithLayout = () => {
    return (
        <div>
            
        </div>
    )
}

SupportInboxPage.getLayout = (page: ReactElement) => {
    return <AccountLayout>{page}</AccountLayout>
}

export default SupportInboxPage