
import { connect } from 'react-redux';

import SearchComponent from '../../components/search';
import { search } from './actions';

const mapStateToProps = (state) => {
    return {
        query: state.news.query,
        loading: state.news.loading,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        search: (query) => dispatch(search(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);