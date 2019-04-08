/* eslint-disable max-line-length */
export default class FCMSubscriber {
  static instance = null;
  subscriptions = [];

  static getInstance() {
    if (!FCMSubscriber.instance) {
      FCMSubscriber.instance = new FCMSubscriber();
    }
    return FCMSubscriber.instance;
  }

  subscribe(subscription) {
    this.subscriptions.push(subscription);
  }

  unsubscribe(subscription) {
    const index = this.subscriptions.indexOf(subscription);
    if (index > -1) {
      this.subscriptions.splice(index, 1);
    }
  }

  next(isSuccess) {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => {
        subscription(isSuccess);
      });
    }
  }
}
