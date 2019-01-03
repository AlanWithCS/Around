import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {API_ROOT, TOKEN_KEY, POS_KEY, GEO_OPTIONS, AUTH_HEADER} from "../constants";
import { Gallery } from './Gallery'
import { CreatePostButton} from "./CreatePostButton";

const TabPane = Tabs.TabPane;



export class Home extends React.Component {
    state = {
        isLoadingGeoLocation: false,
        isLoadingPosts: false,
        error: '',
        posts: []
    };

    componentDidMount() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS
            );
            this.setState({isLoadingGeoLocation: true});
        } else {
            this.setState({error: 'Geolocation is not supported'});
        }
    }

    onSuccessLoadGeoLocation = (position) =>{
        console.log(position);
        const { latitude, longitude } = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({
            lat: latitude,
            lon: longitude
        }));
        this.setState({isLoadingGeoLocation: false});
        this.loadNearbyPosts();
    };
    onFailedLoadGeoLocation = () => {
        this.setState({
            error: 'Failed to load geolocation',
            isLoadingGeoLocation: false,
        });
    };

    loadNearbyPosts = () => {
        // TODO:
        // 1. read location: lat, lon
        // 2. request posts from API
        // 3. setState, put returned posts into state
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        const token = localStorage.getItem(TOKEN_KEY);
        this.setState({isLoadingPosts: true});
        fetch(`${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20000`,
            {
                method: 'GET',
                headers: {
                    Authorization: `${AUTH_HEADER} ${token}`,
                },
            })
            .then((response)=>{
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then((response) => {
                console.log('response', response);
                this.setState({
                    isLoadingPosts: false,
                    posts: response,
                })
            })
            .catch(((error) => {
                this.setState({
                    isLoaddingPosts: false,
                    error: error.message})
            }));
    };

    getImagePosts = () => {
        if (this.state.error) {
            return (<div>{this.state.error}</div>);
        }
        if (this.state.isLoadingGeoLocation) {
            return (<Spin tip={"loading geo location"}/>);
        }
        if (this.state.isLoadingPosts) {
            return <Spin tip={"loading posts"} />;
        }
        if (this.state.posts.length > 0) {
            const images = this.state.posts.map(
                (post) => ({
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    caption: post.message,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300
                })
            );
            return <Gallery images={images}/>;
        }
        return 'No nearby posts';
        // TODO: Render Posts from API

    };

    render() {
        const operations = <CreatePostButton/>;
        return (
            <Tabs tabBarExtraContent={operations} className={"main-tabs"}>
                <TabPane tab="Posts" key="1">
                    {this.getImagePosts()}
                </TabPane>
                <TabPane tab="Map" key="2">Map</TabPane>
            </Tabs>
        );
    }
}
