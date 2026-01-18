import { extend } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { setDayjsLocale } from '../locales/dayjs';

export function setupDayjs() {
  extend(localeData);
  extend(relativeTime);
  extend(utc);
  extend(timezone);

  setDayjsLocale();
}
