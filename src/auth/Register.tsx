import { FormEvent, FocusEvent, useState, ChangeEvent } from 'react';
import { validateField, validateForm, ValidationErrors, FormData } from './validation';
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack';
import { registerProcess } from '../services/authService';




const Register = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value, formData) }));
        }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value, formData) }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        setErrors(formErrors);
        setTouched({
            username: true,
            email: true,
            password: true,
            confirmPassword: true
        });
        if (Object.keys(formErrors).length === 0) {
            // console.log('Login submitted', formData);
            try {
                const res = await registerProcess(formData)

                // console.log(req.data);
                if (res.status === 201) {
                    enqueueSnackbar('Register successfully', {
                        variant: 'success', anchorOrigin: {
                            horizontal: 'center',
                            vertical: 'top'
                        }
                    });
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000);
                }

            } catch (error: any) {
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
                            <h2>Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example12">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="form1Example12"
                                        className={`form-control form-control-lg ${touched.username && errors.username || errors.UsernameError ? 'is-invalid' : ''}`}
                                        value={formData.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />

                                    {touched.username && errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                    {errors.UsernameError && <div className="invalid-feedback">{errors.UsernameError}</div>}

                                </div>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example13">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="form1Example13"
                                        className={`form-control form-control-lg ${touched.email && errors.email || errors.EmailError ? 'is-invalid' : ''}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />

                                    {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    {errors.EmailError && <div className="invalid-feedback">{errors.EmailError}</div>}


                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example23">Password</label>
                                    <input
                                        type="password"
                                        id="form1Example23"
                                        name="password"
                                        className={`form-control form-control-lg ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />

                                    {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}

                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example31">Confirm Password</label>
                                    <input
                                        type="password"
                                        name='confirmPassword'
                                        id="form1Example31"
                                        className={`form-control form-control-lg ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {touched.confirmPassword && errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}

                                </div>
                                <div className="mb-4">
                                    <Link to="/login">Already have account ?</Link>
                                </div>

                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block">Register</button>

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

export default Register