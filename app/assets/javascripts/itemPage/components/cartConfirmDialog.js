import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { handleCloseCartConfirmDialog } from '../redux/actions/cartActions'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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


class CartConfirmDialog extends React.Component{

    render(){
        const {classes, addedItem, addedQuantity, handleCloseCartConfirmDialog, cartConfirmdialogOpen } = this.props;

        return(
            <Dialog
                open={cartConfirmdialogOpen}
                onClose={handleCloseCartConfirmDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"添加成功"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       您已添加 {addedQuantity} 件 {addedItem.name} 到购物车。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCartConfirmDialog} color="primary" autoFocus>
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    addedItem: state.cart.addedItem,
    addedQuantity: state.cart.addedQuantity,
    cartConfirmdialogOpen: state.cart.cartConfirmdialogOpen
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleCloseCartConfirmDialog:()=>{
            dispatch(handleCloseCartConfirmDialog());
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CartConfirmDialog));