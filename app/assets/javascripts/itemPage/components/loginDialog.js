import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import Button from 'material-ui/Button';
import { handleCloseLoginDialog, fetchingServerData } from '../redux/actions/rootActions'
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

    login =()=> {
        var nameInput = this.refs.user_email;
        var passwordInput = this.refs.user_password;
        $.ajax({
            url: '/users/sign_in',
            dataType: 'json',
            type: 'POST',
            data: {
                user: {
                    email: nameInput.value,
                    password: passwordInput.value,
                    callback: '/test'
                }
            },
            beforeSend:function(data) {
                // dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                // dispatch(fetchingServerData(false));
                // dispatch(fetchShopInfoSuccessfully(data));
                console.log(data)
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr.status)
                // dispatch(fetchingServerData(false));
            }.bind(this)
        });
    };

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
                onClose={handleCloseLoginDialog}
                maxWidth="xs"
            >
                <form className="login-form" id="new_user" action="/users/sign_in" method="post">
                    <DialogTitle id="alert-dialog-slide-title">
                        邮箱登录
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">email</i>
                                <input type="email" className="validate login-input" name="user[email]" id="email" ref="user_email"  required />
                            </div>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock</i>
                                <input type="password" className="validate login-input" name="user[password]" ref="user_password" id="password" required/>
                            </div>
                            <div className="col s12">
                                <Button  variant="raised" color="primary"  data-disable-with="正在登录…" onClick={this.login}> 登录</Button>
                            </div>
                        </div>
                        <a href="/users/sign_up" >免费注册</a>
                    </DialogContent>

                </form>
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