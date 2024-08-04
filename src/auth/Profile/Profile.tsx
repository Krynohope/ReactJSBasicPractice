import './Profile.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { RootState } from '../../redux/store';
import { validateField, validateForm, ValidationErrors, FormData, Order } from '../validation';
import { priceFormat } from '../../components/Product';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../redux/cartSlice';
import { getOrderDetail, getUserOrders, getUserProfile, updateUserProfile } from '../../services/authService';



const Profile = ({ tab }: { tab: string }) => {

    const userData = useSelector((state: RootState) => state.authen.user)
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState(tab);
    const [user, setUser] = useState<FormData>({});
    const [formData, setFormData] = useState<FormData>({});
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isEditing, setIsEditing] = useState(false);

    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            const userProfile = await getUserProfile(userData.id)
            setUser(userProfile);
            setFormData(userProfile);
        }
        getUsers();
    }, [])

    useEffect(() => {
        const getOrders = async () => {
            const orders = await getUserOrders(userData.id)
            setOrders(orders);
        }
        getOrders();
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {
                const updateRequest = await updateUserProfile(userData.id, formData);

                if (updateRequest.status === 200) {
                    setUser(formData);
                    setIsEditing(false);
                    enqueueSnackbar('Update profile successfully !', { variant: 'success' })
                } else {
                    enqueueSnackbar('Failed to update profile !', { variant: 'error' })
                }
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
    };

    const handleOrderDetail = async (orderId: string | undefined) => {
        if (orderId) {

            try {

                const orderDetail = await getOrderDetail(orderId);
                setSelectedOrder(orderDetail);

            } catch (error) {
                console.log(error);
                enqueueSnackbar('Failed to fetch order details', { variant: 'error' });
            }
        }
    };

    const UserProfile = () => (
        <div className="card">
            <div className="card-body">
                <div className="text-center mb-4">
                    <img
                        src={user.avatar}
                        alt={user.username}
                        className="rounded-circle profile-avatar"
                    />
                    <h2 className="mt-3">{user.username}</h2>
                </div>
                <form onSubmit={handleUpdate} encType='multipart/form-data'>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={user.email ?? ""}
                            readOnly={true}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Fullname</label>
                        <input
                            type="text"
                            className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                            id="fullname"
                            name="fullname"
                            value={formData.fullname ?? "Information has never been updated"}
                            onChange={handleChange}
                            readOnly={!isEditing}
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
                            value={formData.addr ?? "Information has never been updated"}
                            onChange={handleChange}
                            readOnly={!isEditing}
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
                            value={formData.phone ?? "Information has never been updated"}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    {isEditing ? (
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                    ) : (
                        <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                </form>
            </div>
        </div>
    );

    const OrdersHistory = () => (
        <div className="card shadow-sm">
            <div className="card-body">
                <h3 className="card-title text-primary mb-4">Order History</h3>
                <ul className="list-group list-group-flush">
                    {orders.length === 0 &&
                        <span className='d-flex justify-content-center'>No orders</span>
                    }
                    {orders.map(order => (
                        <li key={order.id} className="list-group-item border-bottom py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">Order #{order.id}</h5>
                                    <p className="mb-1 text-muted">Date: {new Date(order.time).toUTCString()}</p>
                                    <p className="mb-1">Quantity: {order.cart.length}</p>
                                    <p className="mb-1">Total: {priceFormat(order.total)}</p>
                                    <span className='badge bg-primary'>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="buttons">
                                    <button
                                        className="btn btn-outline-primary btn-sm d-block mb-3"
                                        onClick={() => handleOrderDetail(order.id)}>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {selectedOrder && (
                    <OrderDetail
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                    />
                )}
            </div>
        </div>
    );
    const OrderDetail = ({ order, onClose }: { order: Order, onClose: () => void }) => {
        return (
            <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Order Details - #{order.id}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Date:</strong> {new Date(order.time).toUTCString()}</p>
                            <p><strong>Status:</strong> <span className="badge bg-primary">{order.status}</span></p>
                            <p><strong>Payment method:</strong> <span>{order.method}</span></p>
                            <p><strong>Receiver:</strong> <span>{order.receiver}</span></p>
                            <p><strong>Email:</strong> <span>{order.email}</span></p>
                            <p><strong>Phone:</strong> <span>{order.phone}</span></p>
                            <p><strong>Address:</strong> <span>{order.addr}</span></p>
                            <p><strong>Total:</strong> {priceFormat(order.total)}</p>
                            <h6>Items:</h6>
                            <ul className="list-group">
                                {order.cart.map((item: CartItem) => (
                                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span><img src={item.img} className="mr-2" width={'50px'} alt="" />{item.name} x {item.quantity}</span>
                                        <span>{priceFormat(item.price * item.quantity)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 profile-sidebar">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab('profile');
                                    navigate('/profile');
                                }}>
                                <i className="fas fa-user"></i> Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab('orders');
                                    navigate('/orders-history');
                                }}>
                                <i className="fas fa-shopping-bag"></i> Order History
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-9 profile-content">
                    {activeTab === 'profile' ? <UserProfile /> : <OrdersHistory />}
                </div>
            </div>
        </div>
    );
};

export default Profile;
