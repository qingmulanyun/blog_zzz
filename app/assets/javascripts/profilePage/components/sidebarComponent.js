import React from 'react'
import { connect } from 'redux'
import { Link, browserHistory } from 'react-router'

class Sidebar extends React.Component {

    render (){
        return (
            <div className="collection">
                <Link to="/setting/profile" className="collection-item">个人资料</Link>
                <Link to="/setting/addresses" className="collection-item">收货地址管理</Link>
            </div>
        )
    }
}

export default Sidebar