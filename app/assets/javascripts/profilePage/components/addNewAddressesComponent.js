import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import CitySelect from '../../utilities/citySelectComponent/citySelect';

const style = theme => ({
    rootContainer: {
        marginTop: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginRight: theme.spacing.unit,
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginRight: theme.spacing.unit * 4,
        width: 150,
    },
    addressLine: {
        width: 500,
    },
    menu: {
        width: 200,
    },
});

class AddNewAddresses extends React.Component {

    componentDidMount(prevProps, prevState){
        document.title = "收货地址";
    }

    state = {
        addAddressesDialogOpen: false,
        primaryAddress: false,
        province: '山东',
        city: '滨州',
        area: '博兴县'
    };

    handleClickOpen = () => {
        this.setState({ addAddressesDialogOpen: true });
    };

    handleClose = () => {
        this.setState({ addAddressesDialogOpen: false });
    };

    handleSaveNewAddress = () => {
        const email = this.refs.address_line_1.value;
        this.setState({ addAddressesDialogOpen: false });
    };

    togglePrimary = () => {
        const current_primaryAddress = this.state.primaryAddress;
        this.setState({ primaryAddress: !current_primaryAddress });
    };

    handleCitySelect = (value) => {
        this.setState({ province: value.province, city: value.city,  area: value.area });
    };

    render (){
        const { classes } = this.props;
        return (
            <div>
                <div className={classnames('row', classes.rootContainer)}>
                    <Button className={classes.button} variant="raised" color="primary" onClick={this.handleClickOpen}>
                        <AddIcon className={classes.rightIcon} />
                        添加收货地址
                    </Button>
                </div>

                <Dialog
                    open={this.state.addAddressesDialogOpen}
                    onClose={this.handleClose}
                >
                    <DialogTitle id="add-new-address">添加收货地址</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请填写国内可邮寄的有效地址。
                        </DialogContentText>
                        <div className={classes.formContainer}>
                            <CitySelect onChange={this.handleCitySelect}/>
                            <TextField
                                id="address_line_1"
                                label="详细地址"
                                ref="address_line_1"
                                className={classes.addressLine}
                                required
                                fullWidth
                                multiline={true}
                                rows={20}
                                helperText="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号码等信息。"
                            />

                            <TextField
                                ref="name"
                                id="receiver_name"
                                label="收货人姓名"
                                className={classes.textField}
                                type="textarea"
                                margin="normal"
                                required
                            />
                            <TextField
                                ref="phone"
                                id="receiver_phone"
                                label="手机号码"
                                className={classes.textField}
                                type="textarea"
                                margin="normal"
                                required
                            />
                            <FormControlLabel
                                className={classes.addressLine}
                                control={
                                    <Checkbox
                                        ref="isPrimaryAddress"
                                        checked={this.state.primaryAddress}
                                        value="primary"
                                        onChange={this.togglePrimary}
                                    />
                                }
                                label="设置为默认收货地址"
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.handleSaveNewAddress} color="primary">
                            保存
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentAddress: state.address.currentAddress,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProfileInfo: ()=> {
            dispatch(fetchProfileInfo())
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(AddNewAddresses));