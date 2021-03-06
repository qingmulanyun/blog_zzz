import React from 'react';
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteAddress } from '../redux/actions/addressesActions'

const style = theme => ({
    displayBtn: {
        cursor: "unset",
        marginRight: theme.spacing.unit
    }
});

class deleteAddressButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteWarningDialogOpen: false
        };
    }
    handleOpenDeleteWarningDialog = () => {
        this.setState({ deleteWarningDialogOpen: true });
    };


    handleCloseDeleteWarningDialog = () => {
        this.setState({ deleteWarningDialogOpen: false });
    };

    handleDeleteAddress = (id) => {
        this.props.deleteAddress(id);
        this.setState({ deleteWarningDialogOpen: false });
    }

    render (){
        const { deleteWarningDialogOpen } = this.state;
        const { classes, address } = this.props;

        return (
            <div>
                {
                    address.is_primary && <IconButton className={classes.displayBtn}>
                        <Button color="primary" disabled className={classes.displayBtn}>
                            默认地址
                        </Button>
                    </IconButton>
                }
                <Tooltip title="删除" placement="top" >
                    <IconButton onClick={this.handleOpenDeleteWarningDialog}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

                <Dialog
                    fullWidth
                    open={deleteWarningDialogOpen}
                    aria-labelledby="delete-address-warning"
                >
                    <DialogTitle id="delete-address-warning">删除地址
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            您确定要删除选中的地址：{`${address.province}省 ${address.city}市 ${address.area} ${address.address_line_1} (${address.receiver_name} 收) ${address.receiver_phone}`}？
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDeleteWarningDialog} color="primary">
                            取消
                        </Button>
                        <Button onClick={(e) => this.handleDeleteAddress(address.id)} color="primary">
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => {
    return {
        deleteAddress: (id)=> {
            dispatch(deleteAddress(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(deleteAddressButton));