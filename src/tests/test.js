import expect from 'expect';
import filterStr from '../../filter';

describe('Filter', () => {
  it('should check if the input contains atleast vowel', () => {
    const result = filterStr('ayo');
    const result2 = filterStr('bbb');
    expect(result).toBe('The string ayo contains a vowel at the least');
    expect(result2).toBe('The string bbb doesn not contains any vowel');
  });
});

