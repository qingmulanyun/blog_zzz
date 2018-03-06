import * as React from 'react';
import { connect } from 'react-redux'
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import Tooltip from 'material-ui/Tooltip';


const styles = theme => ({
    formatDateCell: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    quantityContainer: {
        width: "100px",
        display: 'flex',
        textAlign: "center",
        verticalAlign: "middle"
    },
    quantityInput: {
        margin: "0 !important"
    },
    quantityName: {
        lineHeight: 3.5
    }
});
class FormatActionCellBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render(){
        const { tableColumn, value, classes, style } = this.props;
        return (
            <TableCell
                className={classes.formatDateCell}
            >
                <Tooltip id="tooltip-edit-quantity" title="取消订单" placement="left">
                    <IconButton color="primary" className={classes.button} aria-label="取消订单" >
                        <EditIcon />
                    </IconButton>
                </Tooltip>

            </TableCell>
        )
    }
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => {
    return {
        handleCartItemQuantityChange:(carItemId, quantity)=>{
            dispatch(handleCartItemQuantityChange(carItemId, quantity))
        }
    }
};

export const FormatActionCell = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'FormatActionCell' })(FormatActionCellBase));