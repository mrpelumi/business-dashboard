import Card from "../../components/Card/card";
import { useState, useEffect } from "react";

import {Data} from '../../Data.js'
import Chart  from "chart.js/auto";
import {CategoryScale} from "chart.js"
import BarChart from "../../components/BarChart/barChart.jsx";
import { getISOWeek } from "date-fns";

import { useSelector } from "react-redux";
import {selectRevenueItem} from '../../store/revenueReducer/revenue.selector.js'



Chart.register(CategoryScale);

const Revenue = () => {

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.day),
    datasets: [
      {
        // label: "Users Gained",
        data: Data.map ((data) => data.amount),
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
    const thisYear = today.getFullYear()
    const thisMonth = today.getMonth() + 1;
    const thisDate = today.getDate();
    const thisWeek = getISOWeek(today);
    const allRevenueList = []

    // create cert list this is using receipt value
    for (let element of Object.values(allRevenueObj)){
      allRevenueList.push(element)
    }

    // console.log(allReceiptObj)
    // set month cert no
    const monthRevenueList = allRevenueList.filter(element => {
      const monthVal = Number(element.date.split("/")[1]) //add -1 later
      return monthVal === 6
    })

    // set total revenue month
    const initialValue = 0

    // total not a list in real firebase
    const totalMonthRevenue = monthRevenueList.filter((element) => element.paymentStatus === true).map(element => Number(element.total[0])).reduce((prevEl, nextEl) => prevEl + nextEl, initialValue)   

    // set week revenue no
    const weekRevenueList = allRevenueList.filter(element => {
      const newDate = element.date.split("/").reverse().join("-") //change / to - later
      const weekVal = getISOWeek(new Date (newDate))
      return weekVal === 23
    })
  
    // set total revenue week
    const totalWeekRevenue = weekRevenueList.filter(element => element.paymentStatus === true).map(element => Number(element.total[0])).reduce((prevEl, nextEl) => prevEl + nextEl, initialValue)

    // set day revenue no
    const dayRevenueList = allRevenueList.filter(element => {
      const dayVal = Number(element.date.split("/")[0])
      return dayVal === 4
    })

    // set total revenue day
    const totalDayRevenue = dayRevenueList.filter(element => element.paymentStatus === true).map(element => Number(element.total[0])).reduce((prevEl, nextEl) => prevEl + nextEl, initialValue)
    
    setMonthRevenueAmount(totalMonthRevenue)
    setWeekRevenueAmount(totalWeekRevenue)
    setDayRevenueAmount(totalDayRevenue)
    setChartData({
      labels: Data.map((data) => data.day),
      datasets: [
        {
          // label: "Users Gained",
          data: weekRevenueList.map(element => Number(element.total[0])),
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
    <div className='p-6 col-span-4 flex flex-col gap-6'>
    <div className="">
      <span className="text-3xl font-bold text-blue-950">REVENUE</span>
    </div>
    <div className="flex gap-20 pb-10">
      <Card bgColor={"bg-blue-700"} title={"Revenue This Month"} value={`₦${monthRevenueAmount}`} />
      <Card bgColor={"bg-fuchsia-700"} title={"Revenue This Week"} value={`₦${weekRevenueAmount}`} />
      <Card bgColor={"bg-teal-600"} title={"Revenue This Day"} value={`₦${dayRevenueAmount}`} />
    </div>
    <div className='h-25 border-2 border-gray rounded-md p-2'>
      <h2 className="text-center font-bold text-blue-800 text-lg mb-4">Weekly Revenue Chart</h2>
      <BarChart chartData={chartData} />
    </div>
  </div>
  )
}

export default Revenue;