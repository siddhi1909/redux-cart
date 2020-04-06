// IMPORT EXTERNAL LIBRARIES/MODULES
import React, {useState, useEffect, useContext, useRef} from 'react';
import {useHistory} from "react-router-dom";
import {ReactReduxContext, useDispatch} from 'react-redux';
// IMPORT API & ROUTE ACTIONS
import {loginUserFailure} from '../redux/actions/authActions';
import MenuList from "./MenuList";
import jsonData from './../menu.json';

const Dashboard = () => {
    const {store} = useContext(ReactReduxContext);
    const user = store.getState().auth.user || localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{};
    const userName = (user && user.username)?user.username : '';
    const dispatch = useDispatch();
    const results = jsonData.menu;
    const history = useHistory();
    let menuList = [...results] || [];

    /*
    * onLogout function for user Loagout
    * */
    const onLogout = () => {
        /* removes user from Localstorage */
        localStorage.removeItem('user');
        dispatch(loginUserFailure());
        history.push("/");
    }

    return (
        <>
            <div className="container-fluid sticky-top navbar-light bg-light padding-top-bottom-10">
                <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4 text-right">
                        <span className="user-dashboard">Hi! {userName}</span>
                        <button onClick={onLogout} className="btn btn-outline-success float-right btn-sm"
                                type="button">Logout
                        </button>
                    </div>
                </div>
            </div>
            <MenuList menuList={menuList}/>
        </>
    );
}

export default Dashboard;