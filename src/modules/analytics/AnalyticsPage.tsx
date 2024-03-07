import { useQuery } from "react-query";
import api from "../../common/api";
import PieChart from "./components/PieChart";
import OutPieChart from "./components/OutcomePieChart";
import { Typography } from "antd";

const AnalyticsPage = (): JSX.Element => {
    return (
        <div>
            <h1>Аналитка</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '300px' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Typography.Title level={4}>Доходы</Typography.Title>
                    </div>
                    <PieChart />
                </div>
                <div style={{ width: '300px' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Typography.Title level={4}>Расходы</Typography.Title>
                    </div>
                    <OutPieChart />
                </div>
            </div>
        </div>
    )
}

export default AnalyticsPage
