import { useState, FormEvent, FocusEvent, ChangeEvent } from "react"
import { validateField, validateForm, ValidationErrors, FormData } from './validation';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { enqueueSnackbar } from "notistack";
import { loginProcess } from "../services/authService";


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<ValidationErrors>({});

    const [touched, setTouched] = useState<{ [key: string]: boolean }>({
        email: false,
        password: false
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (touched[name]) {
            setErrors({ ...errors, [name]: validateField(name, value) });
        }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        setErrors(formErrors);
        setTouched({ email: true, password: true });
        if (Object.keys(formErrors).length === 0) {
            // console.log('Login submitted', formData);
            try {
                const res = await loginProcess(formData)

                const userData = {
                    id: res.data.id,
                    username: res.data.username,
                    avatar: res.data.avatar,
                    accessToken: res.data.accessToken
                }
                dispatch(login(userData))
                enqueueSnackbar('Login successfully !', {
                    variant: 'success', anchorOrigin: {
                        horizontal: 'center',
                        vertical: 'top'
                    }
                });
                setTimeout(() => {
                    navigate('/home')
                }, 3000);

            } catch (error: any) {
                console.log(error);
                setErrors({ [error.response.data.error]: error.response.data.message })
            }
        }
    };

    return (
        <>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h2>Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example13">Email address</label>
                                    <input
                                        type="email"
                                        id="form1Example13"
                                        name="email"
                                        className={`form-control form-control-lg ${touched.email && errors.email || errors.EmailError ? 'is-invalid' : ''}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    {errors.EmailError && <div className="invalid-feedback">{errors.EmailError}</div>}
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example23">Password</label>
                                    <input
                                        type="password"
                                        id="form1Example23"
                                        name="password"
                                        className={`form-control form-control-lg ${touched.password && errors.password || errors.PasswordError ? 'is-invalid' : ''}`}
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    {errors.PasswordError && <div className="invalid-feedback">{errors.PasswordError}</div>}

                                </div>

                                <div className="mb-4">
                                    <Link to="/register">Create an account ?</Link>
                                </div>

                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block">Sign in</button>

                                <a data-mdb-ripple-init className="btn btn-primary btn-lg btn-block bg-light" href="#!"
                                    role="button">
                                    <i className="fab fa-google"></i> Continue with Google
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login