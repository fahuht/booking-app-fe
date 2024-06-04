import React from 'react'
import { useState, useEffect } from 'react'
import Helmet from '../components/Helmet/Helmet.js'
import { Container, Row, Col } from 'reactstrap'
import heroImg from '../assets/image/hero.png'
import { Link } from 'react-router-dom'

import '../pages/page-style/Home.css'
import '../components/Helmet/Helmet.css'

import Category from '../components/Category/Category.jsx'
// import products from '../assets/data/products.js'
import ProductCard from '../components/product-card/ProductCard.jsx'

import productCategoryImg01 from '../assets/image/hamburger.png'
import productCategoryImg02 from '../assets/image/pizza.png'
import productCategoryImg03 from '../assets/image/bread.png'

import { useDispatch, useSelector } from 'react-redux'
import { clearStateProduct, getProduct } from '../action/ProductAction.js'
import Loading from '../components/Loading/Loading.js'
import { notification } from 'antd'

const Home = () => {
  const dispatch = useDispatch()
  const listProduct = useSelector((state) => state.productReducer.listProduct)
  const { loading, isAddToCartSuccess } = useSelector(
    (state) => state.productReducer,
  )

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Thêm vào giỏ hàng thành công!',
      description: 'Hãy vào giỏ hàng để thanh toán hoặc tiếp tục mua sắm',
    })
  }

  const baseRequest = {
    category: '',
    page: 1,
    size: 8,
  }
  const [category, setCategory] = useState('Tất cả')

  const [dataRequest, setDataRquest] = useState(baseRequest)

  useEffect(() => {
    if (isAddToCartSuccess) {
      openNotificationWithIcon('success')
      dispatch(
        getProduct({
          ...dataRequest,
        }),
      )
      dispatch(clearStateProduct())
    }
  }, [isAddToCartSuccess])

  useEffect(() => {
    dispatch(
      getProduct({
        ...dataRequest,
      }),
    )
  }, [])

  const handleChangeCategory = (type) => {
    const newDataRequest = {
      ...dataRequest,
      category: type,
    }
    dispatch(
      getProduct({
        ...newDataRequest,
      }),
    )
  }

  return (
    <Helmet title="trang-chu">
      {contextHolder}
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero_content">
                <h5>
                  <span>Deal Ngập Tràn </span>
                </h5>
                <h1>
                  <span>Thỏa sức đặt món</span>
                </h1>
              </div>
              <div className="hero_button d-flex align-items-center gap-3 ">
                <button className="footer_order_btn d-flex align-items-center justify-content-between">
                  Đặt hàng ngay
                </button>

                <button className="all_food_btn">
                  <Link to="/foods">Tất cả món</Link>
                </button>
              </div>

              <div className="hero_service mt-5">
                <p className="d-flex align-items-center gap-2">
                  <span className="shipping_icon">
                    <i class="ri-car-line"></i>Giao hàng nhanh chóng
                  </span>
                </p>
              </div>
              <div className="hero_service mt-2">
                <p className="d-flex align-items-center gap-2">
                  <span className="shipping_icon">
                    <i class="ri-car-line"></i>Thông tin bảo mật
                  </span>
                </p>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero_img">
                <img src={heroImg} alt="hero__image" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Category />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mt-5">
              <h2>Sản phẩm</h2>
            </Col>

            <Col lg="12">
              <div className="food__category d-flex align-items-center justify-content-center gap-5">
                <button
                  className={`all_food_btnn ${
                    category === 'Tất cả' ? 'food_btn_active' : ''
                  }`}
                  onClick={() => {
                    handleChangeCategory('')
                    setCategory('Tất cả')
                  }}
                >
                  Tất cả
                </button>

                <button
                  className={`d-flex align-items-center gap2 ${
                    category === 'Đồ ăn' ? 'food_btn_active' : ''
                  } `}
                  onClick={() => {
                    handleChangeCategory('DO_AN')
                    setCategory('Đồ ăn')
                  }}
                >
                  <img src={productCategoryImg01} alt="" />
                  Đồ ăn
                </button>

                <button
                  className={`d-flex align-items-center gap2 ${
                    category === 'Bánh' ? 'food_btn_active' : ''
                  } `}
                  onClick={() => {
                    handleChangeCategory('cake')
                    setCategory('Bánh')
                  }}
                >
                  <img src={productCategoryImg02} alt="" />
                  Bánh
                </button>

                <button
                  className={`d-flex align-items-center gap2 ${
                    category === 'Món chay' ? 'food_btn_active' : ''
                  } `}
                  onClick={() => {
                    handleChangeCategory('vegetarian_food')
                    setCategory('Món chay')
                  }}
                >
                  <img src={productCategoryImg03} alt="" />
                  Món chay
                </button>

                <button
                  className={`d-flex align-items-center gap2 ${
                    category === 'Đồ uống' ? 'food_btn_active' : ''
                  } `}
                  onClick={() => {
                    handleChangeCategory('drink')
                    setCategory('Đồ uống')
                  }}
                >
                  <img src={productCategoryImg03} alt="" />
                  Đồ uống
                </button>
              </div>
            </Col>

            {listProduct &&
              listProduct.data &&
              listProduct.data.map((item) => (
                <Col lg="3" md="4" key={item.id} className="mt-5">
                  <ProductCard item={item} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
      <Loading isLoading={loading} />
    </Helmet>
  )
}

export default Home
