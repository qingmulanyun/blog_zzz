import React from 'react';
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import HideIcon from 'material-ui-icons/KeyboardArrowRight';
import { toggleItemsListPage, handleShowCartItemsListPage, handleDeleteCartItems } from '../redux/actions/cartActions'
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import DeleteIcon from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import { Loading } from '../../utilities/loadingComponent/loading'
import Divider from 'material-ui/Divider';
import { SnackbarContent } from 'material-ui/Snackbar';

const drawerWidth = 400;

const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    drawerPaper: {
        // position: 'relative',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    cartItemsListRoot: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    linkContainer: {
        display: "flex"
    },
    fullWidthbutton: {
        width: "95%",
        margin: theme.spacing.unit,
    },
    cartTitle: {
        paddingLeft: "1em !important"
    }
});

class CartItemsList extends React.Component {

    render() {
        const { classes, loading, cartItems, cartItemsListOpen, hideItemsListPage, showCartItemsListPage, handleDeleteCartItems } = this.props;

        return (
            <Drawer anchor="right"
                    variant="permanent"
                    open={cartItemsListOpen}
                    onClose={hideItemsListPage}
                    classes={{
                        paper: classNames(classes.drawerPaper, !cartItemsListOpen && classes.drawerPaperClose),
                    }}
            >
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar className={classes.cartTitle}>
                            <Typography type="title" color="inherit" className={classes.flex}>
                               { cartItemsListOpen ? "购物车" :  <IconButton onClick={showCartItemsListPage}>
                                   <ShoppingCartIcon />
                                   </IconButton>}
                            </Typography>
                            <IconButton className={classes.button} aria-label="Hide my cart" onClick={hideItemsListPage}>
                                <HideIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </div>

                { cartItemsListOpen && <div className={classes.cartItemsListRoot}>
                    <List>
                        {
                            cartItems.map(function(item){
                                return <div key={item.id}>
                                    <ListItem dense button >
                                        <a className={classes.linkContainer} href={`/items/${item.item_id}`} target="_blank">
                                            <Avatar src={item.image.thumbnail.url} alt={item.name} />
                                            <ListItemText primary={item.name} secondary={`¥ ${item.price}/件， 共 ${item.quantity}件`} />
                                        </a>
                                        <ListItemSecondaryAction>
                                            <IconButton onClick={(e)=> handleDeleteCartItems(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </div>

                            })
                        }
                        { cartItems.length > 0 ? <Button href="/carts/cart_items" target="_blank" variant="raised" color="primary" className={classes.fullWidthbutton}>
                            去购物车结算
                        </Button> : <SnackbarContent
                            className={classes.fullWidthbutton}
                            message={
                                "购物车空空的，快去添加商品吧～"
                            }
                        />}
                    </List>
                   {loading && <Loading />}
                </div>}


            </Drawer>
        );
    }
}
const mapStateToProps = (state) => ({
    currentItem: state.root.item,
    loading: state.root.loading,
    cartItemsListOpen: state.cart.cartItemsListOpen,
    cartItems: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => {
    return {
        hideItemsListPage: ()=> {
            dispatch(toggleItemsListPage(false));
        },
        showCartItemsListPage: ()=> {
            dispatch(handleShowCartItemsListPage());
        },
        handleDeleteCartItems: (cartItemId)=> {
            dispatch(handleDeleteCartItems(cartItemId))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CartItemsList));