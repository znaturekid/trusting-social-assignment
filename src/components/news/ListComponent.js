import React from 'react';
import styled from 'styled-components';
import ItemComponent from './ItemComponent'
import PropTypes from 'prop-types';

const ListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    padding: 10px;
    box-sizing: border-box;
    @media only screen and (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }
    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`
class ListComponent extends React.Component {
    componentDidMount () {
        const { loadNews } = this.props;
        loadNews && loadNews();
    }
    render () {
        const { list, viewNews } = this.props;
        
        return (<ListWrapper>
            { list && list.map((item, index) => (<ItemComponent onClick={viewNews} key={`item_${index}`} item={item}></ItemComponent>)) }
        </ListWrapper>)
    }
}
ListComponent.propTypes = {
    viewNews: PropTypes.func,
    loadNews: PropTypes.func,
    list: PropTypes.array.isRequired,
}
export default ListComponent;