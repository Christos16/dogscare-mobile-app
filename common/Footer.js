import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text
} from 'native-base';

const FooterContainer = props => {
  return (
    <Container>
      {props.children}
      <Footer style={{ backgroundColor: 'purple' }} onPress={props.bookSitter}>
        <FooterTab>
          <Button full>
            <Text style={{ color: 'white', fontSize: 15 }}>BOOK NOW</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default FooterContainer;
