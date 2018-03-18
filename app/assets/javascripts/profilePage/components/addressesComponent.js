import React from 'react'
import { connect } from 'redux'

class Addresses extends React.Component {

    render (){
        return (
            <div className="collection">
                <a href="#!" className="collection-item">Alvin</a>
                <a href="#!" className="collection-item active">Alvin</a>
                <a href="#!" className="collection-item">Alvin</a>
                <a href="#!" className="collection-item">Alvin</a>
            </div>
        )
    }
}

export default Addresses