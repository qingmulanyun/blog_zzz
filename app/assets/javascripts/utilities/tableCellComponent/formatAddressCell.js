import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    formatCell: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
});

const FormatAddressCellBase = ({
    tableColumn, value, classes, style,
}) => (
    <TableCell
        className={classes.formatCell}
        style={{
            textAlign: tableColumn.align,
            ...style,
        }}
    >
        <ListItem>
            <ListItemText
                primary={value.address}
                secondary={value.receiver}
            />
        </ListItem>
    </TableCell>
);

FormatAddressCellBase.propTypes = {
    value: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    tableColumn: PropTypes.object,
};
FormatAddressCellBase.defaultProps = {
    style: {},
    tableColumn: {},
};

export const FormatAddressCell = withStyles(styles, { name: 'FormatAddressCell' })(FormatAddressCellBase);