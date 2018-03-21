import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider';
import AddNewAddresses from './addNewAddressesComponent'
import AddressesList from './addressesListCompopnent'

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


class Addresses extends React.Component {

    componentDidMount(prevProps, prevState){
        document.title = "收货地址";
    }

    render (){
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    收货地址管理
                </Typography>
                <Divider />
                <AddNewAddresses />
                <AddressesList />
            </div>
        )
    }
}

export default withStyles(style)(Addresses)