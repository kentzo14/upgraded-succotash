#!/usr/bin/env node

/**
 * CLI Calculator
 *
 * Supported operations:
 * - add: addition (a + b)
 * - sub: subtraction (a - b)
 * - mul: multiplication (a * b)
 * - div: division (a / b)
 *
 * Usage examples:
 *   node src/calculator.js add 2 3   # => 5
 *   node src/calculator.js sub 5 2   # => 3
 *   node src/calculator.js mul 4 6   # => 24
 *   node src/calculator.js div 8 2   # => 4
 *
 * The script validates inputs and prints errors for invalid usage or divide-by-zero.
 */

// Exported arithmetic functions for programmatic use
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

function modulo(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) throw new Error('Cannot compute square root of negative number');
  return Math.sqrt(n);
}

// CLI handling
function printUsage() {
  console.error('Usage: node src/calculator.js <op> <num1> [<num2>]');
  console.error('  <op>  : add | sub | mul | div | modulo | power | sqrt');
  console.error('  For binary ops provide two operands; for sqrt provide one operand.');
  console.error('Examples:');
  console.error('  node src/calculator.js add 2 3');
  console.error('  node src/calculator.js sqrt 9');
}

function main(argv) {
  const args = argv.slice(2);
  // Accept either 2 args (op + one operand for sqrt) or 3 args (op + two operands)
  if (args.length !== 2 && args.length !== 3) {
    printUsage();
    process.exit(1);
  }

  const [op, aStr, bStr] = args;

  try {
    let result;

    // unary sqrt: expects one operand
    if (args.length === 2) {
      const n = Number(aStr);
      if (Number.isNaN(n)) {
        console.error('Error: operand must be a valid number.');
        process.exit(1);
      }

      switch (op) {
        case 'sqrt':
          result = squareRoot(n);
          break;
        default:
          console.error(`Error: unknown unary operation '${op}'. Use sqrt for unary operations.`);
          process.exit(1);
      }

      console.log(result);
      return result;
    }

    // binary operations: expect two operands
    const a = Number(aStr);
    const b = Number(bStr);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      console.error('Error: both operands must be valid numbers.');
      process.exit(1);
    }

    switch (op) {
      case 'add':
      case '+':
        result = add(a, b);
        break;
      case 'sub':
      case '-':
        result = sub(a, b);
        break;
      case 'mul':
      case 'x':
      case '*':
        result = mul(a, b);
        break;
      case 'div':
      case '/':
        result = div(a, b);
        break;
      case 'mod':
      case 'modulo':
      case '%':
        result = modulo(a, b);
        break;
      case 'pow':
      case 'power':
      case '^':
        result = power(a, b);
        break;
      default:
        console.error(`Error: unknown operation '${op}'. Use add, sub, mul, div, modulo, power or sqrt.`);
        process.exit(1);
    }

    console.log(result);
    return result;
  } catch (err) {
    console.error('Error:', err.message || String(err));
    process.exit(1);
  }
}

// If this module is run directly, execute main
if (require.main === module) {
  main(process.argv);
}

// Export for tests or programmatic usage
module.exports = { add, sub, mul, div, modulo, power, squareRoot, main };
