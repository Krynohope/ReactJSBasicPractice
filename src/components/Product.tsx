import { Link } from "react-router-dom";
import { ProductModel } from "../models/Product";
import { useDispatch } from "react-redux";
import { add, CartItem } from "../redux/cartSlice";
import { useSnackbar } from 'notistack';

export const priceFormat = (price: number): string =>
    Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
interface Props {
    product: ProductModel
}

const Product = ({ product }: Props) => {
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch()

    function priceDisplay(product: ProductModel) {
        if (product.sale_price) {
            return (
                <>
                    <h6>{priceFormat(product.sale_price)}</h6>
                    <h6 className="text-muted ml-2"><del>{priceFormat(product.price)}</del></h6>
                </>
            )
        }
        return (
            <>
                <h6>{priceFormat(product.price)}</h6>
            </>
        )
    }


    const handleClick = () => {
        if (product.storage_quantity > 1) {

            const cartItem: CartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                sale_price: product.sale_price,
                img: product.img,
                quantity: 1
            }
            enqueueSnackbar(`Added ${cartItem.name}`, {
                variant: "success", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
            dispatch(add(cartItem))
        } else {
            enqueueSnackbar('Product sold out !', {
                variant: "warning", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
        }
    }

    return (
        <>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img className="img-fluid w-100" src={product.img} alt="" />
                    </div>
                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 className="text-truncate mb-3">{product.name}</h6>
                        <div className="d-flex justify-content-center">
                            {priceDisplay(product)}
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">
                        <Link to={`/detail/${product.id}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>Detail</Link>
                        <button onClick={handleClick} className="btn btn-sm text-dark p-0"><i
                            className="fas fa-shopping-cart text-primary mr-1"></i>Add</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;