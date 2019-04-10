import React from 'react';
import { asyncComponent } from 'react-async-component';
import LazyPlaceholder from '../../view/LazyLoadComponent';

export default asyncComponent({
  resolve: () => new Promise(resolve => {
    requestAnimationFrame(() => {    
        // setTimeout(() => {
          resolve(require('./PreLoginComponent'));
        // }, 5000);
    });
  }),
  LoadingComponent: ({ navigation }) => (<LazyPlaceholder />)
});
