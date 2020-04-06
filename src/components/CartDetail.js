import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const CartDetail = (props) => {
    let userCart = props.user.cart;
    let menuList = props.menuList;
    let addItemToCart = props.addItemToCart;
    let removeItemFromCart = props.removeItemFromCart;
    var itemPrice, totalPrice = 0;
    var menuListFormatted = []
    var valueItems = [];
    menuList.map((value, i) => {
        valueItems = value.items;
        menuListFormatted.push(...valueItems);
    })

    userCart.map((item, i) => {
        let index = menuListFormatted.findIndex((element) => {
            return element.id === parseInt(item.id);
        })
        if (index != -1) {
            itemPrice = menuListFormatted[index].price ? menuListFormatted[index].price : 0;
            item.name = menuListFormatted[index].name ? menuListFormatted[index].name : '';
            item.price = itemPrice * parseInt(item.qty);
            item.menuId = menuListFormatted[index].id;
            totalPrice += item.price
        }
    })
    return (
        <>
            <div className="text-left"><List component="nav" aria-label="secondary mailbox folders">
                <ListItem button style={{backgroundColor: '#000', color: '#fff'}}>
                    <ListItemText primary="YOUR ORDER"/>
                </ListItem>
            </List>
                <Divider/>
                <List component="nav" aria-label="secondary mailbox folders">
                    {userCart && userCart.length > 0 && (
                        userCart.map((item, i) => (
                            <ListItem button key={item.id}>
                                <ListItemText>
                                    <button onClick={addItemToCart} data-id={item.menuId}>+</button>
                                    {item.name}
                                    <button onClick={removeItemFromCart} value={item.menuId}>-</button>
                                    <span style={{float: 'right'}}>{item.price}</span>
                                </ListItemText>
                            </ListItem>
                        )))}
                </List>
                <Divider/>
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button>
                        <ListItemText>Total: {totalPrice}</ListItemText>
                    </ListItem>
                </List>
            </div>
        </>
    )
}

export default CartDetail;