import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import {useEffect} from 'react';

import {useDispatch} from 'react-redux';

import Home from './routes/Home/home'
import Profile from './routes/Profile/profile'
import Certificate from './routes/Certificate/certificate'
import Receipt from './routes/Receipt/receipt'
import Revenue from './routes/Revenue/revenue'
import LoginPage from './routes/Login/login';

import { setCertReducer } from './store/certReducer/certificate.reducer';
import { setReceiptReducer } from './store/receiptReducer/receipt.reducer';
import { setRevenueReducer } from './store/revenueReducer/revenue.reducer';
import { setUsersReducer } from './store/userReducer/profile.reducer';

import { getDocCert, getDocRevenue, getDocReceipt, getDocUserProfile } from './utils/firebase';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const users = async () => {
      const qusers = await getDocUserProfile();
      const qUsersList = [];
      qusers.docs.forEach(element => qUsersList.push(element.data()))
      dispatch(setUsersReducer(qUsersList))
    }

    const certificates = async () => {
      const qcert = await getDocCert();
      const qCertList = []
      qcert.docs.forEach(element => qCertList.push(element.data()))
      dispatch(setCertReducer(qCertList))
    }

    const receipts = async () => {
      const qReceipt = await getDocReceipt();
      const qReceiptList = []
      qReceipt.docs.forEach(element => qReceiptList.push(element.data()))
      dispatch(setReceiptReducer(qReceiptList))
    }

    const revenue = async () => {
      const qRevenue = await getDocRevenue();
      const qRevenueList = [];
      qRevenue.docs.forEach(element => qRevenueList.push(element.data()))
      dispatch(setRevenueReducer(qRevenueList))
    }

    users();
    certificates();
    receipts();
    revenue();
  }, [])

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/home' element={<Home />}>
        <Route index element={<Profile />} /> 
        <Route path='/home/certificate' element={<Certificate />} />
        <Route path='/home/receipt' element={<Receipt />} />
        <Route path='/home/revenue' element={<Revenue />} />
      </Route>
    </Routes>
  )
}

export default App
