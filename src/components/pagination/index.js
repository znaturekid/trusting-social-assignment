import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoadingButton = styled.button`
    font-size: 50px;
    text-align: center;
    box-sizing: border-box;
    width: calc(100vw - 40px);
    margin: 10px;
    padding: 10px;
    box-shadow: 0px 2px 0px #ddd, 
        0px 1px 6px rgba(0,0,0,.4), 
        inset 0px 1px 0px rgba(255,255,255,.3), 
        inset 0px 0px 3px rgba(255,255,255,.5);
    @media screen and (max-width: 600px) {
        font-size: 30px
    }
`
class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoScroll: false
        }
        this.pageScroll = this.pageScroll.bind(this)
        this.onClick = this.onClick.bind(this)
    }
    pageScroll() {
        const { autoScroll } = this.state;
        if (!autoScroll || document.querySelector('body').hasAttribute('modal')) {
            return;
        }
        const { nextPage, loading} = this.props;
        const scroller = window.document.scrollingElement;
        let progress = (scroller.scrollTop / ( scroller.scrollHeight - window.innerHeight ) ) * 100;
        if (progress > 70 && !loading & autoScroll) {
            nextPage();
        }
    }
    componentDidMount () {
        window.addEventListener('scroll', this.pageScroll);
    }
    componentWillUnmount () {
        window.removeEventListener('scroll', this.pageScroll);
    }
    onClick () {
        this.setState({autoScroll: true});
        this.props.nextPage();
    }
    render () {
        const { loading, page } = this.props;
        let loadingText = loading ? 'Loading...' : 'Load More';
        if (page < 200) {
            return (<LoadingButton disabled={loading} onClick={this.onClick}>{loadingText}</LoadingButton>)
        } else {
            return (<LoadingButton disabled>No More</LoadingButton>)
        }
    }
}

PaginationComponent.propTypes = {
    nextPage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired
}

export default PaginationComponent