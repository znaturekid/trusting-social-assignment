import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputWrapper = styled.div`
    position: relative;
    &[data-loading="true"]::after{
        position: absolute;
        content: '\f110';
        right: 20px;
        top: 50px;
        font-size: 30px;
        font-family: FontAwesome;
        animation: fa-spin 2s infinite linear;
    }
    @media screen and (max-width: 600px ) {
        &[data-loading="true"]::after{ 
            top: 15px;
        }
    }
`
const InputSearch = styled.input`
    padding: 10px;
    box-sizing: border-box;
    margin: 10px;
    font-size: 50px;
    border: none;
    border-bottom: 2px solid #616161;
    outline: none;
    width: calc(100% - 20px);
    @media screen and (max-width: 600px) {
        font-size: 20px;
    }
`
class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: props.query
        }
        this.searching = null;
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }
    onKeyPress(e) {
        const { search } = this.props;
        const text = e.target.value;
        if (e.charCode === 13) {
            if (this.searching) {
                clearTimeout(this.searching)
            }
            search && search(text);
        }
    }
    onChange (e) {
        const { search } = this.props;
        const text = e.target.value;
        this.setState({query: text});
        if (this.searching) {
            clearTimeout(this.searching);
            this.searching = null;
        }
        if (text.trim().length === 0) {
            clearTimeout(this.searching);
            this.searching = null;
            return;
        }
        this.searching = setTimeout(() => {
            search && search(text);
        }, 400);   
    
    }
    render () {
        return (<InputWrapper data-loading={this.props.loading}>
                <InputSearch
                    type='text'
                    placeholder='Enter text to search'
                    value={this.state.query}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress} />
            </InputWrapper>)
    }
}

SearchComponent.propTypes = {
    search: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default SearchComponent