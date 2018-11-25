import React from 'react';
import styled from 'styled-components';
import { formatDate, getFirstImageLink } from '../../utils';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
const Img = styled.div`
    @keyframes increase {
        0% {
            transform: scale(1);
        }
        100% {
            opacity: 1;
            transform: scale(1.1);
        } 
    }
    position: relative;
    background-image: ${ props => `url(${props.src})` || null };
    background-position: 50% 50%;
    background-size: contain;
    transition: all 0.4s ease-in-out;
    height: 240px;
    &:hover {
        background-size: cover;
        cursor: pointer;
    }
    & ~ div {
        margin-top: 0px;
    }
`
const Item = styled.div`
    box-shadow: 1px 1px 6px #404040;
    display: grid;
    background: rgba(226, 226, 226, 0.6);
    position: relative;
    overflow: hidden;
` 

const InfoWrapper = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    align-content: flex-end;
    color: #171616;
    padding: 10px;
    cursor: pointer;
    margin-top: 30px;
`
const Snippet = styled.p`
    grid-column: 1 / span 2;
`

const Source = styled.span`
    font-size:12px;   
    position: absolute;
    left: 0;
    top: 10px;
    background: rgba(0,0,0,0.6);
    padding: 5px 10px;
    color: #fff;
`
const Date = styled.span`
    position: absolute;
    font-size: 12px;
    right: 0;
    top: 10px;
    background: rgba(0,0,0,0.6);
    padding: 5px 10px;
    color: #fff;
`


class ItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.viewDetail = this.viewDetail.bind(this)
    }
    viewDetail () {
        const { onClick, item, history } = this.props;
        onClick && item && onClick(item);
        history && history.push('/detail');
    }
    
    render () {
        const { item } = this.props;
        const img = getFirstImageLink(item.multimedia);
        return (
            <Item onClick={this.viewDetail}>
                {img && <Img src={img}/>}
                {item.pub_date && <Date>{formatDate(item.pub_date)}</Date>}
                {item.source && <Source>{item.source}</Source>}
                <InfoWrapper>
                    <Snippet>{item.snippet}</Snippet>
                </InfoWrapper>
            </Item>)
    }
}

ItemComponent.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

export default withRouter(ItemComponent)