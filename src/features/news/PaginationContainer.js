
import { connect } from 'react-redux';

import PaginationComponent from '../../components/pagination'
import { loadMore } from './actions'

const mapStateToProps = (state) => {
    return {
        loading: state.news.loading,
        page: state.news.page,
        loadable: state.news.listNews.length > 0,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        nextPage: () => dispatch(loadMore())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);