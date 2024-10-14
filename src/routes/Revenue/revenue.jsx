import Card from "../../components/Card/card";
import { useState, useEffect } from "react";

import Chart  from "chart.js/auto";
import {CategoryScale} from "chart.js"
import BarChart from "../../components/BarChart/barChart.jsx";
import { getISOWeek } from "date-fns";

import { useSelector } from "react-redux";
import {selectRevenueItem} from '../../store/revenueReducer/revenue.selector.js'



const chartDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const dummyData = [70000, 50000, 30000, 20000, 10000]

Chart.register(CategoryScale);

const Revenue = () => {
  const [chartData, setChartData] = useState({
    labels: chartDays.map((data) => data),
    datasets: [
      {
        // label: "Users Gained",
        data: dummyData.map((data) => data),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50Af99",
          "#503295",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "white",
        borderWidth: 2,
      }
    ]
  })
  const allRevenueObj = useSelector(selectRevenueItem);
  
  const [monthRevenueAmount, setMonthRevenueAmount] = useState(0);
  const [dayRevenueAmount, setDayRevenueAmount] = useState(0);
  const [weekRevenueAmount, setWeekRevenueAmount] = useState(0);

  useEffect(() => {
    const today = new Date();
    // const thisYear = today.getFullYear()
    const thisMonth = today.getMonth() + 1;
    const thisDate = today.getDate();
    const thisWeek = getISOWeek(today);
    const allRevenueList = [];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // create cert list this is using receipt value
    for (let element of Object.values(allRevenueObj)){
      allRevenueList.push(element)
    }

    // console.log(allReceiptObj)
    // set month revenue no
    const monthRevenueList = allRevenueList.filter(element => {
      const monthVal = Number(element.date.split("-")[1]) 
      return monthVal === thisMonth
    })

    // set total revenue month
    const initialValue = 0

    const totalMonthRevenue = monthRevenueList.filter((element) => element.paymentStatus === true).map(element => Number(element.total)).reduce((prevEl, nextEl) => prevEl + nextEl, initialValue)   

    // set week revenue no
    const weekRevenueList = allRevenueList.filter(element => {
      const newDate = element.date
      const weekVal = getISOWeek(new Date (newDate))
      return weekVal === thisWeek
    })
  
    // set total revenue week
    const totalWeekRevenue = weekRevenueList.filter(element => element.paymentStatus === true).map(element => Number(element.total)).reduce((prevEl, nextEl) => prevEl + nextEl, initialValue)

    // set day revenue no
    const dayRevenueList = monthRevenueList.filter(element => {
      const dayVal = Number(element.date.split("-")[2])
      return dayVal === thisDate
    })

    // set total revenue day
    const totalDayRevenue = dayRevenueList.filter(element => element.paymentStatus === true).map(element => Number(element.total)).reduce((prevEl, nextEl) => prevEl + nextEl, initialValue)

    // each week day for charts
    const weekNo = weekRevenueList.map(element => element.date)
    const uniqueDayList = Array.from(new Set(weekNo));
    const eachDayObj = {}
    const eachDayList = []
    for (let element of uniqueDayList){
      const currentDayNo = new Date(element)
      const currentDayStr = daysOfWeek[currentDayNo.getDay()]
      const totalEachDay = weekRevenueList.filter(item => element.split("-")[2] === item.date.split("-")[2]).map(element => Number(element.total)).reduce((prevEl, nextEl) => prevEl + nextEl,  initialValue);
      eachDayObj[currentDayStr] = totalEachDay
    }
    for (let element of Object.keys(eachDayObj)){
      if (element === "Monday") eachDayList[0] = eachDayObj[element]
      else if (element === "Tuesday") eachDayList[1] = eachDayObj[element]
      else if (element === "Wednesday") eachDayList[2] = eachDayObj[element]
      else if (element === "Thursday") eachDayList[3] = eachDayObj[element]
      else if (element === "Friday") eachDayList[4] = eachDayObj[element]
    }
    
    setMonthRevenueAmount(totalMonthRevenue)
    setWeekRevenueAmount(totalWeekRevenue)
    setDayRevenueAmount(totalDayRevenue)
    setChartData({
      labels: chartDays.map((data) => data),
      datasets: [
        {
          // label: "Daily Amount",
          data: eachDayList.map(element => element),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#50Af99",
            "#503295",
            "#f3ba2f",
            "#2a71d0"
          ],
          borderColor: "white",
          borderWidth: 2,
        }
      ]
    })
  }, [])


  return (
    <div className='p-6 col-span-4 flex flex-col gap-2 w-full lg:w-full overflow-y-scroll md:h-full'>
    <div className="">
      <span className="text-3xl font-bold text-blue-950">REVENUE</span>
    </div>
    <div className="flex lg:flex-row flex-col gap-3 w-4/5 md:w-4/6 lg:w-full justify-between pb-10">
      <Card bgColor={"bg-blue-700"} title={"Revenue This Month"} value={`₦${monthRevenueAmount}`} />
      <Card bgColor={"bg-fuchsia-700"} title={"Revenue This Week"} value={`₦${weekRevenueAmount}`} />
      <Card bgColor={"bg-teal-600"} title={"Revenue This Day"} value={`₦${dayRevenueAmount}`} />
    </div>
    <div className='border-2 border-gray rounded-md p-2'>
      <h2 className="text-center font-bold text-blue-800 text-lg mb-4">Weekly Revenue Chart</h2>
      <BarChart chartData={chartData} />
    </div>
  </div>
  )
}

export default Revenue;