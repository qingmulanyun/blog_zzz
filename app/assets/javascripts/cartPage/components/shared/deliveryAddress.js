import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";

import { selectDeliveryAddress } from '../../redux/actions/addressesActions'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';


const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 2,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class DeliveryAddress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: props.addressesList[0].id};
        this.props.selectDeliveryAddress(props.addressesList[0].id)
    }

    handleChange = (event, value) => {
        this.setState({ value });
        this.props.selectDeliveryAddress(value)
    };

    render (){

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" required className={classes.formControl}>
                    <FormLabel component="legend">寄送至：</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {
                            this.props.addressesList.map(function (address, index) {
                                return  <FormControlLabel
                                    key={index}
                                    value={address.id}
                                    control={<Radio />}
                                    label={`${address.province}
                                    ${address.city}
                                    ${address.area}
                                    ${address.address_line_1}
                                    (${address.receiver_name} 收)
                                    ${address.receiver_phone}
                                    ${address.is_primary ? '默认地址' : ''}`}
                                />
                            })
                        }
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => {
    return {
        selectDeliveryAddress: (id)=>{
            dispatch(selectDeliveryAddress(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeliveryAddress));