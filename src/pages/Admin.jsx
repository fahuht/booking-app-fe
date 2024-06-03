import { Radio, Space, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import OrderMage from '../components/OrderManage/OrderMage'
import CategoryManage from '../components/CategoryManage/CategoryManage'
import ProDuctManage from '../components/productManage/ProDuctManage'

import { getListOrder, getProduct } from '../action/ProductAction'
import { useDispatch, useSelector } from 'react-redux'
import DecentralizedManage from '../components/DecentralizedManage/DecentralizedManage'

const Admin = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.authData)

  useEffect(()=> {
    if(!user?.user?.admin && user?.user?.staff){
      if(!user?.user?.admin && user?.user?.staff && user?.user?.listPermission){
        const newListTab = items.filter(item => user?.user?.listPermission.includes(item.key))
        setListTab(newListTab)
      }
    } else {
      setListTab(items)
    }
  },[user])

  const [tabPosition, setTabPosition] = useState('left')
  const [listTab, setListTab] = useState([])

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value)
  }

  const items = [
    {
      key: 'QL_SAN_PHAM',
      label: `Quản lý sản phẩm`,
      children: <ProDuctManage />,
    },
    {
      key: 'QL_DON_HANG',
      label: `Quản lý đơn hàng`,
      children: <OrderMage />,
    },
    {
      key: 'QL_DANH_MUC',
      label: `Quản lý danh mục`,
      children: <CategoryManage />,
    },
    {
      key: 'PHAN_QUYEN',
      label: `Phân quyền người dùng`,
      children: <DecentralizedManage />,
    },


    // {
    //   key: '3',
    //   label: `Thống kê doanh thu`,
    //   children: <RevenueManage/>,
    // },
  ]

  // const handleChangeTabs = (tabs) => {
  //   if (tabs === '1') {
  //     dispatch(
  //       getProduct({
  //         page: 1,
  //         size: 5,
  //       }),
  //     )
  //   }
  //   if (tabs === '2') {
  //     dispatch(
  //       getListOrder({
  //         page: 1,
  //         size: 5,
  //       }),
  //     )
  //   }
  // }

  return (
    <>
      <h1 className="m-5">Trang chủ quản lý</h1>
      <Space
        className=" mb-5"
        style={{
          marginBottom: 24,
        }}
      >
        <Radio.Group
          value={tabPosition}
          onChange={changeTabPosition}
        ></Radio.Group>
      </Space>
      <Tabs
        tabPosition={tabPosition}
        items={listTab}
        // onChange={(tabs) => handleChangeTabs(tabs)}
      />
    </>
  )
}

export default Admin
