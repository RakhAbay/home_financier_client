import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "react-query";
import api from "../../../common/api";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieDataProps {
    labels: string[],
    datasets: Dataset[]
}

interface Dataset {
    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor: string[],
    borderWidth: number
}

const data: PieDataProps = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

const OutPieChart = (): JSX.Element => {

    const outcomeAnalyticsQuery = useQuery(
        "outcome-analytics",
        api.analytics.outcomeAnalytics
    );

    const outcomeAnalytics = outcomeAnalyticsQuery.data?.data
    const categories = outcomeAnalytics?.inOutComePercentageList

    const incomeLabels = categories?.map(item => item.categoryDTO.name) ?? []
    const incomeDataset: Dataset = {
        label: 'Расходы',
        data: categories?.map(item => item.sum) ?? [],
        backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
    } 

    const incomeData: PieDataProps = {
        labels: incomeLabels,
        datasets: [incomeDataset]
    }

    return <Pie data={incomeData} />
};

export default OutPieChart;
