import React, { Suspense } from "react";
import { ProductModel } from "../models/Product";
import ProductSkeleton from "../partials/ProductSkeleton/ProductSkeleton";
const Product = React.lazy(() => import('./Product'));


interface Props {
    productList: ProductModel[], title: string
}

const ProductList = ({ productList, title }: Props) => {
    return (
        <>
            <div className="container-fluid pt-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5 mb-4"><span className="px-2">{title}</span></h2>
                </div>
                <div className="row px-xl-5 pb-3">
                    {productList.map((item: ProductModel) =>
                        <Suspense key={item.id} fallback={<ProductSkeleton />}>
                            <Product product={item} />
                        </Suspense>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductList;