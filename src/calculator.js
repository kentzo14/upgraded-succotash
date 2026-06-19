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

// CLI handling
function printUsage() {
  console.error('Usage: node src/calculator.js <op> <num1> <num2>');
  console.error('  <op>  : add | sub | mul | div');
  console.error('Examples:');
  console.error('  node src/calculator.js add 2 3');
}

function main(argv) {
  const args = argv.slice(2);
  if (args.length !== 3) {
    printUsage();
    process.exit(1);
  }

  const [op, aStr, bStr] = args;
  const a = Number(aStr);
  const b = Number(bStr);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers.');
    process.exit(1);
  }

  try {
    let result;
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
      default:
        console.error(`Error: unknown operation '${op}'. Use add, sub, mul or div.`);
        process.exit(1);
    }

    // Print result
    // Use console.log so it goes to stdout and can be captured in scripts
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
module.exports = { add, sub, mul, div, main };
