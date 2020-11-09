import { observable, computed, action, makeObservable } from 'mobx';
import logger from '../lib/logger';
import { getWeekRows, toDayJS, dayjs } from '../lib/calendar-helpers';
import { formatCurrency } from '../lib/currency-helpers';
import Day from './models/day';

export default class UIStore {
  navOpen = false;

  pageTitle = 'myMoney Calendar';

  subtitle = null;

  description = null;

  nextStepPath = null;

  prevStepPath = null;

  progress = 0;

  error = null;

  currentMonth = dayjs().startOf('month');

  selectedDate = null;

  currentWeek = dayjs().startOf('week');

  selectedCategory = '';

  showBottomNav = true;

  isTouchDevice = false;

  installPromptEvent = null;

  days = [];

  hasSpotlight = null;

  constructor(rootStore) {
    makeObservable(this, {
      navOpen: observable,
      pageTitle: observable,
      subtitle: observable,
      description: observable,
      nextStepPath: observable,
      prevStepPath: observable,
      progress: observable,
      error: observable,
      currentMonth: observable,
      selectedDate: observable,
      currentWeek: observable,
      selectedCategory: observable,
      showBottomNav: observable,
      isTouchDevice: observable,
      installPromptEvent: observable,
      days: observable,
      hasSpotlight: observable,
      monthCalendarRows: computed,
      weekRangeText: computed,
      weekStartingBalance: computed,
      weekEndingBalance: computed,
      weekStartingNonSnapBalance: computed,
      weekStartingSnapBalance: computed,
      weekStartingNonSnapBalanceText: computed,
      weekStartingSnapBalanceText: computed,
      weekStartingBalanceText: computed,
      weekEndingNonSnapBalance: computed,
      weekEndingSnapBalance: computed,
      weekEndingSnapBalanceText: computed,
      weekEndingNonSnapBalanceText: computed,
      weekEndingBalanceText: computed,
      weekEndingBalanceText: computed,
      weekHasEvents: computed,
      weekHasNegativeBalance: computed,
      weekHasPositiveBalance: computed,
      weekHasZeroBalance: computed,
      isRunningAsApp: computed,
      setNavOpen: action,
      setPageTitle: action,
      setSubtitle: action,
      setDescription: action,
      updateWizardStep: action,
      setError: action,
      setCurrentMonth: action,
      nextMonth: action,
      prevMonth: action,
      setSelectedDate: action,
      setCurrentWeek: action,
      nextWeek: action,
      prevWeek: action,
      clearSelectedDate: action,
      gotoDate: action,
      setSelectedCategory: action,
      toggleBottomNav: action,
      setIsTouchDevice: action,
      setInstallPromptEvent: action,
      toggleSpotlight: action,
    })
    this.rootStore = rootStore;
    this.logger = logger.addGroup('uiStore');

    this.logger.debug('Initialize UI Store: %O', this);

    // Detect whether user is interacting with the site via a multitouch-capable input device:
    window.addEventListener('touchstart', this.setIsTouchDevice);

    /**
     * Save Chrome's install prompt event in order to customize the PWA installation process
     * @see {@link https://web.dev/customize-install/}
     */
    window.addEventListener('beforeinstallprompt', this.setInstallPromptEvent);
  }

  get monthCalendarRows() {
    return getWeekRows(this.currentMonth);
  }

  get weekRangeText() {
    const start = this.currentWeek.startOf('week');
    const end = this.currentWeek.endOf('week');
    return `${start.format('MMMM D')} - ${end.format('MMMM D')}`;
  }

  get weekStartingBalance() {
    return this.rootStore.eventStore.getDay(this.currentWeek.startOf('week')).nonSnapBalance;
  }

  get weekEndingBalance() {
    return this.rootStore.eventStore.getDay(this.currentWeek.endOf('week')).nonSnapBalance;
  }

  get weekStartingNonSnapBalance() {
    return this.rootStore.eventStore.getDay(this.currentWeek.startOf('week')).nonSnapBalance;
  }

  get weekStartingSnapBalance() {
    return this.rootStore.eventStore.getDay(this.currentWeek.startOf('week')).snapBalance;
  }

  get weekStartingNonSnapBalanceText() {
    if (typeof this.weekStartingNonSnapBalance === 'undefined') return '$0.00';
    return formatCurrency(this.weekStartingNonSnapBalance);
  }

  get weekStartingSnapBalanceText() {
    if (typeof this.weekStartingSnapBalance === 'undefined') return '$0.00';
    return formatCurrency(this.weekStartingSnapBalance);
  }

  get weekStartingBalanceText() {
    if (typeof this.weekStartingBalance === 'undefined') return '$0.00';
    return formatCurrency(this.weekStartingBalance);
  }

  get weekEndingNonSnapBalance() {
    return this.rootStore.eventStore.getDay(this.currentWeek.endOf('week')).nonSnapBalance;
  }

  get weekEndingSnapBalance() {
    return this.rootStore.eventStore.getDay(this.currentWeek.endOf('week')).snapBalance;
  }

  get weekEndingNonSnapBalanceText() {
    if (typeof this.weekEndingNonSnapBalance === 'undefined') return '$0.00';
    return formatCurrency(this.weekEndingNonSnapBalance);
  }

  get weekEndingSnapBalanceText() {
    if (typeof this.weekEndingSnapBalance === 'undefined') return '$0.00';
    return formatCurrency(this.weekEndingSnapBalance);
  }

  get weekEndingBalanceText() {
    if (typeof this.weekEndingBalance === 'undefined') return '$0.00';
    return formatCurrency(this.weekEndingBalance);
  }

  get weekHasEvents() {
    const events = this.rootStore.eventStore.eventsByWeek.get(this.currentWeek.startOf('week').valueOf());
    return events && events.length;
  }

  get weekHasNegativeBalance() {
    return this.weekEndingBalance < 0;
  }

  get weekHasPositiveBalance() {
    return this.weekEndingBalance > 0;
  }

  get weekHasZeroBalance() {
    return this.weekEndingBalance === 0;
  }

  get isRunningAsApp() {
    return navigator.standalone || matchMedia('(display-mode: standalone)').matches;
  }

  setNavOpen(val) {
    this.navOpen = Boolean(val);
  }

  setPageTitle(title) {
    this.pageTitle = title;
  }

  setSubtitle(subtitle) {
    this.subtitle = subtitle;
  }

  setDescription(desc) {
    this.description = desc;
  }

  updateWizardStep({ pageTitle, subtitle, description, nextStepPath, prevStepPath, progress }) {
    this.pageTitle = pageTitle;
    this.subtitle = subtitle;
    this.description = description;
    this.nextStepPath = nextStepPath;
    this.prevStepPath = prevStepPath;
    this.progress = progress;
  }

  setError(err) {
    this.error = err;
  }

  setCurrentMonth(month) {
    const date = toDayJS(month);
    this.currentMonth = date;
    this.currentWeek = date.startOf('month').startOf('week');
  }

  nextMonth() {
    this.setCurrentMonth(this.currentMonth.add(1, 'month'));
  }

  prevMonth() {
    this.setCurrentMonth(this.currentMonth.subtract(1, 'month'));
  }

  setSelectedDate(date) {
    date = toDayJS(date);
    this.selectedDate = date.startOf('day');
    this.currentWeek = date.startOf('week');
  }

  setCurrentWeek(date) {
    date = toDayJS(date);
    this.currentWeek = date.startOf('week');

    if (!date.isSame(this.currentMonth, 'month')) this.currentMonth = date.startOf('month');
  }

  nextWeek() {
    this.setCurrentWeek(this.currentWeek.add(1, 'week'));
    this.selectedDate = null;
  }

  prevWeek() {
    this.setCurrentWeek(this.currentWeek.subtract(1, 'week'));
    this.selectedDate = null;
  }

  clearSelectedDate() {
    this.selectedDate = null;
  }

  gotoDate(date) {
    date = toDayJS(date);
    this.currentMonth = date.startOf('month');
    this.selectedDate = date.startOf('day');
    this.currentWeek = date.startOf('week');
  }

  setSelectedCategory(category) {
    this.selectedCategory = category;
  }

  toggleBottomNav(state) {
    if (typeof state === 'undefined') {
      this.showBottomNav = !this.showBottomNav;
      return;
    }

    this.showBottomNav = Boolean(state);
  }

  setIsTouchDevice = () => {
    this.isTouchDevice = true;
    this.logger.debug('touch device detected');
    window.removeEventListener('touchstart', this.setIsTouchDevice);
  };

  setInstallPromptEvent = event => {
    this.installPromptEvent = event;
    this.logger.debug('Store install prompt event: %O', this.installPromptEvent);
    window.removeEventListener('beforeinstallprompt', this.setInstallPromptEvent);
  };

  toggleSpotlight = bool => {
    this.hasSpotlight = bool;
  };

  async showInstallPrompt() {
    if (!this.installPromptEvent) return false;
    this.installPromptEvent.prompt();
    const { outcome } = await this.installPromptEvent.userChoice;
    return outcome;
  }
}
