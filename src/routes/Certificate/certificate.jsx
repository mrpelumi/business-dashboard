import SearchButton from "../../components/searchButton/searchButton.component";
import SearchInput from "../../components/searchInput/searchInput.component";
import Tables from "../../components/dataTable/dataTable";

import Card from "../../components/Card/card";

import { selectCertItem } from "../../store/certReducer/certificate.selector";


import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterMatchMode } from 'primereact/api';

const Certificate = () => {

  const allCert = useSelector(selectCertItem);
  
  const [monthCertNo, setMonthCertNo] = useState(0);
  const [totalCertNo, setTotalCertNo] = useState(0);
  const [dayCertNo, setDayCertNo] = useState(0);
  const [week, setWeek] = useState("");
  const [certItems, setCertItems] = useState([]);

  const [filters, setFilters] = useState({
    global: {value: null, matchMode:FilterMatchMode.CONTAINS }
  });

  const [searchTxt, setSearchTxt] = useState("");

  const products = [
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '1',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '2',
      name: 'NNPC',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '3',
      name: 'Dangote',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '4',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '5',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '6',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '7',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '8',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '8',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '8',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '8',
      name: 'Global Enterprise',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '8',
      name: 'Institution',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '8',
      name: 'Bukven Communications',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '8',
      name: 'Bukven Hotel',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '8',
      name: 'Bukven Gardens',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '8',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
    {
      id: '8',
      name: 'Digital Business',
      item: 'pizza',
      status: 'sold'
    },
  ]

  const columns = [
    {
      field:"id",
      header:"id"
    },
    {
      field:"name",
      header:"Name"
    },
    {
      field:"item",
      header:"Item"
    },
    {
      field:"status",
      header:"Status"
    }
  ]

  useEffect(() => {
    const today = new Date();
    const thisYear = today.getFullYear()
    const thisMonth = today.getMonth() + 1;
    const thisDate = today.getDate();
    // const thisDay = today.get();
    const allCertList = []

    // create cert list this is using receipt value
    for (let element of Object.values(allCert)){
      allCertList.push(element)
    }
    console.log(allCertList)
    // set month cert no
    const monthCertList = allCertList.filter(element => {
      const monthVal = Number(element.date.split("/")[1])
      return monthVal === 9
    })

    // set week cert no
    // const weekCertList = allCertList.

    // set day cert no
    const dayCertList = allCertList.filter(element => {
      const dayVal = Number(element.date.split("/")[0])
      return dayVal === 4
    })
    
    setCertItems(allCertList);
    setTotalCertNo(allCertList.length)
    setMonthCertNo(monthCertList.length)
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
        <Card bgColor={"bg-violet-700"} title={"Certificate This Week"} value={100} />
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
          <Tables products={products} columns={columns} filters={filters} />
          {/* <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" /> */}
        </div>
    </div>
  )
}

export default Certificate;