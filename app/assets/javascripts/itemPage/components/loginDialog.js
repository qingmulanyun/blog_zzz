import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import Button from 'material-ui/Button';
import { handleCloseLoginDialog } from '../redux/actions/rootActions'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

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


class LoginDialog extends React.Component{

    render(){
        const {classes, requireLogin, handleCloseLoginDialog } = this.props;

        const dialogOpen = requireLogin === 'required';

        return(
            <Dialog
                open={dialogOpen}
                transition={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    邮箱登录
                </DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <input type="email" className="validate login-input" name="user[email]" id="email" required />
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock</i>
                            <input type="password" className="validate login-input" name="user[password]" id="password" required/>
                        </div>
                        <div className="col s12">
                            <input type="submit" className="btn waves-effect waves-light login-btn" value="登录"  data-disable-with="正在登录…" />
                        </div>
                    </div>
                    <a href="/users/sign_up" >免费注册</a>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleCloseLoginDialog } color="secondary">
                        取消
                    </Button>
                    <Button onClick={ handleCloseLoginDialog } color="primary">
                        登录
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    itemQuantity: state.cart.itemQuantity,
    requireLogin: state.root.requireLogin
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleCloseLoginDialog:()=>{
            dispatch(handleCloseLoginDialog());
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginDialog));