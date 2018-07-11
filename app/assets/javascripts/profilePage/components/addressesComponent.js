import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import AddNewAddresses from './addNewAddressesComponent'
import AddressesList from './addressesListCompopnent'

import Snackbar from '../../utilities/Snackbar/Snackbar';
import Done from "@material-ui/icons/Done";
import { closeTip } from '../redux/actions/rootActions'

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
        const { classes, tipOpen, tipMessage, handleCloseTip } = this.props;
        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    收货地址管理
                </Typography>
                <Typography variant="caption" gutterBottom>
                    最多可创建8个收货地址
                </Typography>
                <Divider />

                <AddNewAddresses />
                <AddressesList />
                <Snackbar
                    place="tc"
                    color="info"
                    icon={Done}
                    message={tipMessage}
                    open={tipOpen}
                    closeNotification={ handleCloseTip }
                    close
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentAddress: state.address.currentAddress,
    addresses: state.address.addresses,
    tipOpen: state.root.tipOpen,
    tipMessage: state.root.tipMessage
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleCloseTip: ()=>{
            dispatch(closeTip())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Addresses));