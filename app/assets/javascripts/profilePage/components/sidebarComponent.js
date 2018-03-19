import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames'

class Sidebar extends React.Component {

    render (){
        const { currentTab } = this.props;

        return (
            <div className="collection">
                <Link to="/setting/profile" className={classnames("collection-item", {'active': currentTab === 'profile' || currentTab === undefined })}>个人资料</Link>
                <Link to="/setting/addresses" className={classnames("collection-item", {'active': currentTab === 'addresses'})}>收货地址管理</Link>
            </div>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);