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

const FormatCurrencyCellBase = ({
    tableColumn, value, classes, style,
}) => (
    <TableCell
        className={classes.formatDateCell}
    >
        {`¥ ${value.toFixed(2)}`}
    </TableCell>
);

FormatCurrencyCellBase.propTypes = {
    value: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    tableColumn: PropTypes.object,
};
FormatCurrencyCellBase.defaultProps = {
    style: {},
    tableColumn: {},
};

export const FormatCurrencyCell = withStyles(styles, { name: 'FormatCurrencyCell' })(FormatCurrencyCellBase);