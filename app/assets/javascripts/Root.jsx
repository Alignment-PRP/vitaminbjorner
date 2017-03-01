import React from 'react';
import Sidebar from './sidebar.jsx';



export default class Root extends React.Component {

    render() {
        return (
            <div>
                <Sidebar/>
                {this.props.children}
            </div>
        );
    }

}