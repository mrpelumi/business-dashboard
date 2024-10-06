
// primereact
import { FilterMatchMode } from 'primereact/api';
import SearchInput from '../../components/searchInput/searchInput.component'
import SearchButton from '../../components/searchButton/searchButton.component'
import Tables from '../../components/dataTable/dataTable';

import { useState } from 'react'
import { useEffect } from 'react';
// import {exportCSV} from 'primereact/cs'

const Profile = () => {
  const options = {
    year: "numeric",
    month:"long",
    day: "numeric"
  }

  const [filters, setFilters] = useState({
    global: {value: null, matchMode:FilterMatchMode.CONTAINS }
  })
  const [currentDate, setCurrentDate] = useState("");
  const [searchTxt, setSearchTxt] = useState("");

  // sample data
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
      header:"Id"
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
    const date = new Date();
    const trans_date = date.toLocaleDateString("en-US", options)
    setCurrentDate(trans_date);
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
        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <span className='font-medium text-2xl'>Welcome <span className='text-blue-700'>Admin</span></span>
            <span className='text-sm text-gray-400'>Ondo Business Premises Management Platform</span>
          </div>
          <div className=''>
            <span className='font-medium text-gray-600'>{currentDate}</span>
          </div>
        </div>
        <div className=''>
          <span className='text-xl font-bold text-blue-950'>USERS</span>
        </div>
        <div className='flex justify-between'>
          <div className='shadow-md p-4 rounded-md flex flex-col gap-3 w-1/6'>
            <span className='text-sm text-gray-400 text-center'>Total Users</span>
            <span className='text-2xl font-medium text-gray-800 text-center'>1000</span>
          </div>
          <div className='flex items-end px-4 gap-2'>
            <SearchInput value={filters} onChangeHandler={inputSearchHandler} />
            <SearchButton onSubmitHandler={onSubmitHandler} />
          </div>
        </div>
        <div className='border-2 border-gray-400 rounded-md'>
          <Tables products={products} columns={columns} filters={filters}/>
          {/* <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" /> */}
        </div>
      </div>
  )
}

export default Profile;