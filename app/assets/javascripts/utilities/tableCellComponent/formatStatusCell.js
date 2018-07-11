import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableCell } from '@material-ui/core/Table';
import { withStyles } from "@material-ui/core/styles";

const getColor = (status) => {
    if (status == 'deleted') {
        return '#F44336';
    }
    if (status == 'inactive') {
        return '#FFC107';
    }
    if (status == 'active') {
        return '#009688';
    }
    return '#FFC107';
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