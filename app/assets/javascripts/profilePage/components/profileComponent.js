import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import classnames from 'classnames'
import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { fetchProfileInfo, submitUpdateProfile, handleChangeProfile } from '../redux/actions/profileActions'
import { closeTip } from '../redux/actions/rootActions'
import Snackbar from '../../utilities/Snackbar/Snackbar';
import Done from "@material-ui/icons/Done";

const style = theme => ({
    formContainer: {
        marginTop: theme.spacing.unit * 3,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class Profile extends React.Component {

    componentDidMount(prevProps, prevState){
        document.title = "个人资料";
        this.props.fetchProfileInfo();
    }

    render (){
        const { classes, profile, handleSubmitUpdateProfile, handleChangeProfile, tipOpen, handleCloseTip } = this.props;
        return (

            <div>
                <Typography variant="headline" gutterBottom>
                    个人资料
                </Typography>
                <Divider />
                <div className={classnames('row', classes.formContainer)}>
                    <form className="col s12">
                        <div className="row">
                            <div className="col s4">

                                <TextField
                                    fullWidth
                                    id="name"
                                    label="用户名"
                                    value={profile.name}
                                    type="textarea"
                                    disabled
                                    onChange={(e)=> handleChangeProfile('name', e.target.value)}
                                    margin="normal"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="邮箱地址"
                                    type="textarea"
                                    value={profile.email}
                                    disabled
                                    margin="normal"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s4">
                                <TextField
                                    fullWidth
                                    id="phone"
                                    label="手机号码"
                                    type="textarea"
                                    value={profile.phone}
                                    margin="normal"
                                    onChange={(e)=> handleChangeProfile('phone', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s4">
                                <Button variant="raised" size="small" color="primary" disabled={profile.name.length === 0} onClick={handleSubmitUpdateProfile}>
                                    <Save className={classnames(classes.leftIcon, classes.iconSmall)} />
                                    保存
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

                <Snackbar
                    place="tc"
                    color="info"
                    icon={Done}
                    message="个人资料保存成功"
                    open={tipOpen}
                    closeNotification={ handleCloseTip }
                    close
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    profile: state.profile,
    tipOpen: state.root.topOpen
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProfileInfo: ()=> {
            dispatch(fetchProfileInfo())
        },
        handleChangeProfile: (key, value)=> {
            dispatch(handleChangeProfile(key, value))
        },
        handleSubmitUpdateProfile: ()=>{
            dispatch(submitUpdateProfile())
        },
        handleCloseTip: ()=>{
            dispatch(closeTip())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Profile));