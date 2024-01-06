import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminNavBar() {

    const navigate = useNavigate();

    const home = () => {
        navigate("/admin");
    }

    const category = () => {
        navigate("/admin/categories");
    }

    const item = () => {
        navigate("/admin/items");
    }

    const stock = () => {
        navigate("/admin/stocks");
    }

    const order = () => {
        navigate("/admin/orders");
    }

    const customer = () => {
        navigate("/admin/customers");
    }

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a class="navbar-brand" href="">POS Software</a>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="" onClick={home}>Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href='' onClick={category}>Categories</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href='' onClick={item}>Items</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href='' onClick={stock}>Stocks</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href='' onClick={order}>Orders</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href='' onClick={customer}>Customers</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <button class="btn btn-primary" onClick={logout}>Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
