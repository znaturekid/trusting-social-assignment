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

const EmptyList = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    font-size: 24px;
`
class ListComponent extends React.Component {
    componentDidMount () {
        const { loadNews } = this.props;
        loadNews && loadNews();
    }
    render () {
        const { list, viewNews } = this.props;
        const emptyList = list && list.length === 0;
        if (emptyList) {
            return <EmptyList>There are no results that match your search.</EmptyList>
        }
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