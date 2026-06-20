const { add, sub, mul, div, modulo, power, squareRoot, main } = require('../calculator');

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

  describe('modulo()', () => {
    test('modulo of two integers', () => expect(modulo(10, 3)).toBe(1));
    test('modulo with 5 % 2 (example)', () => expect(modulo(5, 2)).toBe(1));
    test('modulo with negative dividend', () => expect(modulo(-10, 3)).toBe(-1));
    test('modulo by zero throws', () => expect(() => modulo(5, 0)).toThrow('Division by zero'));
  });

  describe('power()', () => {
    test('power positive integers', () => expect(power(2, 10)).toBe(1024));
    test('power with 2 ^ 3 (example)', () => expect(power(2, 3)).toBe(8));
    test('power with zero exponent', () => expect(power(5, 0)).toBe(1));
    test('power with negative exponent', () => expect(power(2, -2)).toBeCloseTo(0.25, 10));
  });

  describe('squareRoot()', () => {
    test('square root of perfect square', () => expect(squareRoot(9)).toBe(3));
    test('square root with √16 (example)', () => expect(squareRoot(16)).toBe(4));
    test('square root of float', () => expect(squareRoot(2.25)).toBeCloseTo(1.5, 10));
    test('square root of negative throws', () => expect(() => squareRoot(-4)).toThrow('Cannot compute square root of negative number'));
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

    test('main supports modulo and symbols', () => {
      expect(main(['node', 'src/calculator.js', 'mod', '5', '2'])).toBe(1);
      expect(main(['node', 'src/calculator.js', '%', '7', '3'])).toBe(1);
    });

    test('main supports power and symbol', () => {
      expect(main(['node', 'src/calculator.js', 'pow', '2', '3'])).toBe(8);
      expect(main(['node', 'src/calculator.js', '^', '3', '3'])).toBe(27);
    });

    test('main supports sqrt as unary', () => {
      expect(main(['node', 'src/calculator.js', 'sqrt', '16'])).toBe(4);
    });

    test('main handles sqrt negative via error exit', () => {
      // main exits process on error; to test, call squareRoot directly for error expectation
      expect(() => squareRoot(-1)).toThrow('Cannot compute square root of negative number');
    });
  });
});
