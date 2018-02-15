import React from 'react';
import { connect } from 'react-redux'

import {
    Template, TemplatePlaceholder, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';


import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import AddIcon from 'material-ui-icons/AddCircle';
import { toggleCreateItemPage } from '../../redux/actions/rootActions'
import CreateItemPage from './CreateItemPage'


class AddNewItem extends React.Component {
    render (){

        return (
            <Plugin name="AddNewItem">
                <Template name="toolbarContent">
                    <TemplatePlaceholder />
                    <TemplateConnector>
                        {({}) => (
                            <React.Fragment>
                                <Tooltip title='添加商品' placement='bottom' enterDelay={200}>
                                    <IconButton onClick={this.props.toggleCreateItemPage}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>

                            </React.Fragment>
                        )}
                    </TemplateConnector>
                </Template>
                <CreateItemPage />
            </Plugin>
        );
    }
}


const mapStateToProps = (state) => ({
    currentTab: state.root.currentTab
});

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCreateItemPage: ()=> {
            dispatch(toggleCreateItemPage())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewItem);