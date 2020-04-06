import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import CartDetail from "./CartDetail";
import {loginUserSucess} from "../redux/actions/authActions";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 530,
    },
    button: {
        margin: theme.spacing(1),
    },
    category: {
        textTransform: 'upperCase',
    },
}));

const MenuList = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    let [cartItem, setCartItem] = useState([]);
    let [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || ''));
    let menuList = props.menuList;

    const isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    /*
    * Adds Item to the Cart
    * @param {e} event Event on input
    * @return nothing
    * */
    const addItemToCart = (e) => {
        let itemId = parseInt(e.target.getAttribute('data-id'))
        let userCart = user.cart;
        let index = userCart.findIndex((element) => {
            return element.id === itemId;
        })

        let itemToAdd = {};
        if (index !== -1) {
            let qty = userCart[index].qty
            qty = qty + 1;
            itemToAdd = {'id': itemId, 'qty': qty};
            userCart[index] = itemToAdd;
        } else {
            itemToAdd = {'id': itemId, 'qty': 1};
            userCart.push(itemToAdd);
        }
        setCartItem(userCart)

        updateUserCart(userCart);
    }
    /*
    * Remove Item from the Cart
    * @param {e} event Event on input
    * @return nothing
    * */
    const removeItemFromCart = (e) => {
        let itemId = parseInt(e.target.value)
        let userCart = user.cart;
        let index = userCart.findIndex((element) => {
            return element.id === itemId;
        })

        let itemToAdd = {};
        if (index !== -1) {
            let qty = userCart[index].qty
            if (qty>1) {
                qty = qty - 1;
                itemToAdd = {'id': itemId, 'qty': qty};
                userCart[index] = itemToAdd;
            } else if(qty === 1) {
                userCart.splice(index,1)
            }
        }
        setCartItem(userCart)

        updateUserCart(userCart);
    }

    const updateUserCart = (userCart) => {
        let cart = {'cart': userCart}
        let userTemp = {...user, ...cart}
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(userTemp))
        dispatch(loginUserSucess(userTemp));
        setUser(userTemp)
    }

    return (
        <div className="container padding-10-0">
            <div className="row">
                <div className="col-md-7 text-center">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableBody>
                                {(menuList.length > 0) &&
                                (menuList.map((category, i) => (
                                        <>
                                            <TableRow key={category.name} >
                                                <TableCell component="th" scope="row" className={classes.category}>
                                                    {category.name}
                                                </TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                            {!isEmpty(category.items) && (
                                                category.items.map((item, i) => (
                                                    <TableRow key={item.id} style ={ i % 2? { background : '#ffffff' }:{ background : '#fafafa' }}>
                                                        <TableCell component="th" scope="row">
                                                            {item.name}
                                                            <br/>
                                                            <span>{item.description}</span>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Button
                                                                size="small"
                                                                variant="contained"
                                                                color="secondary"
                                                                onClick={addItemToCart}
                                                                className={classes.button}
                                                                data-id={item.id}
                                                            >
                                                                <span data-id={item.id}>{item.price} +</span>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )))}
                                        </>
                                    ))
                                )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="col-md-5 outer-div text-center">
                    <CartDetail user={user} menuList={menuList} addItemToCart={addItemToCart}
                                  removeItemFromCart={removeItemFromCart}/>
                </div>
            </div>
        </div>
    )
}

export default MenuList;