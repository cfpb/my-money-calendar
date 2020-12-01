import { observable, action, computed, makeObservable } from 'mobx';
import { toDayJS, dayjs } from '../../lib/calendar-helpers';
import logger from '../../lib/logger';

export default class Day {
  date = null;

  snapBalance = 0;

  nonSnapBalance = 0;

  constructor(store, props = {}) {
    makeObservable(this, {
      date: observable,
      snapBalance: observable,
      nonSnapBalance: observable,
      totalBalance: computed,
      timestamp: computed,
      events: computed,
      nonSnapExpenses: computed,
      snapExpenses: computed,
      nonSnapIncome: computed,
      snapIncome: computed,
      nonSnapTotal: computed,
      snapTotal: computed,
      setDate: action,
      setSnapBalance: action,
      setNonSnapBalance: action,
    })
    const { date = dayjs(), snapBalance = 0, nonSnapBalance = 0, previousDay } = props;
    this.store = store;
    this.date = toDayJS(date);
    this.snapBalance = snapBalance;
    this.nonSnapBalance = nonSnapBalance;
    this.logger = logger.addGroup('day');

    if (previousDay) {
      this.snapBalance = previousDay.snapBalance + this.snapTotal;
      this.nonSnapBalance = previousDay.nonSnapBalance + this.nonSnapTotal;
    }

    // SNAP can't go below 0
    // Deduct SNAP expenses from non-snap balance if snap would be negative
    if (this.snapBalance < 0) {
      this.nonSnapBalance += this.snapBalance;
      this.snapBalance = 0;
    }

    this.logger.debug('Initialize Day: %O', this);
  }

  get totalBalance() {
    return this.snapBalance + this.nonSnapBalance;
  }

  get timestamp() {
    return this.date.startOf('day').valueOf();
  }

  get events() {
    return this.store.eventsByDate.get(this.timestamp) || [];
  }

  get nonSnapExpenses() {
    return this.events.filter( event => event.category !== 'expense.food.groceries' && event.total < 0);
  }

  get snapExpenses() {
    return this.events.filter( event => event.category === 'expense.food.groceries');
  }

  get nonSnapIncome() {
    return this.events.filter( event => event.category !== 'income.benefits.snap' && event.total > 0);
  }

  get snapIncome() {
    return this.events.filter( event => event.category === 'income.benefits.snap');
  }

  get nonSnapTotal() {
    return [...this.nonSnapIncome, ...this.nonSnapExpenses].reduce((sum, event) => sum + event.total, 0);
  }

  get snapTotal() {
    return [...this.snapExpenses, ...this.snapIncome].reduce((sum, event) => sum + event.total, 0);
  }

  setDate(date) {
    this.date = toDayJS(date);
  }

  setSnapBalance(balance) {
    this.snapBalance = Number(balance);
  }

  setNonSnapBalance(balance) {
    this.nonSnapBalance = Number(balance);
  }
}
