
import { connect } from 'react-redux';
import { loadNews, viewNews } from '../../features/news/actions';
import ListComponent from '../../components/news/ListComponent';

const mapStateToProps = (state) => {
    return {
        list: state.news.listNews
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadNews: (page) => dispatch(loadNews(page)),
    viewNews: (item) => dispatch(viewNews(item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);