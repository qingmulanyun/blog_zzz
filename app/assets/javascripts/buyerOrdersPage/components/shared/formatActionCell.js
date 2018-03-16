import * as React from 'react';
import { connect } from 'react-redux'
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import CancelIcon from 'material-ui-icons/Cancel';
import DeliveryIcon from 'material-ui-icons/LocalShipping';
import ConfirmIcon from 'material-ui-icons/LocalMall';
import Tooltip from 'material-ui/Tooltip';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { cancelOrder, deliveryTrack, insertDeliveryTrack, confirmDelivered } from '../../redux/actions/gridActions'
import List, {
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import classnames from 'classnames';
import blue from 'material-ui/colors/blue'
import Avatar from 'material-ui/Avatar';

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
    }
});
class FormatActionCellBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelOrderDialogOpen: false,
            deliveryTrackDialogOpen: false,
            confirmDeliveredDialogOpen: false
        };
    }

    handleClickOpen = () => {
        this.setState({ cancelOrderDialogOpen: true });
    };

    handleClose = () => {
        this.setState({ cancelOrderDialogOpen: false });
    };

    handleCancelOrder = (orderId) => {
        this.props.cancelOrder(orderId);
        this.setState({ cancelOrderDialogOpen: false });
    };


    handleDeliveryTrackDialogClose = () => {
        this.setState({ deliveryTrackDialogOpen: false });
        this.props.clearDeliveryTrack();
    };

    handleDeliveryTrack = (orderId) => {
        this.props.deliveryTrack(orderId);
        this.setState({ deliveryTrackDialogOpen: true });
    };

    // confirm delivered
    alertConfirmDeliveredDialog = () => {
        this.setState({ confirmDeliveredDialogOpen: true });
    };

    handleConfirmDeliveredDialogClose = () => {
        this.setState({ confirmDeliveredDialogOpen: false });
    };

    handleConfirmDelivered = (orderId) => {
        this.props.confirmDelivered(orderId);
        this.setState({ confirmDeliveredDialogOpen: false });
    }

    render(){
        const { value, classes, deliveryTracking, row } = this.props;
        return (
            <TableCell
                className={classes.formatDateCell}
            >
                {
                    value.status === 'new' && <Tooltip id="tooltip-cancel-order" title="取消订单" placement="right">
                        <IconButton color="primary" className={classes.button} aria-label="取消订单" onClick={this.handleClickOpen}>
                            <CancelIcon />
                        </IconButton>
                    </Tooltip>
                }

                {
                    value.delivery_track_number.length > 0 &&  <Tooltip id="tooltip-track-delivery" title="查看物流" placement="right">
                        <IconButton color="primary" className={classes.button} aria-label="查看物流" onClick={(e) =>this.handleDeliveryTrack(value.id)}>
                            <DeliveryIcon />
                        </IconButton>
                    </Tooltip>
                }

                {
                    value.status === 'sent' && <Tooltip id="tooltip-confirm-delivered" title="确认收货" placement="right">
                        <IconButton color="primary" className={classes.button} aria-label="确认收货" onClick={this.alertConfirmDeliveredDialog}>
                            <ConfirmIcon />
                        </IconButton>
                    </Tooltip>
                }

                <Dialog
                    open={this.state.cancelOrderDialogOpen}
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

                <Dialog
                    open={this.state.deliveryTrackDialogOpen}
                    onClose={this.handleDeliveryTrackDialogClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">物流查询</DialogTitle>
                    <DialogContent>
                        <List dense={true}>
                            {

                                deliveryTracking.map(function(deliveryInfo, index){
                                    return  <ListItem key={index} className={classnames({ [classes.latestInfo]: index+1 === deliveryTracking.length })}>
                                        {`${deliveryInfo.time}  ${deliveryInfo.location} ${deliveryInfo.description} `}
                                    </ListItem>
                                })
                            }
                        </List>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDeliveryTrackDialogClose} color="primary">
                            关闭
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.confirmDeliveredDialogOpen}
                    onClose={this.handleConfirmDeliveredDialogClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">确认收货</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            您确定已经收到货物？
                        </DialogContentText>
                        <List dense={true}>
                            {

                                row.items.map(function(item, index){
                                    return  <ListItem key={index}>
                                        <Avatar src={item.image.thumbnail.url} />
                                        <ListItemText primary={`${item.item_info.name}， ${item.quantity} 件`} />

                                    </ListItem>
                                })
                            }
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleConfirmDeliveredDialogClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={(e) => this.handleConfirmDelivered(value.id)} color="primary">
                            确定
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
        cancelOrder:(orderId)=>{
            dispatch(cancelOrder(orderId))
        },
        deliveryTrack:(orderId)=>{
            dispatch(deliveryTrack(orderId))
        },
        clearDeliveryTrack: () => {
            dispatch(insertDeliveryTrack([]))
        },
        confirmDelivered: (orderId) => {
            dispatch(confirmDelivered(orderId))
        }
    }
};

export const FormatActionCell = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'FormatActionCell' })(FormatActionCellBase));