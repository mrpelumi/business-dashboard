import SearchButton from "../../components/searchButton/searchButton.component";
import SearchInput from "../../components/searchInput/searchInput.component";
import Tables from "../../components/dataTable/dataTable";

import Card from "../../components/Card/card";

import { selectCertItem } from "../../store/certReducer/certificate.selector";
import {getISOWeek} from 'date-fns';


import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterMatchMode } from 'primereact/api';

const Certificate = () => {
  const options = {
    year: "numeric",
    month:"long",
    day: "numeric"
  }

  const allCert = useSelector(selectCertItem);
  
  const [monthCertNo, setMonthCertNo] = useState(0);
  const [totalCertNo, setTotalCertNo] = useState(0);
  const [dayCertNo, setDayCertNo] = useState(0);
  const [weekCertNo, setWeekCertNo] = useState(0);
  const [certItems, setCertItems] = useState([]);

  const [filters, setFilters] = useState({
    global: {value: null, matchMode:FilterMatchMode.CONTAINS }
  });

  const [searchTxt, setSearchTxt] = useState("");

  const columns = [
    {
      field:"certificateNo",
      header:"Certificate No"
    },
    {
      field:"busName",
      header:"Business Name"
    },
    {
      field:"taxAppId",
      header:"Receipt ID"
    },
    {
      field: "createdDate",
      header: "Date Created"
    }
  ]

  useEffect(() => {
    const today = new Date();
    // const thisYear = today.getFullYear()
    const thisMonth = today.getMonth() + 1;
    const thisDate = today.getDate();
    const thisWeek = getISOWeek(today);
    const allCertList = []

    // create extensible cert object
    const newAllCertObj = Object.assign({}, allCert)

    for (let element of Object.values(newAllCertObj)){
      const newElement = Object.assign({}, element)
      newElement["createdDate"] = element.createdAt.toDate().toLocaleDateString("en-US", options)
      allCertList.push(newElement)
    }
    // set month cert no
    const monthCertList = allCertList.filter(element => {
      const monthDateVal = element.createdAt.toDate()
      const monthVal = monthDateVal.getMonth() + 1;
      return monthVal === thisMonth
    })

    // set week cert no
    const weekCertList = allCertList.filter(element => {
      const weekDateVal = element.createdAt.toDate()
      const weekVal = getISOWeek(weekDateVal)
      return weekVal === thisWeek
    })

    // set day cert no
    const dayCertList = monthCertList.filter(element => {
      const dayDateVal = element.createdAt.toDate()
      const dayVal = dayDateVal.getDate();
      return dayVal === thisDate
    })
    
    setCertItems(allCertList);
    setTotalCertNo(allCertList.length)
    setMonthCertNo(monthCertList.length)
    setWeekCertNo(weekCertList.length)
    setDayCertNo(dayCertList.length)
  }, [])

  const inputSearchHandler = (e) => {
    setSearchTxt(e.target.value);
  }

  const onSubmitHandler = (e) => {
    setFilters({
      global: {value: searchTxt, matchMode:FilterMatchMode.CONTAINS}
    })
  }

  return (
    <div className='p-6 col-span-4 flex flex-col gap-6 overflow-y-scroll w-full'>
      <div className="">
        <span className="text-3xl font-bold text-blue-950">CERTIFICATE</span>
      </div>
      <div className="flex lg:flex-row flex-col lg:justify-between gap-3 sm:w-4/5 md:w-4/6 lg:w-full">
        <Card bgColor={"bg-cyan-600"} title={"Certificate This Month"} value={monthCertNo} />
        <Card bgColor={"bg-violet-700"} title={"Certificate This Week"} value={weekCertNo} />
        <Card bgColor={"bg-green-600"} title={"Certificate This Day"} value={dayCertNo} />
      </div>
      <div className='flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between'>
          <div className='shadow-md p-4 rounded-md flex flex-col gap-3 lg:w-1/6 md:w-2/6 sm:w-1/5 w-4/6'>
            <span className='text-sm text-gray-400 sm:text-center'>Total Certificate</span>
            <span className='text-2xl font-medium text-gray-800 sm:text-center'>{totalCertNo}</span>
          </div>
          <div className='flex flex-col w-4/6 sm:w-full sm:flex-row sm:items-end sm:justify-end gap-2'>
            <SearchInput value={filters} onChangeHandler={inputSearchHandler} />
            <SearchButton onSubmitHandler={onSubmitHandler} />
          </div>
        </div>
        <div className='border-2 border-gray-400 rounded-md'>
          <Tables products={certItems} columns={columns} filters={filters} />
        </div>
    </div>
  )
}

export default Certificate;