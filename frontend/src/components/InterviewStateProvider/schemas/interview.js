import { schema } from 'normalizr';
import { questions } from './questions';
import { scorecard } from './scorecard';

export const interview = new schema.Entity('interview', {
  questions: [questions],
  scorecard: [scorecard],
});
