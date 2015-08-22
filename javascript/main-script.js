// Declare global variables

var value1 ='',								// First operand
	value2 = '',							// Second operand
	screenValue,							// Value displayed to screen
	value1Filled = false,					// Boolean to determine whether value1 is filled
	value2Filled = false,					// Boolean to determine if value2 is filled
	operator,								// Type of operator
	$screen = $('#screenText'),				// Store location of calculator's screen
	$number = $('.number'),					// Store location of all number buttons
	$operatorButton = $('.operator'),		// Store location of operator buttons
	$equalsButton = $('#equals'),			// Store location of equals to button
	$clearButton = $('#clear'),				// Store location of clear button
	date;				

$screen.text('0');							// Set original value of screen text to '0'

// Arithmetic operations

function add(value1, value2) {
	return value1 + value2;
}

function subtract(value1, value2) {
	return value1 - value2;
}

function multiply(value1, value2) {
	return value1 * value2;
}

function divide(value1, value2) {
	return value1 / value2;
}

// Choose correct arithmetic operation, run corresponding function and return the result

function operate(operator, value1, value2) {
	if (operator === 'add') {
		return add(value1, value2);
	} else if (operator === 'subtract') {
		return subtract(value1, value2);
	} else if (operator === 'multiply') {
		return multiply(value1, value2);
	} else {
		return divide(value1, value2);
	}
}
	
// Add event listener on number buttons

$number.on('click', function() {						// When a number button is pressed
	if (value1Filled !== true) {						// If the first operand is not filled
		if (value1.length < 8) {						// And if the value of the first operand is less than 8 characters
			value1 += this.textContent;					// Add the corresponding number value of the button to the end of the first operand
			$screen.text(value1);						// Display this value onto the screen
		}
	} else {											// If the first operand is filled
		if (value2.length < 8) {						// And if the value of the second operand is less than 8 characters
			value2 += this.textContent;					// Add the corresonding number value of the button to the end of the first operand
			$screen.text(value2);						// Display this value onto the screen
		}
	}
});

// Add event listener to operator buttons

$operatorButton.on('click', function() {									// When an operator button is pressed
	if (value2) {															// Check to see if the second operand (value2) has a value
		value2Filled = true;												// If so, change value2Filled variable to true
	}
	if (value1) {															// If the first operand has a value
		if ((value1Filled === true) && (value2Filled === true)) {			// And if the value of value1Filled and value2Filled are true
			value1 = parseInt(value1);										// Parse the first operand's string into a number
			value2 = parseInt(value2);										// Parse the second operand's string into a number
			var total = operate(operator, value1, value2); 					// Run operate function and store value in variable total
			$screen.text(total);											// Display this value to the screen
			value1 = total;													// Assign the total value to the first operand
			value2 = '';													// Clear the second operand for future use
			value2Filled = false;											// Change value2Filled to false
			operator = this.id;												// Get the operator of the button pressed for future use
		} else {															// If value1Filled and value2Filled are not both true
			operator = this.id;												// Get the operator of this button
			value1Filled = true;											// Change value of value1Filled to true
		}
	}
	
	$screen.hide().fadeIn(100);												// Hide the screen result and fade it back in
});

// Add event listener to equals to button

$equalsButton.on('click', function() {										// When equals to button is pressed
	if (value2) {															// If the second operand has a value
		value1 = parseInt(value1);											// Parse the first operand into a number
		value2 = parseInt(value2);											// Parse the second operand into a number
		var total = operate(operator, value1, value2);						// Run operate function to get total
		$screen.text(total);												// Display this total to the screen
		value1 = total;														// Assign this total to first operand
		value2 = '';														// Clear second operand for future use
		value2Filled = false;												// Change value2Filled to false
	}
});

// Add event listener to clear button

$clearButton.on('click', function() {										// When clear button is pressed
	value1 = '', value2 = '', value1Filled = false, value2Filled = false;	// Return variables to default states
	$screen.text('0').hide().fadeIn('fast');								// Reset screen text to 0 and fade it in
});