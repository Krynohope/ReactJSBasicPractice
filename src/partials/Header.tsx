import { Link } from 'react-router-dom';
import type { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/authSlice';
import { enqueueSnackbar } from 'notistack';
import UserMenu from './userMenu/UserMenu';

const Header = () => {

    const cartQuanity = useSelector((state: RootState) => state.cart.length)
    const user = useSelector((state: RootState) => state.authen.user)

    const dispatch = useDispatch()
    const handleLogout = () => {
        const confirmLogout = confirm('Logout right now ?')

        if (confirmLogout) {

            dispatch(logout())
            enqueueSnackbar('Logout successfully !', {
                variant: 'success', anchorOrigin: {
                    horizontal: 'center',
                    vertical: 'top'
                }
            })
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row align-items-center py-3 px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <a href="" className="text-decoration-none">
                            <h1 className="m-0 display-5 font-weight-semi-bold"><span
                                className="text-primary font-weight-bold border px-3 mr-1">K</span>Shop</h1>
                        </a>
                    </div>
                    <div className="col-lg-6 col-6 text-left">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold"><span
                                    className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                            </a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to='/home' className="nav-item nav-link active">Home</Link>
                                    <Link to='/shop' className="nav-item nav-link ">Shop</Link>
                                    <Link to='/contact' className="nav-item nav-link ">Contact</Link>
                                </div>
                            </div>
                            <form >
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search for products" />
                                    <div className="input-group-append">
                                        <span className="input-group-text bg-transparent text-primary">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </nav>

                    </div>

                    {user.accessToken ?
                        <div className=" d-flex justify-content-end col-lg-3 col-6 text-right">
                            <UserMenu
                                username={user.username}
                                avatar={user.avatar}
                                onLogout={handleLogout}
                            />
                            <Link to="/cart" className="btn border">
                                <i className="fas fa-shopping-cart text-primary mr-2"></i>
                                <span className="text-primary">{cartQuanity}</span>
                            </Link>
                        </div>
                        : <div className="col-lg-3 col-6 text-right">
                            <Link to='/login' className="btn btn-primary mr-2">Login</Link>
                            <Link to='/register' className="btn btn-secondary mr-2">Register</Link>
                            <Link to="/cart" className="btn border">
                                <i className="fas fa-shopping-cart text-primary mr-2"></i>
                                <span className="text-primary">{cartQuanity}</span>
                            </Link>
                        </div>}
                </div>
            </div>
        </>
    );
}

export default Header;