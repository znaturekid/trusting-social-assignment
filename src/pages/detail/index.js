
import React from 'react';

import DetailContainer from '../../features/news/DetailContainer';
import Modal from '../../components/modal';

export default class DetailPage extends React.Component {
    render() {
        return (
            <Modal>
                <DetailContainer></DetailContainer>
            </Modal>
        )
    }
}