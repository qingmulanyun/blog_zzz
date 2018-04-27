import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import Button from 'material-ui/Button';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
import  { ExpansionPanelDetails } from 'material-ui/ExpansionPanel';
import { handleChangeItemQuantity, handleAddItemToCart } from '../redux/actions/cartActions'
import LoginDialog from './loginDialog'
import CartConfirmDialog from './cartConfirmDialog'
const styles = theme => ({
    quantityContainer: {
        width: "50px",
        margin: "0 1em !important",
        display: 'flex',
        textAlign: "center",
        verticalAlign: "middle"
    },
    quantityInput: {
        margin: "0 !important"
    },
    quantityName: {
        lineHeight: 3.5
    },
    button: {
        margin: theme.spacing.unit,
    }
});


class CartComponent extends React.Component{

    render(){
        const {classes, item, itemQuantity, handleChangeItemQuantity, handleAddItemToCart } = this.props;
        return(
        <ExpansionPanelDetails >
            <div className={classes.quantityContainer}>
                <input type="number"
                       min="1"
                       max="99"
                       className={classes.quantityInput}
                       value={itemQuantity}
                       disabled={!item.addable}
                       onChange={(e)=> handleChangeItemQuantity(e.target.value)}
                />
                <span className={classes.quantityName}>件</span>
            </div>

            <Button variant="raised"
                    color="primary"
                    className={classes.button}
                    disabled={!item.addable}
                    onClick={(e)=> handleAddItemToCart(item.id)}
            >
                <AddShoppingCartIcon />
                加入购物车
            </Button>

            { !item.addable && <Button color="secondary" className={classes.button}>
                只有VIP会员可以购买次商品
            </Button>}
            <LoginDialog />
            <CartConfirmDialog />
        </ExpansionPanelDetails>
        );
    }
}

const mapStateToProps = (state) => ({
    itemQuantity: state.cart.itemQuantity,
    requireLogin: state.root.requireLogin
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeItemQuantity:(quantity)=>{
            dispatch(handleChangeItemQuantity(quantity));
        },
        handleAddItemToCart:(itemId)=>{
            dispatch(handleAddItemToCart(itemId));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CartComponent));