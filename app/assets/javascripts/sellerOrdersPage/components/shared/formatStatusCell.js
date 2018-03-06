import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const getColor = (status) => {
    if (status == 'deleted') {
        return '#F44336';
    }
    if (status == 'inactive') {
        return '#FFC107';
    }
    if (status == 'new') {
        return '#009688';
    }
    return '#FFC107';
};

const formatStatus = (status) => {
    if (status == 'sending') {
        return '正在发货';
    }
    if (status == 'sent') {
        return '已发货';
    }
    if (status == 'buying') {
        return '正在采购';
    }
    if (status == 'deleted') {
        return '已删除';
    }
    if (status == 'canceled') {
        return '已取消';
    }
    if (status == 'new') {
        return '已下单，等待发货';
    }
    return ' ';
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
        {
            formatStatus(value)
        }
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