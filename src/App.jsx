import './App.css'
import './index.css'

import Nav from './components/Nav/dashboard'
import SearchInput from './components/searchInput/searchInput.component'
import SearchButton from './components/searchButton/searchButton.component'

function App() {

  return (
    <div className='grid grid-cols-5 gap-2 h-screen'>
      <Nav />
      <div className='p-6 border-black border-2 col-span-4 flex flex-col gap-6'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <span className='font-medium text-2xl'>Welcome <span className='text-blue-700'>Admin</span></span>
            <span className='text-sm text-gray-400'>Ondo Business Premises Management Platform</span>
          </div>
          <div className=''>
            <span className='font-medium text-gray-600'>September 23, 2023</span>
          </div>
        </div>
        <div className=''>
          <span className='text-xl font-bold text-blue-950'>PROFILE</span>
        </div>
        <div className=''>
          <div>
            <span>Total Users: 234</span>
          </div>
          <div className=''>
            <SearchInput />
            <SearchButton />
          </div>
        </div>
        <div>
          <span>A table will be here</span>
        </div>
      </div>
    </div>
  )
}

export default App
