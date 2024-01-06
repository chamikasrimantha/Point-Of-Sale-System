import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div>
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
                                    <a class="nav-link" href='' >Cart</a>
                                </li>
                            </ul>
                            <form class="d-flex" role="search">
                                <button class="btn btn-primary" onClick={logout}>Logout</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
