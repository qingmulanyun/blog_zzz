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
import { fetchingServerData } from '../../redux/actions/rootActions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
    formControl: {
        marginBottom: theme.spacing.unit * 3,
        minWidth: 120,
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
            deliveryTrackInfoDialogOpen: false,
            carriers: [],
            selectedCarrier: props.value.carrier_id,
            deliveryTrackNumber: props.value.delivery_track_number
        };
    }

    getCarriers = () => {
        $.ajax({
            url: '/carriers',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                this.props.fetchingServer(true)
            }.bind(this),
            success: function(data) {
                this.setState({ carriers: data });
                this.props.fetchingServer(false);
            }.bind(this),
            error: function(xhr, status, err) {
                this.props.fetchingServer(false)
            }.bind(this)
        });
    };

    handleClickOpenDeliveryTrackDialog = () => {
        this.setState({ deliveryTrackDialogOpen: true });
        this.getCarriers();
    };

    handleCloseDeliveryTrackDialog = () => {
        this.setState({ deliveryTrackDialogOpen: false });
    };

    handleDeliveryTrackNumber = event => {
        this.setState({ deliveryTrackNumber: event.target.value });
    };

    submitDeliveryTrackNumber = (orderId) => {
        const deliveryTrackNumber = this.state.deliveryTrackNumber;
        const carrier_id = this.state.selectedCarrier;
        this.props.handleSubmitDeliveryTrackNumber(orderId, deliveryTrackNumber, carrier_id);
        this.setState({ deliveryTrackDialogOpen: false });
    };

    //
    selectCarrier = event => {
        this.setState({ selectedCarrier: event.target.value });
    };

    //update track number

    handleClickOpenUpdateDeliveryTrackDialog = () => {
        this.getCarriers();
        this.setState({ updateDeliveryTrackDialogOpen: true });
    };

    handleCloseUpdateDeliveryTrackDialog = () => {
        this.setState({ updateDeliveryTrackDialogOpen: false });
    };

    submitUpdatedDeliveryTrackNumber = (orderId) => {
        const deliveryTrackNumber = this.state.deliveryTrackNumber;
        const carrier_id = this.state.selectedCarrier;
        this.props.handleSubmitDeliveryTrackNumber(orderId, deliveryTrackNumber, carrier_id);
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
                    <DialogTitle id="form-dialog-title">快递信息 - {value.id}</DialogTitle>
                    <DialogContent>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="carrier-id">快递公司</InputLabel>
                            <Select
                                onChange={this.selectCarrier}
                                value = {this.state.selectedCarrier}
                                inputProps={{
                                    name: 'carrier-name',
                                    id: 'carrier-id',
                                }}
                            >
                                {
                                    this.state.carriers.map(function(carrier, index){
                                        return   <MenuItem key={index} value={carrier.id}>{carrier.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <div classname="input-field col">
                            <label for="delivery-tracking-number">快递单号</label>
                            <input placeholder="快递单号"  id="delivery-tracking-number"  defaultValue="" type="text" className="validate" onChange={this.handleDeliveryTrackNumber} ref="deliveryTrackNumber"/>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDeliveryTrackDialog} color="primary">
                            取消
                        </Button>
                        <Button onClick={(e) => this.submitDeliveryTrackNumber(value.id)} color="primary" disabled={this.state.selectedCarrier.length <= 0 || this.state.deliveryTrackNumber.length <= 0 }>
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
                    <DialogTitle id="form-dialog-title">修改快递信息 - {value.id}</DialogTitle>
                    <DialogContent>
                        <DialogContent>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="carrier-id">快递公司</InputLabel>
                                <Select
                                    onChange={this.selectCarrier}
                                    value = {this.state.selectedCarrier}
                                    inputProps={{
                                        name: 'carrier-name',
                                        id: 'carrier-id',
                                    }}
                                >
                                    {
                                        this.state.carriers.map(function(carrier, index){
                                            return   <MenuItem key={index} value={carrier.id}>{carrier.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <div classname="input-field col">
                                <label for="delivery-tracking-number">快递单号</label>
                                <input placeholder="快递单号" id="delivery-tracking-number"  value={this.state.deliveryTrackNumber} type="text" className="validate" onChange={this.handleDeliveryTrackNumber}/>
                            </div>

                        </DialogContent>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseUpdateDeliveryTrackDialog} color="primary">
                            取消
                        </Button>
                        <Button onClick={(e) => this.submitUpdatedDeliveryTrackNumber(value.id)} color="primary" disabled={this.state.selectedCarrier.length <= 0 || this.state.deliveryTrackNumber.length <= 0 }>
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
        handleSubmitDeliveryTrackNumber:(orderId, trackNumber, carrier_id)=>{
            dispatch(handleSubmitDeliveryTrackNumber(orderId, trackNumber, carrier_id))
        },
        deliveryTrack:(orderId)=>{
            dispatch(deliveryTrack(orderId))
        },
        clearDeliveryTrack: () => {
            dispatch(insertDeliveryTrack([]))
        },
        fetchingServer: (boolean)=>{
            dispatch(fetchingServerData(boolean));
        }
    }
};

export const FormatActionCell = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'FormatActionCell' })(FormatActionCellBase));