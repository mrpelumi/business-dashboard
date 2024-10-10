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
    }
  ]

  useEffect(() => {
    const today = new Date();
    // const thisYear = today.getFullYear()
    const thisMonth = today.getMonth() + 1;
    const thisDate = today.getDate();
    const thisWeek = getISOWeek(today);
    const allCertList = []

    // create cert list this is using receipt value
    for (let element of Object.values(allCert)){
      allCertList.push(element)
    }
    console.log(allCertList)
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
    <div className='p-6 col-span-4 flex flex-col gap-6'>
      <div className="">
        <span className="text-3xl font-bold text-blue-950">CERTIFICATE</span>
      </div>
      <div className="flex gap-20">
        <Card bgColor={"bg-cyan-600"} title={"Certificate This Month"} value={monthCertNo} />
        <Card bgColor={"bg-violet-700"} title={"Certificate This Week"} value={weekCertNo} />
        <Card bgColor={"bg-green-600"} title={"Certificate This Day"} value={dayCertNo} />
      </div>
      <div className='flex justify-between'>
          <div className='shadow-md p-4 rounded-md flex flex-col gap-3 w-1/6'>
            <span className='text-sm text-gray-400 text-center'>Total Certificate</span>
            <span className='text-2xl font-medium text-gray-800 text-center'>{totalCertNo}</span>
          </div>
          <div className='flex items-end px-4 gap-2'>
            <SearchInput value={filters} onChangeHandler={inputSearchHandler} />
            <SearchButton onSubmitHandler={onSubmitHandler} />
          </div>
        </div>
        <div className='border-2 border-gray-400 rounded-md'>
          <Tables products={certItems} columns={columns} filters={filters} />
          {/* <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" /> */}
        </div>
    </div>
  )
}

export default Certificate;