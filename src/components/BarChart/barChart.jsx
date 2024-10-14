import {Bar} from "react-chartjs-2";

const BarChart = ({chartData}) => {
  return (
    <>
    <Bar className="h-full w-full" data={chartData} height={"80%"} options={{
      plugins: {
        title: {
          display: false,
          text: "Weekly Revenue Chart"
        },
        legend: {
          display: false
        }, 
        maintainAspectRatio: false,
        aspectRatio: 1
      }
    }} />
    </>
  )
}

export default BarChart;