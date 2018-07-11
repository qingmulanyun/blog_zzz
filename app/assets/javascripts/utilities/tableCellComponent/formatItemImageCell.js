import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from "@material-ui/core/styles";



const styles = theme => ({
    formatDateCell: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
});

const FormatItemImageCellBase = ({
    tableColumn, value, classes, style,
}) => (
    <TableCell
        className={classes.formatDateCell}
    >
        <img src={value.thumbnail.url}></img>
    </TableCell>
);


FormatItemImageCellBase.defaultProps = {
    style: {},
    tableColumn: {},
};

export const FormatItemImageCell = withStyles(styles, { name: 'FormatItemImageCell' })(FormatItemImageCellBase);