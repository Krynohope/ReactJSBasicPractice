import { useEffect, useState } from 'react';
import PageHeader from '../../partials/PageHeader';
import { ProductModel } from '../../models/Product';
import ProductList from '../../components/ProductList';
import ShopFillter from './ShopFillter';
import { getProductByCate, getProductLimit } from '../../services/productService';

const Shop = () => {
    const [products, setProducts] = useState<ProductModel[]>([])
    const [filter, setFilter] = useState<string>('')

    useEffect(() => {
        const getData = async () => {
            const result = await getProductByCate(filter)
            setProducts(result)
        }
        if (filter) getData()
    }, [filter])

    useEffect(() => {
        const getData = async () => {
            const data = await getProductLimit(8)
            setProducts(data)
        }
        getData()
    }, [])

    const handleFilterChange = (filterChoosen: string) => {
        setFilter(filterChoosen)
    }
    return (
        <>
            <PageHeader></PageHeader>
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-3 col-md-12">
                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by Category</h5>
                            <ShopFillter onFilterChange={handleFilterChange}></ShopFillter>
                        </div>

                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by Price</h5>
                            <form>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-all" />
                                    <label className="custom-control-label" htmlFor="price-all">All Color</label>
                                    <span className="badge border font-weight-normal">1000</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-1" />
                                    <label className="custom-control-label" htmlFor="color-1">Black</label>
                                    <span className="badge border font-weight-normal">150</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-2" />
                                    <label className="custom-control-label" htmlFor="color-2">White</label>
                                    <span className="badge border font-weight-normal">295</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-3" />
                                    <label className="custom-control-label" htmlFor="color-3">Red</label>
                                    <span className="badge border font-weight-normal">246</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-4" />
                                    <label className="custom-control-label" htmlFor="color-4">Blue</label>
                                    <span className="badge border font-weight-normal">145</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                    <input type="checkbox" className="custom-control-input" id="color-5" />
                                    <label className="custom-control-label" htmlFor="color-5">Green</label>
                                    <span className="badge border font-weight-normal">168</span>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <ProductList productList={products} title={`Shop Page 1`}></ProductList>
                    </div>
                    <div className="col-12 pb-1">
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center mb-3">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Shop;
