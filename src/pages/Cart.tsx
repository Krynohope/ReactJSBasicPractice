import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/store";
import { CartItem, decrease, increase, remove } from '../redux/cartSlice';
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { priceFormat } from "../components/Product";

const Cart = () => {

    const dispatch = useDispatch()
    const navaigate = useNavigate()

    const cartLocal = useSelector((state: RootState) => state.cart)
    const isAuthen = useSelector((state: RootState) => state.authen.isAuthenticated)

    const cartTotal = cartLocal.reduce((sum, item) => item.sale_price ? sum + item.sale_price * item.quantity : sum + item.price * item.quantity, 0);



    const handleCheckoutRedirect = () => {
        if (!isAuthen) return enqueueSnackbar('You must login in order to checkout ', { variant: "warning" })
        navaigate('/checkout')

    }

    return (
        <>
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-bordered text-center mb-0">
                            <thead className="bg-secondary text-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {cartLocal.length == 0 && <span className="d-flex justify-content-center">No items</span>}
                                {cartLocal?.map((cartItem: CartItem) =>
                                    <tr key={cartItem.id}>
                                        <td className="text-left"><img className="mr-5" src={cartItem.img} alt={`cart-item-${cartItem.id}`} style={{ width: "50px" }} />{cartItem.name}</td>
                                        <td className="align-middle">{cartItem.sale_price ? priceFormat(cartItem.sale_price) : priceFormat(cartItem.price)}</td>
                                        <td className="align-middle">
                                            <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
                                                <div className="input-group-btn">
                                                    <button onClick={() => dispatch(decrease(cartItem))} className="btn btn-sm btn-primary btn-minus" >
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input type="text" readOnly className="form-control form-control-sm bg-secondary text-center" value={cartItem.quantity} />
                                                <div className="input-group-btn">
                                                    <button onClick={() => dispatch(increase(cartItem))} className="btn btn-sm btn-primary btn-plus">
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">{cartItem.sale_price ? priceFormat(cartItem.sale_price * cartItem.quantity) : priceFormat(cartItem.price * cartItem.quantity)}</td>
                                        <td className="align-middle"><button onClick={() => dispatch(remove(cartItem))} className="btn btn-sm btn-primary"><i className="fa fa-times"></i></button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <form className="mb-5" action="">
                            <div className="input-group">
                                <input type="text" className="form-control p-4" placeholder="Coupon Code" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Subtotal</h6>
                                    <h6 className="font-weight-medium">{priceFormat(cartTotal)}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">0</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Total</h5>
                                    <h5 className="font-weight-bold">{priceFormat(cartTotal)}</h5>
                                </div>
                                <button className="btn btn-block btn-primary my-3 py-3"
                                    onClick={handleCheckoutRedirect}
                                    disabled={cartLocal.length === 0}>Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart