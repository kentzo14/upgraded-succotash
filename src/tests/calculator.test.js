const { add, sub, mul, div, main } = require('../calculator');

describe('calculator functions', () => {
  describe('add()', () => {
    test('adds two positive integers', () => expect(add(2, 3)).toBe(5));
    test('adds negative numbers', () => expect(add(-2, -3)).toBe(-5));
    test('adds floats', () => expect(add(2.5, 1.2)).toBeCloseTo(3.7, 10));
    test('adding zero returns the other operand', () => expect(add(0, 7)).toBe(7));
  });

  describe('sub()', () => {
    test('subtracts two positive integers', () => expect(sub(10, 4)).toBe(6));
    test('subtracts a larger from a smaller number (negative result)', () => expect(sub(3, 5)).toBe(-2));
    test('subtracts floats', () => expect(sub(5.5, 2.2)).toBeCloseTo(3.3, 10));
    test('subtracting zero returns the same number', () => expect(sub(8, 0)).toBe(8));
  });

  describe('mul()', () => {
    test('multiplies two positive integers', () => expect(mul(45, 2)).toBe(90));
    test('multiplying by zero yields zero', () => expect(mul(123, 0)).toBe(0));
    test('multiplies negative numbers', () => expect(mul(-3, 4)).toBe(-12));
    test('multiplies floats', () => expect(mul(2.5, 2)).toBeCloseTo(5.0, 10));
  });

  describe('div()', () => {
    test('divides two positive integers', () => expect(div(20, 5)).toBe(4));
    test('divides to a float result', () => expect(div(7, 2)).toBeCloseTo(3.5, 10));
    test('dividing negative numbers', () => expect(div(-10, 2)).toBe(-5));
    test('division by zero throws an error', () => expect(() => div(5, 0)).toThrow('Division by zero'));
  });

  describe('CLI main()', () => {
    test('main returns result for add', () => {
      const result = main(['node', 'src/calculator.js', 'add', '2', '3']);
      expect(result).toBe(5);
    });

    test('main understands symbol operations', () => {
      expect(main(['node', 'src/calculator.js', '+', '2', '3'])).toBe(5);
      expect(main(['node', 'src/calculator.js', '-', '10', '4'])).toBe(6);
      expect(main(['node', 'src/calculator.js', '*', '6', '7'])).toBe(42);
      expect(main(['node', 'src/calculator.js', '/', '9', '3'])).toBe(3);
    });

    test('main handles float strings', () => {
      expect(main(['node', 'src/calculator.js', 'div', '7.5', '2.5'])).toBeCloseTo(3.0, 10);
    });
  });
});
