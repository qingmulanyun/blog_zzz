import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider';
import classnames from 'classnames'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add';

const style = theme => ({
    formContainer: {
        marginTop: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginRight: theme.spacing.unit,
    },
});

class Addresses extends React.Component {

    render (){
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    收货地址管理
                </Typography>
                <Divider />
                <div className={classnames('row', classes.formContainer)}>

                    <Button className={classes.button} variant="raised" color="primary">
                        <AddIcon className={classes.rightIcon} />
                        添加收货地址
                    </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(style)(Addresses)