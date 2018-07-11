import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { handleCloseLoginDialog } from '../redux/actions/rootActions'
import { loginAndAddItemToCart } from '../redux/actions/cartActions'
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
        const email = this.refs.user_email.value;
        const password = this.refs.user_password.value;
        const callback = window.location.href;
        this.props.handleLoginAndAddItemToCart(email, password, callback)
    };

    render(){
        const {classes, requireLogin, handleCloseLoginDialog} = this.props;

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
        },
        handleLoginAndAddItemToCart:(email, password, callback)=> {
            dispatch(loginAndAddItemToCart(email, password, callback))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginDialog));