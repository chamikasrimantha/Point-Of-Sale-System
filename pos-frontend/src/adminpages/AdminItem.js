import React, { useEffect, useState } from 'react'
import AdminNavBar from './components/AdminNavBar'
import { useNavigate } from 'react-router-dom';

export default function AdminItem() {

    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [stockId, setStockId] = useState(null);

    useEffect(() => {

    }, [])

    const navigate = useNavigate();

  return (
    <div>
      <AdminNavBar/>
    </div>
  )
}
