import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const getColor = (amount) => {
    if (amount == 'deleted') {
        return '#F44336';
    }
    if (amount == 'inactive') {
        return '#FFC107';
    }
    if (amount == 'active') {
        return '#009688';
    }
    return '#009688';
};

const styles = theme => ({
    formatCell: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
});

const FormatStatusCellBase = ({
    tableColumn, value, classes, style,
}) => (
    <TableCell
        className={classes.formatCell}
        style={{
            color: getColor(value),
            textAlign: tableColumn.align,
            ...style,
        }}
    >
        { value == "active" ? "在售" : "下架" }
    </TableCell>
);

FormatStatusCellBase.propTypes = {
    value: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    tableColumn: PropTypes.object,
};
FormatStatusCellBase.defaultProps = {
    style: {},
    tableColumn: {},
};

export const FormatStatusCell = withStyles(styles, { name: 'FormatStatusCell' })(FormatStatusCellBase);