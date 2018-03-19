import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider';
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
import MenuItem from 'material-ui/Menu/MenuItem';

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
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

class Addresses extends React.Component {

    componentDidMount(prevProps, prevState){
        document.title = "收货地址";
    }

    state = {
        addAddressesDialogOpen: false,
    };

    handleClickOpen = () => {
        this.setState({ addAddressesDialogOpen: true });
    };

    handleClose = () => {
        this.setState({ addAddressesDialogOpen: false });
    };

    render (){
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    收货地址管理
                </Typography>
                <Divider />
                <div className={classnames('row', classes.rootContainer)}>

                    <Button className={classes.button} variant="raised" color="primary" onClick={this.handleClickOpen}>
                        <AddIcon className={classes.rightIcon} />
                        添加收货地址
                    </Button>
                </div>

                <Dialog
                    fullWidth
                    open={this.state.addAddressesDialogOpen}
                    onClose={this.handleClose}
                >
                    <DialogTitle id="form-dialog-title">添加收货地址</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请填写国内可邮寄的有效地址。
                        </DialogContentText>
                        <div className={classes.formContainer}>
                            <TextField
                                id="country"
                                label="所在地区"
                                className={classes.textField}
                                value='中国'
                                type="textarea"
                                margin="normal"
                                disabled
                                required
                            />

                            <TextField
                                id="province"
                                select
                                label="请选择省市区"
                                className={classes.textField}
                                value="USD"
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                required
                                helperText=""
                                margin="normal"
                            >
                                {currencies.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                id="address_line_1"
                                label="详细地址"

                                required
                                fullWidth
                                multiline={true}
                                rows={20}
                                helperText="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号码等信息。"
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            保存
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(style)(Addresses)