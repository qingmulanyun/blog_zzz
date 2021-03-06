import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import withStyles from "@material-ui/core/styles/withStyles";
import blue from '@material-ui/core/colors/blue'

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
    if (status == 'delivered') {
        return blue[500]
    }
    if (status == 'sent') {
        return blue[300];
    }
    return '#FFC107';
};

const formatStatus = (status) => {
    if (status == 'sent') {
        return '已发货';
    }
    if (status == 'buying') {
        return '卖家正在采购';
    }
    if (status == 'deleted') {
        return '已删除';
    }
    if (status == 'canceled') {
        return '已取消';
    }
    if (status == 'new') {
        return '已下单，等待卖家发货';
    }
    if (status == 'delivered') {
        return '送达，交易结束'
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