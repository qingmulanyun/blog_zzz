import * as React from 'react';
import { connect } from 'react-redux'
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import CancelIcon from 'material-ui-icons/Cancel';
import Tooltip from 'material-ui/Tooltip';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { cancelOrder } from '../../redux/actions/gridActions'

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

    handleCancelOrder = (orderId) => {
        this.props.cancelOrder(orderId);
        this.setState({ open: false });
    }


    render(){
        const { tableColumn, value, classes, style } = this.props;
        return (
            <TableCell
                className={classes.formatDateCell}
            >
                {
                    value.status === 'new' &&  <Tooltip id="tooltip-edit-quantity" title="取消订单" placement="right">
                        <IconButton color="primary" className={classes.button} aria-label="取消订单" onClick={this.handleClickOpen}>
                            <CancelIcon />
                        </IconButton>
                    </Tooltip>
                }


                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">取消订单</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            您确定要取消该订单（{value.id}）？
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={(e) => this.handleCancelOrder(value.id)} color="primary">
                            确定
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
        cancelOrder:(orderId)=>{
            dispatch(cancelOrder(orderId))
        }
    }
};

export const FormatActionCell = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'FormatActionCell' })(FormatActionCellBase));