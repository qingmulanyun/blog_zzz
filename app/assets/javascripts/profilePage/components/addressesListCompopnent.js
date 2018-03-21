import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import List, {
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { FormGroup, FormControlLabel } from 'material-ui/Form';

import FolderIcon from 'material-ui-icons/Business';
import DeleteIcon from 'material-ui-icons/Delete';
import Divider from 'material-ui/Divider'
import { fetchAllAddresses } from '../redux/actions/addressesActions'
import Button from 'material-ui/Button';
import classnames from 'classnames'
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
        marginRight: theme.spacing.unit * 4,
        width: 150,
    },
    addressLine: {
        width: 500,
    },
    menu: {
        width: 200,
    },
});

class AddressesList extends React.Component {

    componentDidMount(prevProps, prevState){
        this.props.fetchAllAddresses();
    }

    render (){
        const { classes, addresses } = this.props;
        return (
            <div>
                <List>
                    {
                        addresses.map(function (address, index) {
                            console.log(address)
                            return <div key={index}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon color={classnames({"primary": address.is_primary })}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${address.province}省 ${address.city}市 ${address.area} ${address.address_line_1}`}
                                        secondary={`收件人：${address.receiver_name}，电话：${address.receiver_phone}`}
                                    />
                                    <ListItemSecondaryAction>
                                        {
                                           address.is_primary && <IconButton aria-label="Delete">
                                               <Button color="primary" disabled>
                                                   默认地址
                                               </Button>
                                           </IconButton>
                                        }
                                        <IconButton aria-label="Delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                                </div>
                        })
                    }
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    addresses: state.address.addresses,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllAddresses: ()=> {
            dispatch(fetchAllAddresses())
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(AddressesList));