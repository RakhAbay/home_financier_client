import { useQuery } from "react-query";
import api from "../../common/api";
import PieChart from "./components/PieChart";

const AnalyticsPage = (): JSX.Element => {

    const outcomeAnalyticsQuery = useQuery(
        "outcome-analytics",
        api.analytics.outcomeAnalytics
    );

    
    const outcomeAnalytics = outcomeAnalyticsQuery.data?.data

    // console.log('incomeAnalytics: ', incomeAnalytics)
    console.log('outcomeAnalytics: ', outcomeAnalytics)

    return (
        <div>
            <h1>Analytics Page</h1>
            <PieChart />
        </div>
    )
}

export default AnalyticsPage
