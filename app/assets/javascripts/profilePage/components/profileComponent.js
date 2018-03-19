import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider';
import classnames from 'classnames'
import Button from 'material-ui/Button';
import Save from 'material-ui-icons/Save';
import TextField from 'material-ui/TextField';
import { fetchProfileInfo, submitUpdateProfile, handleChangeProfile } from '../redux/actions/profileActions'


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
        const { classes, profile, handleSubmitUpdateProfile, handleChangeProfile } = this.props;
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
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    profile: state.profile
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Profile));