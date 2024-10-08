import SearchButton from "../../components/searchButton/searchButton.component";
import SearchInput from "../../components/searchInput/searchInput.component";
import Tables from "../../components/dataTable/dataTable";

import Card from "../../components/Card/card";

import { useState, useEffect } from "react";
import { FilterMatchMode } from 'primereact/api';
import { useSelector } from "react-redux";

import {selectReceiptItem} from '../../store/receiptReducer/receipt.selector';
import {getISOWeek} from 'date-fns';

const Receipt = () => {

  const columns = [
    {
      field:"taxAppId",
      header: "ID"
    },
    {
      field:"busName",
      header:"Business Name"
    },
    {
      field:"total",
      header:"Amount"
    },
    {
      field:"busBranch",
      header:"Branch No"
    },
    {
      field:"busAdd",
      header:"Address"
    },
    {
      field:"date",
      header: "Payment Date"
    }
  ]
  const allReceiptObj = useSelector(selectReceiptItem);
  
  const [monthReceiptNo, setMonthReceiptNo] = useState(0);
  const [totalReceiptNo, setTotalReceiptNo] = useState(0);
  const [dayReceiptNo, setDayReceiptNo] = useState(0);
  const [weekReceiptNo, setWeekReceiptNo] = useState(0);
  const [receiptItems, setReceiptItems] = useState([]);

  const [filters, setFilters] = useState({
    global: {value: null, matchMode:FilterMatchMode.CONTAINS }
  })

  const [searchTxt, setSearchTxt] = useState("");

  useEffect(() => {
    const today = new Date();
    const thisYear = today.getFullYear()
    const thisMonth = today.getMonth() + 1;
    const thisDate = today.getDate();
    const thisWeek = getISOWeek(today);
    const allReceiptList = []

    // create cert list this is using receipt value
    for (let element of Object.values(allReceiptObj)){
      if(element.paymentStatus === true){
        allReceiptList.push(element)
      }  
    }

    const monthReceiptList = allReceiptList.filter(element => {
      const monthVal = Number(element.date.split("-")[1])
      return monthVal === thisMonth
    })
    
    // set week cert no
    const weekReceiptList = allReceiptList.filter(element => {
      const newDate = element.date.split("-") 
      const weekVal = getISOWeek(new Date (newDate))
      return weekVal === thisWeek
    })

    // set day cert no
    const dayReceiptList = monthReceiptList.filter(element => {
      const dayVal = Number(element.date.split("-")[2])
      return dayVal === thisDate
    })

    
    setReceiptItems(allReceiptList);
    setTotalReceiptNo(allReceiptList.length)
    setMonthReceiptNo(monthReceiptList.length)
    setWeekReceiptNo(weekReceiptList.length)
    setDayReceiptNo(dayReceiptList.length)
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
      <span className="text-3xl font-bold text-blue-950">RECEIPT</span>
    </div>
    <div className="flex gap-20">
      <Card bgColor={"bg-pink-600"} title={"Receipts This Month"} value={monthReceiptNo} /> 
      <Card bgColor={"bg-sky-700"} title={"Receipts This Week"} value={weekReceiptNo} /> 
      <Card bgColor={"bg-yellow-600"} title={"Receipts This Day"} value={dayReceiptNo} /> 
    </div>
    <div className='flex justify-between'>
        <div className='shadow-md p-4 rounded-md flex flex-col gap-3 w-1/6'>
          <span className='text-sm text-gray-400 text-center'>Total Receipts</span>
          <span className='text-2xl font-medium text-gray-800 text-center'>{totalReceiptNo}</span>
        </div>
        <div className='flex items-end px-4 gap-2'>
          <SearchInput value={filters} onChangeHandler={inputSearchHandler} />
          <SearchButton onSubmitHandler={onSubmitHandler} />
        </div>
      </div>
      <div className='border-2 border-gray-400 rounded-md'>
        <Tables products={receiptItems} columns={columns} filters={filters} />
        {/* <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" /> */}
      </div>
  </div>
  )
}

export default Receipt