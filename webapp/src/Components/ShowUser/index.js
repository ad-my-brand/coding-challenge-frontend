import React from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

const Wrapper = styled.div`
    width: calc(100% - 40px);
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 10px;
    padding: 10px;
    background-color: white;
`;

const Title = styled.h4`
    display: inline;
    margin: 5px;
    text-align: start;
    font-weight: 100 !important;
`;

const MapText = styled.h3`
    color: white;
    font-weight: 200 !important;
`;

const AnyReactComponent = ({ text }) => <MapText>{text}</MapText>;

class ShowUser extends React.PureComponent {

    render() {
        return(
            <Wrapper>
                <Title>Name: {this.props.user.name}</Title>
                <Title>Username: {this.props.user.username}</Title>
                <Title>Email: {this.props.user.email}</Title>

                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyDSq4QkK7FA7EAheqY87QsCg-nvC3tuwtg" }}
                        defaultCenter={{
                            lat: parseInt(this.props.user.address.geo.lat),
                            lng: parseInt(this.props.user.address.geo.lng)
                        }}
                        defaultZoom={4}
                    >
                        <AnyReactComponent
                            lat= {parseInt(this.props.user.address.geo.lat)}
                            lng={parseInt(this.props.user.address.geo.lng)}
                            text={this.props.user.address.street}
                        />
                     </GoogleMapReact>
                </div>
            </Wrapper>
        )
    }
}

export default ShowUser;