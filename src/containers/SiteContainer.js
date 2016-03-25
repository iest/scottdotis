import React, {Component, PropTypes} from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from '../reducers';
import promise from 'redux-promise';

import Wrapper from 'components/Global/Wrapper/Wrapper';
import Nav from 'components/Site/Nav/Nav';
import Footer from 'components/Site/Footer/Footer';

import styles from 'global/Site.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

export default class SiteContainer extends Component {
  render () {
    const {children} = this.props
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <div className={styles.root}>
          <Nav />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </Provider>
    );
  }
}
