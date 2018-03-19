import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider';
import classnames from 'classnames'

const style = theme => ({
    formContainer: {
        marginTop: theme.spacing.unit * 3,
    }
});

class Profile extends React.Component {

    render (){
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    个人资料
                </Typography>
                <Divider />
                <div className={classnames('row', classes.formContainer)}>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="first_name" type="text" className="validate" />
                                    <label for="first_name">用户名</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="email" type="email" className="validate" disabled/>
                                    <label for="email">邮箱</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withStyles(style)(Profile);