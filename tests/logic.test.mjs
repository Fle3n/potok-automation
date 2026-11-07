import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBrief } from '../public/assets/data.js';

test('project brief preserves the actual task and selected known features', () => {
  const result = buildBrief({ type: 'bot', business: 'Мастерская', goal: 'Запись на занятия', selected: ['booking', 'unknown', 'telegram'], timing: 'В течение месяца' });
  assert.match(result, /Telegram-бот/);
  assert.match(result, /Мастерская/);
  assert.match(result, /Запись на занятия/);
  assert.match(result, /Онлайн-запись/);
  assert.match(result, /Уведомления в Telegram/);
  assert.doesNotMatch(result, /unknown/);
  assert.match(result, /Бюджет и окончательный объём согласуем/);
});

test('unknown project types use a valid default', () => {
  assert.match(buildBrief({ type: '__proto__', selected: [] }), /Сайт для бизнеса/);
});
