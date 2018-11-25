import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatDate, getFirstImageLink } from '../../utils';
import PropTypes from 'prop-types';
const DetailWrapper = styled.div`
    color: #000;
    display: grid;
    grid-gap: 10px;
    justify-content: center;
    flex-direction: column;
    padding: 40px;
    @media screen and (max-width: 600px) {
        padding: 20px 0;
    }
`

const Snippet = styled.p`

`
const PageEmpty = styled.div`
    display: flex;
    height: 80vh;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    flex-direction: column;
`
const P = styled.p`
    background: #ccc;
    padding: 5px;
    font-size: 13px;
    margin-bottom: 5px;
`

const Media = styled.img`
    width: 100%;
`

class DetailComponent extends React.Component {
    
    render () {
        const { detail } = this.props;
        if (!detail) {
            return (<PageEmpty>
                There are no content.
                <Link to='/'>Go back Home Page!</Link>
            </PageEmpty>)
        }
        const src = getFirstImageLink(detail.multimedia);
        return (<DetailWrapper>
            <P>From {detail.source} on {formatDate(detail.pub_date)}</P>
            {src && <Media src={src} alt=""></Media>}
            <Snippet>{detail.snippet}</Snippet>
        </DetailWrapper>)
    }
}

DetailComponent.propTypes = {
    detail: PropTypes.object
}

export default DetailComponent;