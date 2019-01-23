import React, {Component} from 'react';
import {
    Dimensions,
    Modal,
    WebView,
    Share,
    Image
} from 'react-native';

import {
    Header,
    Content,
    Container,
    Body,
    Left,
    Right,
    Title,
    Button
} from 'native-base';

const webViewHeight = Dimensions.get('window').height - 56

export default class Model extends Component {

    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this);
        this.handleShare = this.handleShare.bind(this);

    }

    handleClose() {

        return this.props.onClose()
    }

    handleShare() {

        const { url,title } = this.props.articleData,
        message =  `${title}\n\nRead more @\n${url}\n\nshared via News Application`
        return Share.share(
            {title,message,url:message},
            {dialogTitle:`Share ${title}`}
        )
    }

    render() {

        const {showModel, articleData} = this.props;
        const {url} = articleData;
        if (url !== undefined) {

            return(

                <Modal onRequestClose={this._handleClose} visible={showModel} transparent animationType="slide">
                    <Container style={{margin:16,marginBottom:0,backgroundColor:'#ffffff'}}>
                        <Header>
                            <Left>
                                <Button transparent onPress={this._handleClose}>
                                    <Image resizeMode="center" style={{ width: 18, height: 18 }} source={require('../images/ic_close_white.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Title children={articleData.title}/>
                            </Body>
                            <Right>
                            <Button transparent onPress={this._handleShare}>
                                    <Image style={{ width: 18, height: 18 }} 
                                    source={require('../images/ic_share_white.png') } />
                                </Button>
                            </Right>
                        </Header>
                        <Content contentContainerStyle={{height:webViewHeight}}>
                            <WebView onError={this._handleClose} startInLoadingState scalesPageToFit source={{uri:url}}/>
                        </Content>
                    </Container>
                </Modal>
            )
        }else {

            return null;
        }
    }
}