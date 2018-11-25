
import { connect } from 'react-redux';

import DetailComponent from '../../components/news/DetailComponent'

const mapStateToProps = (state) => {
    return {
        detail: state.news.detail
    }
}

export default connect(mapStateToProps)(DetailComponent);