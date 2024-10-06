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

import { setCertReducer } from './store/certReducer/certificate.reducer';
import { setReceiptReducer } from './store/receiptReducer/receipt.reducer';
import { setRevenueReducer } from './store/revenueReducer/revenue.reducer';

import { getDocCert, getDocRevenue } from './utils/firebase';
import { getDocReceipt } from './utils/firebase';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
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
    certificates();
    receipts();
    revenue();
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<Profile />} /> 
        <Route path='/certificate' element={<Certificate />} />
        <Route path='/receipt' element={<Receipt />} />
        <Route path='/revenue' element={<Revenue />} />
      </Route>
    </Routes>
  )
}

export default App
