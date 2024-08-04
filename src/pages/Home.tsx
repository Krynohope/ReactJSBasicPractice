import { Suspense, useEffect, useState } from 'react';
import { ProductModel } from '../models/Product';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload'
import ProductList from '../components/ProductList';
import { getBslProduct, getMixProduct, getNewProduct } from '../services/productService';


const Home = () => {

    const [mixProducts, setMixProduct] = useState<ProductModel[]>([])
    const [newProducts, setNewProduct] = useState<ProductModel[]>([])
    const [bestSellerProducts, setbestSellerProduct] = useState<ProductModel[]>([])

    useEffect(() => {
        const getData = async () => {
            const newProducts = await getNewProduct()
            const bslProducts = await getBslProduct()
            const mixProducts = await getMixProduct()
            setMixProduct(newProducts)
            setNewProduct(bslProducts)
            setbestSellerProduct(mixProducts)
        }
        getData()
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div id="header-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" style={{ height: 410 }}>
                            <img className="img-fluid" src="img/banner1.jpg" alt="Image" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{ maxWidth: 700 }}>
                                    <h4 className="text-light text-uppercase font-weight-medium mb-3">
                                        10% Off Your First Order
                                    </h4>
                                    <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                                        Laptop Gaming
                                    </h3>
                                    <Link to="/shop" className="btn btn-light py-2 px-3">
                                        GO TO SHOP
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" style={{ height: 410 }}>
                            <img className="img-fluid" src="img/banner2.jpg" alt="Image" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{ maxWidth: 700 }}>
                                    <h4 className="text-light text-uppercase font-weight-medium mb-3">
                                        Gift Code Up To 50% For Each Order Completed
                                    </h4>
                                    <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                                        Phone & Keyboard
                                    </h3>
                                    <Link to="/shop" className="btn btn-light py-2 px-3">
                                        GO TO SHOP
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a
                        className="carousel-control-prev"
                        href="#header-carousel"
                        data-slide="prev"
                    >
                        <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                            <span className="carousel-control-prev-icon mb-n2" />
                        </div>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#header-carousel"
                        data-slide="next"
                    >
                        <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                            <span className="carousel-control-next-icon mb-n2" />
                        </div>
                    </a>
                </div>
            </div>

            <LazyLoad>
                <ProductList productList={newProducts} title={'Sản phẩm mới'}></ProductList>
            </LazyLoad>

            <div className="container-fluid offer pt-5">
                <div className="row px-xl-5">
                    <div className="col-md-6 pb-4">
                        <div className="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
                            <img src="img/botbanner2.png" alt="botbanner1" />
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <h5 className="text-uppercase text-primary mb-3">10% off the first order</h5>
                                <h1 className="mb-4 font-weight-semi-bold">Keyboard</h1>
                                <Link to="/shop" className="btn btn-outline-primary py-md-2 px-md-3">
                                    GO TO SHOP
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 pb-4">
                        <div className="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
                            <img src="img/botbanner1.png" alt="botbanner2" />
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <h5 className="text-uppercase text-primary mb-3">15% off</h5>
                                <h1 className="mb-4 font-weight-semi-bold">Laptop Gaming</h1>
                                <Link to="/shop" className="btn btn-outline-primary py-md-2 px-md-3">
                                    GO TO SHOP
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LazyLoad>
                <ProductList productList={bestSellerProducts} title={'Sản phẩm bán chạy'}></ProductList>
            </LazyLoad>


            <div className="container-fluid bg-secondary my-5">
                <div className="row justify-content-md-center py-5 px-xl-5">
                    <div className="col-md-6 col-12 py-5">
                        <div className="text-center mb-2 pb-2">
                            <h2 className="section-title px-5 mb-3"><span className="bg-secondary px-2">Get Notify</span></h2>
                            <p>Get lasted new infomation from us</p>
                        </div>
                        <form action="">
                            <div className="input-group">
                                <input type="text" className="form-control border-white p-4" placeholder="Enter your email" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary px-4">Subscribe</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <LazyLoad>
                <ProductList productList={mixProducts} title={'Sản phẩm nổi bật'}></ProductList>
            </LazyLoad>


            <div className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: '30px' }}>
                            <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: '30px' }}>
                            <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                            <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: '30px' }}>
                            <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: '30px' }}>
                            <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;