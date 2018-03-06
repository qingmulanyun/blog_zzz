import * as React from 'react';
import { connect } from 'react-redux'
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AddShoppingCart from 'material-ui-icons/AddShoppingCart';
import SendIcon from 'material-ui-icons/Send';
import EditSendIcon from 'material-ui-icons/Edit';
import Tooltip from 'material-ui/Tooltip';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { handleOrderStatusChange, handleSubmitDeliveryTrackNumber } from '../../redux/actions/gridActions'

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
            deliveryTrackDialogOpen: false,
            updateDeliveryTrackDialogOpen: false
        };
    }

    handleClickOpenDeliveryTrackDialog = () => {
        this.setState({ deliveryTrackDialogOpen: true });
    };

    handleCloseDeliveryTrackDialog = () => {
        this.setState({ deliveryTrackDialogOpen: false });
    };

    submitDeliveryTrackNumber = (orderId) => {
        const deliveryTrackNumber = this.refs.deliveryTrackNumber.value;
        this.props.handleSubmitDeliveryTrackNumber(orderId, deliveryTrackNumber)
        this.setState({ deliveryTrackDialogOpen: false });
    };

    //update track number

    handleClickOpenUpdateDeliveryTrackDialog = () => {
        this.setState({ updateDeliveryTrackDialogOpen: true });
    };

    handleCloseUpdateDeliveryTrackDialog = () => {
        this.setState({ updateDeliveryTrackDialogOpen: false });
    };

    submitUpdatedDeliveryTrackNumber = (orderId) => {
        const deliveryTrackNumber = this.refs.updatedDeliveryTrackNumber.value;
        this.props.handleSubmitDeliveryTrackNumber(orderId, deliveryTrackNumber)
        this.setState({ updateDeliveryTrackDialogOpen: false });
    };

    render(){
        const { tableColumn, value, classes, style, handleOrderStatusChange } = this.props;
        return (
            <TableCell
                className={classes.formatDateCell}
            >
                {
                    value.status === 'new' &&  <Tooltip id="tooltip-edit-quantity" title="采购货物" placement="right">
                        <IconButton color="primary" className={classes.button} aria-label="采购货物" onClick={(e)=> handleOrderStatusChange(value.id ,'buying')}>
                            <AddShoppingCart />
                        </IconButton>
                    </Tooltip>
                }
                {
                    value.status === 'buying' &&  <Tooltip id="tooltip-edit-quantity" title="发货" placement="right">
                        <IconButton color="primary" className={classes.button} aria-label="发货" onClick={this.handleClickOpenDeliveryTrackDialog}>
                            <SendIcon />
                        </IconButton>
                    </Tooltip>
                }
                {
                    value.status === 'sent' &&  <Tooltip id="tooltip-edit-quantity" title="修改运单号" placement="right">
                        <IconButton color="primary" className={classes.button} aria-label="修改运单号" onClick={this.handleClickOpenUpdateDeliveryTrackDialog}>
                            <EditSendIcon />
                        </IconButton>
                    </Tooltip>
                }
                <Dialog
                    open={this.state.deliveryTrackDialogOpen}
                    onClose={this.handleDeliveryTrackDialogClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">添加运单号</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请输入订单 {value.id} 的运单号。
                        </DialogContentText>

                        <input
                            defaultValue=""
                            ref="deliveryTrackNumber"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDeliveryTrackDialog} color="primary">
                            取消
                        </Button>
                        <Button onClick={(e) => this.submitDeliveryTrackNumber(value.id)} color="primary">
                            提交
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.updateDeliveryTrackDialogOpen}
                    onClose={this.handleCloseUpdateDeliveryTrackDialog}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">修改运单号</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请输入订单 {value.id} 的运单号。
                        </DialogContentText>

                        <input
                            defaultValue={value.delivery_track_number}
                            ref="updatedDeliveryTrackNumber"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseUpdateDeliveryTrackDialog} color="primary">
                            取消
                        </Button>
                        <Button onClick={(e) => this.submitUpdatedDeliveryTrackNumber(value.id)} color="primary">
                            提交
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
        handleOrderStatusChange:(orderId, status)=>{
            dispatch(handleOrderStatusChange(orderId, status))
        },
        handleSubmitDeliveryTrackNumber:(orderId, trackNumber)=>{
            dispatch(handleSubmitDeliveryTrackNumber(orderId, trackNumber))
        }
    }
};

export const FormatActionCell = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'FormatActionCell' })(FormatActionCellBase));