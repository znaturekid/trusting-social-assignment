import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
require('./style.scss')

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.modalDom = document.getElementById('modal');
        this.body = document.querySelector('body');
        this.el = document.createElement('div');
        this.back = this.back.bind(this)
    }

    componentDidMount() {
        this.modalDom.appendChild(this.el);
        this.body.setAttribute('modal','')
    }
    back() {
        this.body.removeAttribute('modal')
        this.el && this.modalDom.removeChild(this.el);
        this.props.history.replace("/");
    }
    componentWillUnmount () {
        this.body.removeAttribute('modal');
    }
    render() {
        return ReactDOM.createPortal(
            (<React.Fragment>
                <button key={'md-1'} className="close-modal" onClick={this.back}><i className='fa fa-close'></i></button>
                <div key={'md-2'} className="modal-container">
                    {this.props.children}
                </div>
            </React.Fragment>),
            this.el,
        );
    }
}
export default withRouter(Modal)