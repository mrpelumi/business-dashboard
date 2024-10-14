
// primereact
import { FilterMatchMode } from 'primereact/api';
import SearchInput from '../../components/searchInput/searchInput.component'
import SearchButton from '../../components/searchButton/searchButton.component'
import Tables from '../../components/dataTable/dataTable';

import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux';
import { selectUserProfiles } from '../../store/userReducer/profile.selector';
// import {exportCSV} from 'primereact/cs'

const Profile = () => {
  const options = {
    year: "numeric",
    month:"long",
    day: "numeric"
  }
  const [currentDate, setCurrentDate] = useState("");
  const [searchTxt, setSearchTxt] = useState("");
  const [totalProfileNo, setTotalProfileNo] = useState(0);
  const [profileItems, setProfileItems] = useState([])
  
  const userProfilesObj = useSelector(selectUserProfiles);

  const [filters, setFilters] = useState({
    global: {value: null, matchMode:FilterMatchMode.CONTAINS }
  })

  const columns = [
    {
      field:"busName",
      header:"Business Name"
    },
    {
      field:"email",
      header:"Email"
    },
    {
      field:"phoneNo",
      header:"Phone No"
    },
    {
      field:"busCommence",
      header:"Commence Date"
    }, 
    {
      field: "busAdd",
      header: "Business Address"
    },
    {
      field: "homeAdd",
      header: "Home Address"
    }
  ]

  useEffect(() => {
    const date = new Date();
    const trans_date = date.toLocaleDateString("en-US", options)
    setCurrentDate(trans_date);

    const allProfilesList = []

    for (let element of Object.values(userProfilesObj)){
      allProfilesList.push(element)
    }
    setProfileItems(allProfilesList);
    setTotalProfileNo(allProfilesList.length)
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
        <div className='flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between'>
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
        <div className='flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between'>
          <div className='shadow-md p-4 rounded-md flex flex-col gap-3 lg:w-1/6 md:w-2/6 sm:w-1/5 w-4/6'>
            <span className='text-sm text-gray-400 sm:text-center'>Total Users</span>
            <span className='text-2xl font-medium text-gray-800 sm:text-center'>{totalProfileNo}</span>
          </div>
          <div className='flex flex-col w-4/6 sm:w-full sm:flex-row sm:items-end sm:justify-end gap-2'>
            <SearchInput value={filters} onChangeHandler={inputSearchHandler} />
            <SearchButton onSubmitHandler={onSubmitHandler} />
          </div>
        </div>
        <div className='border-2 border-gray-400 rounded-md flex flex-col'>
          <Tables products={profileItems} columns={columns} filters={filters}/>
        </div>
      </div>
  )
}

export default Profile;