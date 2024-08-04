import { useParams } from "react-router-dom";
import { ProductModel } from "../models/Product";
import { useEffect, useState } from "react";
import PageHeader from "../partials/PageHeader";
import ProductList from '../components/ProductList';
import request from "../utils/request";

const Detail = () => {
    const { id } = useParams<string>()
    const [productDetails, setProductDetails] = useState<ProductModel>()
    const [relativeProducts, setRelativeProduct] = useState<ProductModel[]>([])

    useEffect(() => {
        const getData = async () => {
            const response = await request.get(`api/products/${id}`)
            setProductDetails(response.data[0])
        }
        getData()
    }, [])

    useEffect(() => {
        const getData = async () => {
            const relativeResponse = await request.get(`api/products/categoryid/${productDetails?.id_category}`)
            setRelativeProduct(relativeResponse.data)
        }
        if (productDetails) getData()
    }, [productDetails])
    return (
        <>
            <PageHeader></PageHeader>
            <div className="container-fluid py-5">
                <div className="row px-xl-5">
                    <div className="col-lg-5 pb-5">
                        <div
                            id="product-carousel"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner border">
                                <div className="carousel-item active">
                                    <img className="w-100 h-100" src={productDetails?.img} alt="Image" />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                <i className="fa fa-2x fa-angle-left text-dark" />
                            </a>
                            <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                                <i className="fa fa-2x fa-angle-right text-dark" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-7 pb-5">
                        <h3 className="font-weight-semi-bold">{productDetails?.name}</h3>
                        <div className="d-flex mb-3">
                            <div className="text-primary mr-2">
                                <small className="fas fa-star" />
                                <small className="fas fa-star" />
                                <small className="fas fa-star" />
                                <small className="fas fa-star-half-alt" />
                                <small className="far fa-star" />
                            </div>
                            <small className="pt-1">(50 Reviews)</small>
                        </div>
                        <h3 className="font-weight-semi-bold mb-4">{productDetails?.price}</h3>
                        <p className="mb-4">{productDetails?.name}</p>


                        <div className="d-flex align-items-center mb-4 pt-2">
                            <div className="input-group quantity mr-3" style={{ width: 130 }}>
                                <div className="input-group-btn">
                                    <button className="btn btn-primary btn-minus">
                                        <i className="fa fa-minus" />
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    className="form-control bg-secondary text-center"
                                    defaultValue={1}
                                />
                                <div className="input-group-btn">
                                    <button className="btn btn-primary btn-plus">
                                        <i className="fa fa-plus" />
                                    </button>
                                </div>
                            </div>
                            <button className="btn btn-primary px-3">
                                <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                            </button>
                        </div>
                        <div className="d-flex pt-2">
                            <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                            <div className="d-inline-flex">
                                <a className="text-dark px-2" href="">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a className="text-dark px-2" href="">
                                    <i className="fab fa-twitter" />
                                </a>
                                <a className="text-dark px-2" href="">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                                <a className="text-dark px-2" href="">
                                    <i className="fab fa-pinterest" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row px-xl-5">
                    <div className="col">
                        <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                            <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">
                                Information
                            </a>
                            <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">
                                Reviews (0)
                            </a>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade" id="tab-pane-2">
                                <h4 className="mb-3">Additional Information</h4>
                                <p></p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Takimata ea clita labore amet ipsum erat justo voluptua.
                                                Nonumy.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Takimata ea clita labore amet ipsum erat justo voluptua.
                                                Nonumy.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab-pane-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4 className="mb-4">1 review for "Colorful Stylish Shirt"</h4>
                                        <div className="media mb-4">
                                            <img
                                                src="img/user.jpg"
                                                alt="Image"
                                                className="img-fluid mr-3 mt-1"
                                                style={{ width: 45 }}
                                            />
                                            <div className="media-body">
                                                <h6>
                                                    John Doe
                                                    <small>
                                                        {" "}
                                                        - <i>01 Jan 2045</i>
                                                    </small>
                                                </h6>
                                                <div className="text-primary mb-2">
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star-half-alt" />
                                                    <i className="far fa-star" />
                                                </div>
                                                <p>
                                                    Diam amet duo labore stet elitr ea clita ipsum, tempor
                                                    labore accusam ipsum et no at. Kasd diam tempor rebum
                                                    magna dolores sed sed eirmod ipsum.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h4 className="mb-4">Leave a review</h4>
                                        <small>
                                            Your email address will not be published. Required fields are
                                            marked *
                                        </small>
                                        <div className="d-flex my-3">
                                            <p className="mb-0 mr-2">Your Rating * :</p>
                                            <div className="text-primary">
                                                <i className="far fa-star" />
                                                <i className="far fa-star" />
                                                <i className="far fa-star" />
                                                <i className="far fa-star" />
                                                <i className="far fa-star" />
                                            </div>
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="message">Your Review *</label>
                                                <textarea
                                                    id="message"
                                                    cols={30}
                                                    rows={5}
                                                    className="form-control"
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="name">Your Name *</label>
                                                <input type="text" className="form-control" id="name" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Your Email *</label>
                                                <input type="email" className="form-control" id="email" />
                                            </div>
                                            <div className="form-group mb-0">
                                                <input
                                                    type="submit"
                                                    defaultValue="Leave Your Review"
                                                    className="btn btn-primary px-3"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProductList productList={relativeProducts} title='Sản phẩm tương tự'></ProductList>

        </>

    );
}

export default Detail;