import * as React from 'react';
import { connect } from 'react-redux'
import TableCell from '@material-ui/core/TableCell';
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import SendIcon from '@material-ui/icons/Send';
import EditSendIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import DeliveryIcon from '@material-ui/icons/LocalShipping';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { handleOrderStatusChange, handleSubmitDeliveryTrackNumber, deliveryTrack, insertDeliveryTrack } from '../../redux/actions/gridActions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import classnames from 'classnames';
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'

const styles = theme => ({
    formatDateCell: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    button: {

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
    },
    latestInfo: {
        color: blue[500]
    },
    trackingNumber: {
        color: green[500],
        fontSize: 18
    }
});
class FormatActionCellBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryTrackDialogOpen: false,
            updateDeliveryTrackDialogOpen: false,
            deliveryTrackInfoDialogOpen: false
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
        this.props.handleSubmitDeliveryTrackNumber(orderId, deliveryTrackNumber);
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
        this.props.handleSubmitDeliveryTrackNumber(orderId, deliveryTrackNumber);
        this.setState({ updateDeliveryTrackDialogOpen: false });
    };

    //check Delivery Track info

    handleDeliveryTrackDialogClose = () => {
        this.setState({ deliveryTrackInfoDialogOpen: false });
        this.props.clearDeliveryTrack();
    };

    handleDeliveryTrack = (orderId) => {
        this.props.deliveryTrack(orderId);
        this.setState({ deliveryTrackInfoDialogOpen: true });
    }

    render(){
        const { deliveryTracking, value, classes, loading, handleOrderStatusChange } = this.props;
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
                    value.status === 'sent' &&
                        <Tooltip id="tooltip-edit-quantity" title="修改运单号" placement="right">
                        <IconButton color="primary" className={classes.button} aria-label="修改运单号" onClick={this.handleClickOpenUpdateDeliveryTrackDialog}>
                            <EditSendIcon />
                        </IconButton>
                    </Tooltip>

                }

                {
                    value.delivery_track_number.length > 0 && <Tooltip id="tooltip-track-delivery" title="查看物流" placement="right">
                        <IconButton color="primary" className={classes.button} aria-label="查看物流" onClick={(e) =>this.handleDeliveryTrack(value.id)}>
                            <DeliveryIcon />
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

                <Dialog
                    open={this.state.deliveryTrackInfoDialogOpen}
                    onClose={this.handleDeliveryTrackDialogClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">物流查询</DialogTitle>
                    <DialogContent>
                        {
                            deliveryTracking.map(function(deliveryInfo, index){
                                return <div key={index}>
                                    <List dense={true}>
                                        <ListItem className={classes.trackingNumber}>
                                            运单号: { deliveryInfo.track_number}
                                        </ListItem>
                                        {
                                            deliveryInfo.details.map(function(details, index){
                                                return  <ListItem key={index} className={classnames({ [classes.latestInfo]: index === 0 })}>
                                                    {`${details.time}  ${details.location} ${details.description}`}
                                                </ListItem>
                                            })
                                        }
                                    </List>
                                    <Divider />
                                </div>
                            })
                        }

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDeliveryTrackDialogClose} color="primary">
                            关闭
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableCell>
        )
    }
}


const mapStateToProps = (state) => ({
    deliveryTracking: state.grid.deliveryTracking,
    loading: state.root.loading
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleOrderStatusChange:(orderId, status)=>{
            dispatch(handleOrderStatusChange(orderId, status))
        },
        handleSubmitDeliveryTrackNumber:(orderId, trackNumber)=>{
            dispatch(handleSubmitDeliveryTrackNumber(orderId, trackNumber))
        },
        deliveryTrack:(orderId)=>{
            dispatch(deliveryTrack(orderId))
        },
        clearDeliveryTrack: () => {
            dispatch(insertDeliveryTrack([]))
        }
    }
};

export const FormatActionCell = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'FormatActionCell' })(FormatActionCellBase));