import * as migration_20251219_215042_initial from './20251219_215042_initial';
import * as migration_20251228_093043_test from './20251228_093043_test';

export const migrations = [
  {
    up: migration_20251219_215042_initial.up,
    down: migration_20251219_215042_initial.down,
    name: '20251219_215042_initial',
  },
  {
    up: migration_20251228_093043_test.up,
    down: migration_20251228_093043_test.down,
    name: '20251228_093043_test'
  },
];
