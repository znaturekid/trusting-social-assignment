
import React from 'react';

import ListContainer from '../../features/news/ListContainer';
import PaginationContainer from '../../features/news/PaginationContainer';
import SearchContainer from '../../features/news/SearchContainer';

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <SearchContainer></SearchContainer>
                <ListContainer></ListContainer>
                <PaginationContainer></PaginationContainer>
            </div>
        )
    }
}