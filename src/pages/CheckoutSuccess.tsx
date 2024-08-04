
const CheckoutSuccess = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h2 className="card-title text-success mb-4">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                Order Placed Successfully!
                            </h2>
                            <h5 className="mb-4">Thank you for your purchase</h5>
                            <p className="card-text">
                            </p>
                            <p className="card-text">
                            </p>
                            <p className="card-text mb-4">
                                We've sent a confirmation email with your order details.
                            </p>
                            <a href="/" className="btn btn-primary btn-lg">Return to Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;