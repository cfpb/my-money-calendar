import { observable, action, makeObservable } from 'mobx';
import logger from '../lib/logger';
import UIStore from './ui-store';
import CashFlowStore from './cash-flow-store';
import StrategiesStore from './strategies-store';
import WizardStore from './wizard-store';

export default class RootStore {
  loading = true;

  constructor() {
    makeObservable(this, {
      loading: observable,
      setLoading: action,
      setIdle: action,
      reset: action
    })
    this.setup()
  }

  setLoading() {
    this.loading = true;
  }

  setIdle() {
    this.loading = false;
  }

  setup() {
    this.logger = logger.addGroup('rootStore');
    this.uiStore = new UIStore(this);
    this.eventStore = new CashFlowStore(this);
    this.strategiesStore = new StrategiesStore(this);
    this.wizardStore = new WizardStore(this);

    this.logger.debug('Initialize RootStore: %O', this);
  }

  reset() {
    this.setup()
  }
}
