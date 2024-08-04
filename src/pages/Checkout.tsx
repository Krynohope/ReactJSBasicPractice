import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { ChangeEvent, useEffect, useState } from "react"
import { Order, FormData, validateField, validateForm, ValidationErrors } from "../auth/validation"
import { CartItem, clear } from '../redux/cartSlice';
import request from "../utils/request";
import { enqueueSnackbar } from "notistack";
import { priceFormat } from '../components/Product';
import { useNavigate } from "react-router-dom";


const Checkout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state: RootState) => state.cart)
    const uid: string = useSelector((state: RootState) => state.authen.user.id)
    const cartTotal = cart.reduce((sum, item: CartItem) => item.sale_price ? sum + item.sale_price * item.quantity : sum + item.price * item.quantity, 0);

    const [payment, setPayment] = useState<string>('direct')
    const [isConfirm, setConfirm] = useState<boolean>(false)
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [formData, setFormData] = useState<FormData>({})

    useEffect(() => {
        const getInfo = async () => {
            const req = await request.get(`account/profile/${uid}`);
            setFormData(req.data);
        }
        getInfo();
    }, [])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);

        setErrors({ ...errors, [name]: validateField(name, value) });

    }
    const handleChangePayment = (payment: string) => {
        payment === 'direct' && setPayment('direct')
        payment === 'zalopay' && setPayment('zalopay')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const formErrors = validateForm(formData);
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            const formDataRequest: Order = {
                userId: uid,
                addr: formData.addr,
                phone: formData.phone,
                email: formData.email,
                receiver: formData.fullname,
                method: payment,
                time: Date.now(),
                total: cartTotal,
                cart: cart
            }
            try {

                const saveRecuest = await request.post(`api/bills/add/`, formDataRequest);
                console.log(saveRecuest);
                dispatch(clear())
                enqueueSnackbar('success')
                setTimeout(() => {
                    navigate('/checkout-success');
                }, 2000);

            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }

    };

    return (
        <>
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-6">
                        <div className="mb-4">
                            <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={formData.email ?? ""}
                                        readOnly={isConfirm}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fullname" className="form-label">Fullname</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                                        id="fullname"
                                        name="fullname"
                                        value={formData.fullname ?? ""}
                                        onChange={handleChange}
                                        readOnly={isConfirm}
                                    />
                                    {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="addr" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.addr ? 'is-invalid' : ''}`}
                                        id="addr"
                                        name="addr"
                                        value={formData.addr ?? ""}
                                        onChange={handleChange}
                                        readOnly={isConfirm}
                                    />
                                    {errors.addr && <div className="invalid-feedback">{errors.addr}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                        id="phone"
                                        name="phone"
                                        value={formData.phone ?? ""}
                                        onChange={handleChange}
                                        readOnly={isConfirm}
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                </div>
                                <div className="mb-5">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            name="confirm"
                                            id="confirm"
                                            onClick={() => setConfirm(!isConfirm)}
                                        />
                                        <label className="custom-control-label" htmlFor="confirm">
                                            Confirm Infomation
                                        </label>
                                    </div>
                                </div>
                                <div className="card border-secondary mb-5">
                                    <div className="card-header bg-secondary border-0">
                                        <h4 className="font-weight-semi-bold m-0">Payment</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <div className="custom-control custom-radio">
                                                <input
                                                    type="radio"
                                                    className="custom-control-input"
                                                    name="payment"
                                                    id="directcheck"
                                                    value={payment}
                                                    onChange={() => handleChangePayment('direct')}
                                                />
                                                <label className="custom-control-label" htmlFor="directcheck">
                                                    Direct Check
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-radio">
                                                <input
                                                    type="radio"
                                                    className="custom-control-input"
                                                    name="payment"
                                                    id="zalopay"
                                                    value={payment}
                                                    onChange={() => handleChangePayment('zalopay')}
                                                />
                                                <label className="custom-control-label" htmlFor="zalopay">
                                                    <img style={{ width: '30px' }}
                                                        src="https://haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                                                        alt="zalopay" />
                                                    Zalo Pay
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer border-secondary bg-transparent">
                                        <button className="btn btn-md btn-block btn-primary font-weight-bold my-3 py-3"
                                            disabled={!isConfirm || payment === undefined}>
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                            </div>
                            <div className="card-body">
                                <h5 className="font-weight-medium mb-3">Products</h5>

                                {cart.map((item: CartItem) =>
                                    <div className="d-flex justify-content-between" key={item.id}>
                                        <p>{item.name} | x {item.quantity}</p>
                                        <p>{item.sale_price ? priceFormat(item.sale_price * item.quantity) :
                                            priceFormat(item.price * item.quantity)}
                                        </p>
                                    </div>
                                )}

                                <hr className="mt-0" />
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
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Checkout