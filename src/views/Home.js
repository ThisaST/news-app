import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Alert } from 'react-native';
import {Container, Header, Body, Title, Content, List, ListItem } from 'native-base';
import DataItem from '../component/ListItem';
import { getArticlesBySource } from '../service/News';
import Model from '../component/Model'


export default class Home extends Component {

    constructor(props) {

        super(props);
        this.handleItemDataOnPress = this.handleItemDataOnPress.bind(this);
        this.handleModelClose = this.handleModelClose.bind(this)

        this.state = {

            isLoading : true,
            data : null,
            isError : false,
            setModelVisible: false,
            modelArticleData: {}
        }

        /* this.items = [

            {
                urlToImage: null,
                title: 'Image is null',
                description:'jklgd sdghjoljdf sdgiohjoijdsg sdghjoijodsg sdogjojdsg osdfgjoijdsg sdohgiojdsg ohodsgsdoh ihjslijg sdghkjsdg dsgoijsdgs jolijdfgsd dgfsj;ijdsfg dsghlojlsdg',
                source:'BBC', 
                publishedAt:Date.now()
            },
            {
                urlToImage: null,
                title: 'Image is null',
                description:'jklgd sdghjoljdf sdgiohjoijdsg sdghjoijodsg sdogjojdsg osdfgjoijdsg sdohgiojdsg ohodsgsdoh ihjslijg sdghkjsdg dsgoijsdgs jolijdfgsd dgfsj;ijdsfg dsghlojlsdg',
                source:'BBC', 
                publishedAt:Date.now()
            },
            {
                urlToImage: null,
                title: 'Image is null',
                description:'jklgd sdghjoljdf sdgiohjoijdsg sdghjoijodsg sdogjojdsg osdfgjoijdsg sdohgiojdsg ohodsgsdoh ihjslijg sdghkjsdg dsgoijsdgs jolijdfgsd dgfsj;ijdsfg dsghlojlsdg',
                source:'BBC', 
                publishedAt:Date.now()
            },
            {
                urlToImage: null,
                title: 'Image is null',
                description:'jklgd sdghjoljdf sdgiohjoijdsg sdghjoijodsg sdogjojdsg osdfgjoijdsg sdohgiojdsg ohodsgsdoh ihjslijg sdghkjsdg dsgoijsdgs jolijdfgsd dgfsj;ijdsfg dsghlojlsdg',
                source:'BBC', 
                publishedAt:Date.now()
            }
        ] */
    }

    handleItemDataOnPress(articleData) {

        this.setState({
            setModelVisible:true,
            modelArticleData: articleData
        })
    }

    handleModelClose() {

        this.setState({

            setModelVisible:false,
            modelArticleData:null
        })
    }

    componentDidMount() {

        getArticlesBySource().then(data => {

            this.setState({

                isLoading : false,
                data : data
            })
        },error => {

            Alert.alert(JSON.stringify(error))
        })
    }

    render() {

        let view = this.state.isLoading ? (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
                <Text style={{ marginTop: 8 }} children="Please wait..." />
            </View>
        ): (
            <List 
                    dataArray= {this.state.data}
                    renderRow = {(item) => {
                        return(
                            <ListItem>
                                <DataItem onPress={this.handleItemDataOnPress} data= {item}/>
                            </ListItem>
                        )
                    }}/>
        )

        return (

            <Container>
                <Header>
                    <Body>

                        <Title children= "News App"/>

                    </Body>
                </Header>

                {/* <Content 
                    contentContainerStyle={{flex:1, backgroundColor: '#fff'}} 
                    padder={false}
                    children = {view}/> */}

                <Content
                    contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
                    padder={false}>
                        {view}
                </Content>
                <Model 
                    showModel={this.state.setModelVisible}
                    articleData={this.state.modelArticleData}
                    onClose={this.handleModelClose}/>

            </Container>
        )
    }
}