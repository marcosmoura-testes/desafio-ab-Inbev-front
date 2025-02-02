import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Welcome to the Home Page</h1>
            <div className="d-grid gap-2 col-6 mx-auto">
                <Link to="/employee-register" className="btn btn-primary">
                    Register Employee
                </Link>
            </div>
        </div>
    );
}

export default Home;
