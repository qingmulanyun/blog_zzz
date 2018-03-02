import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';



const styles = theme => ({
    formatDateCell: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
});

const FormatItemNameCellBase = ({
    tableColumn, value, classes, style,
}) => (
    <TableCell
        className={classes.formatDateCell}
    >
        <a href={`/items/${value.item_id}`} target="_blank">{value.name}</a>
    </TableCell>
);



export const FormatItemNameCell = withStyles(styles, { name: 'FormatItemNameCell' })(FormatItemNameCellBase);