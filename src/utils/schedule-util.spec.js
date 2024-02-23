
import { parseSchedule, formatSchedule } from './schedule-util';

describe('schedule-util', () => {

	describe('parseSchedule', () => {

		it('must parse a schedule object to a day parts array', () => {
			let schedule = [
				{ AM: ['12', '08'], PM: [] },
				{ AM: [], PM: [] },
				{ AM: [], PM: [] },
				{ AM: [], PM: ['12', '01'] },
				{ AM: [], PM: ['10', '11'] },
				{ AM: [], PM: [] },
				{ AM: [], PM: [] }
			];
			let dayParts = parseSchedule(schedule);
			expect(dayParts).toEqual([
				{ day: '0', hour: '0' },
				{ day: '0', hour: '8' },
				{ day: '3', hour: '12' },
				{ day: '3', hour: '13' },
				{ day: '4', hour: '22' },
				{ day: '4', hour: '23' }
			]);
		});
	});

	describe('formatSchedule', () => {

		it('must format a day parts array to a schedule object', () => {
			let dayParts = [
				{ day: '0', hour: '0' },
				{ day: '0', hour: '8' },
				{ day: '3', hour: '12' },
				{ day: '3', hour: '13' },
				{ day: '4', hour: '22' },
				{ day: '4', hour: '23' }
			];
			let schedule = formatSchedule(dayParts);
			expect(schedule).toEqual([
				{ AM: ['12', '08'], PM: [] },
				{ AM: [], PM: [] },
				{ AM: [], PM: [] },
				{ AM: [], PM: ['12', '01'] },
				{ AM: [], PM: ['10', '11'] },
				{ AM: [], PM: [] },
				{ AM: [], PM: [] }
			]);
		});
	});
});
