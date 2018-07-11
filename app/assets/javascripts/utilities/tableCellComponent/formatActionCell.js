import * as React from 'react';
import { connect } from 'react-redux'
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { handleCartItemQuantityChange } from '../../cartPage/redux/actions/gridActions'

const styles = theme => ({
    formatDateCell: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    quantityContainer: {
        width: "100px",
        display: 'flex',
        textAlign: "center",
        verticalAlign: "middle"
    },
    quantityInput: {
        margin: "0 !important"
    },
    quantityName: {
        lineHeight: 3.5
    }
});
class FormatActionCellBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleEditCartItemQuantity = (cartItemId) => {
        const quantity = this.refs.cartItemQuantity.value;
        this.props.handleCartItemQuantityChange(cartItemId, quantity);
        this.setState({ open: false });
    };


    render(){
        const { tableColumn, value, classes, style } = this.props;
        return (
            <TableCell
                className={classes.formatDateCell}
            >
                <Tooltip id="tooltip-edit-quantity" title="修改数量" placement="left">
                    <IconButton color="primary" className={classes.button} aria-label="修改数量" onClick={this.handleClickOpen}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">修改数量</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            修改购物车中 {value.name} 的数量：
                        </DialogContentText>
                        <div className={classes.quantityContainer}>
                            <input type="number"
                                   min="1"
                                   max="99"
                                   className={classes.quantityInput}
                                   defaultValue={value.quantity.toString()}
                                   ref="cartItemQuantity"
                            />
                            <span className={classes.quantityName}>件</span>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={(e) => this.handleEditCartItemQuantity(value.id)} color="primary">
                            修改
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableCell>
        )
    }
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => {
    return {
        handleCartItemQuantityChange:(carItemId, quantity)=>{
            dispatch(handleCartItemQuantityChange(carItemId, quantity))
        }
    }
};

export const FormatActionCell = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'FormatActionCell' })(FormatActionCellBase));