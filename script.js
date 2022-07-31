'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]); // this converts the string into Java script objects, only than we an work with the data

    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();

    const displayDate = `${day}/${month}/${year}`;

    //nicely formatted time strng, we can use thisstring to create a nicely formatted new date object

    // common technique to loop over 2 arrays at the same time
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out.toFixed(2))}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  //refactoring.. makking it easierto implement new functions as time moves on

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

//FAKE ALWAYS LOGGED IN

currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);

// .padstart(finallength, start number in case the length is less than the final length), you can only use this method on strings
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2, 0);
const mins = `${now.getMinutes()}`.padStart(2, 0);

labelDate.textContent = `${day}/${month}/${year}, ${hour}:${mins}`;

// format it as day/month/year
// internationalisation.. to format date and time according to the users location

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //create current time

    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);

    // .padstart(finallength, start number in case the length is less t
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const mins = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${mins}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); // we don't need to convert to the number because math.floor actually converts to the number or type coercion for us

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add time

    currentAccount.movementsDates.push(new Date().toISOString()); // this will automatically create the correct format

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// In Javascript internally all numbers are represented as floating point numbers
// in other words always as decimals no matter if we write them as integers or decimals
console.log(23 === 23.0); // true
// numbers are represented internally as 64 base two format i-e numbers are always stored in binary format
//i-e 0 and 1
// in the binary form it's very hard to represent some fractions that are actually very easy in the base ten system

console.log(0.1 + 0.2); // 0.30000000000000004 - running joke- javascript has no better way to represent this
// you can't do very precise scientific or financial calculations in Javascript
// eventually you'll run into problems like these

console.log(0.1 + 0.2 === 0.3); // expected result is true but the resulat in javascript is false- error that we have to accept

//Conversion

console.log(Number('23')); // will be the same as
console.log(+'23'); // that's because when javascrpt sees the + sign it does type coercion
// purple colour represents numbers
// if you save after the + sign the prettier extension would get rid of the paranthesis

// Parsing
// we can parse a number from a string
// using built in method
// Number object- because every function is also an object
console.log(Number.parseInt('30px', 10)); //30 , Javascript recognised the number and pasrsed it from the string
// - the string needs to start with a number, takes second argument that defines the base of the number we're working with, default 10
// but could be any
console.log(Number.parseInt('px30', 10)); // NaN

// also parse float method

console.log(Number.parseFloat(' 2.5rem ')); // 2.5 nice to be able to read a number out of a string
console.log(Number.parseInt(' 2.5rem ')); // 2

// These parsing functions are global functions which means that they can be called without Number 'name space'

console.log(parseFloat('2.5rem'));
// but this is the oldschool way of representing them using Number - name space is encouraged

// used to check if the value is not a number
console.log(Number.isNaN(20)); // false   this function or object on the number namespace checks if the value is not a number
console.log(Number.isNaN('20')); // this alo is not not a number
console.log(Number.isNaN(+'20x')); // true
console.log(Number.isNaN(23 / 0)); // false infinity is also a number in javascript, but not in mathematics

// so a better way would be using the infinite method on the number name space

console.log(Number.isFinite(20 / 0)); // false
console.log(Number.isFinite('20')); // false because it's not a number

// therefore isFinite is a better way to check if the value is a number atleast when working with floating point numbers

// To check if a number is an integer

console.log(Number.isInteger(20)); // true

console.log(Number.isInteger(20.0)); // true

console.log(Number.isInteger(20.33)); // false

console.log(Number.isInteger(23 / 0)); // false

// mathematical operators

// square root- inthe math name space

console.log(Math.sqrt(25)); // 5

// exponentiation we use **

console.log(25 ** (1 / 2)); //5

console.log(27 ** (1 / 3)); //3. The only way to calculate cubic root

// Maximum value
console.log(Math.max(5, 18, 23, 12, 10)); //23
console.log(Math.max(5, 18, '23', 12, 10)); //23 this function does type coercion . howver it does not do parsing

// Minimum Value

console.log(Math.min(5, 18, 23, 12, 10)); // 5

// object or name space is the same thing

// radius of the circle with 10 px
// calculate area
console.log(Math.PI * Number.parseFloat('10 px') ** 2);

// Generating Random numbers

console.log(Math.trunc(Math.random() * 5) + 1);

// generalise this formaula to always generate random integers between two values

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1)) + min; // math.random() generates 0 but doesnot generate 1
console.log(randomInt(1, 6));

// Rounding all these methods also do type coercion
// Rounding integers

console.log(Math.trunc(23.3)); // 23
// removes the decimal part
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24 Rounds off to the nearest integer
console.log(Math.round(23.5)); //24 - the ususual math rounding rules

//Round up

console.log(Math.ceil(23.1)); //24
console.log(Math.ceil(23.9)); //24

// round down

console.log(Math.floor(23.1)); //23
console.log(Math.floor('23.9')); // 23

// floor and trunc are the same for positive numbers
// however, for negative numbers they are not

console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor('-23.3')); //-24  going even more down to the floor i-e -24. floor is better to use than trunc because it takes negative numbers into account aswell

// Rounding floating point numbrs or decimals

console.log((2.7).toFixed(0)); // use paranthesis for the value  and the argument within the method tells the number of decimal places
console.log((2.75985).toFixed(4)); // a string is returned because of weird javascript behaviour
// to fix that we can convert to a number by
console.log(+(2.7564).toFixed(3)); // 2.756 number

// Remainder Operator

console.log(5 % 2); // 5 remainder 2 = 1 => 5= 2* 2 +1
console.log(8 % 3); // 2
console.log(27 % 4); // 3

// even or odd

// number is even if it's divisible by 2, if not it's odd => i-e the remainder of it divided by 2 is 0, if the remainder divided by 2 is 1 it's odd

console.log(6 % 2); // 0 it's an even number
console.log(10987 % 2); //1 so it's an odd number

const isEven = num =>
  num % 2 ? console.log('is odd') : console.log('is even');

isEven(33);

isEven(40);

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'lightblue'; // 0,2,4,6
    if (i % 3 === 0) row.style.backgroundColor = 'orange'; // 0,3,6,9
  });
});

// if you'd like to do anything every nth time, than it's a good idea to use the remainder operator
// variable % n

// Numeric Sepearors

// diameter of solar system, too many zeros

const dia = 287_460_000_000; // you can use undersore to imitate real life so the number is more legible 287,460,000,000
// we can place underscores anywhere we want in our numbers to parse the numbersd
console.log(dia); // 287460000000

// you can place underscore in a floating point number but not near the decimal
// also can't place underscore t the beginning or the end of the number
// can't also place two underscores in a row
// numeric seperators won't work in a string no matter if you convert it to a number
console.log('243_456'); //NaN same result if we use a parseint function

console.log(parseInt('243_456')); //243

// let's talk about a special kind of integer introduced in es 2020
// BigInt
// primitive data type

console.log(2 ** 53 - 1); // 9007199254740991 // 2 *10^53   .. -1 cuz it starts with 0... only 53 bits are used to store the number the rest is used to store the decimal points etc
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 .. any integer bigger than this is not safe which means it can't be represented accurately
// if we do calculations bigger than that number than we might loose precision
// sometimes we might need bigger number than that for eg when interacting with database ids or when interacting with the real 60 bit number
// for eg we might get some number larger than this from some api but we don't have any way of storing that number

// starting es2020 we have big int
// big int can store numbers as large as we want no matter how big

console.log(483736373839999938378723876366763n);
// n at the end transforms a regular number into a bigint number
// or we can use the BigInt function

console.log(BigInt(48645464));

// Math...  operators also don't work on bigint

// operations with Big Int
// all the usual operators work the same
//+,-,*
// you can't mix bigint with regular numbers
// you have to convert the number to big int
// there are two exceptions to this
// when using a comparison operator and the plus operators when working with strings

const huge = 256765236576532;

//1 logical operators

console.log(20n > 15); // true .. so it works as expected
console.log(20n === 20); // false.. as expected cuz bothe have different types
console.log(20n == 20); // true... js does the type coercion for us
console.log(20n == '20'); // true...

//2 Strings concatenations

console.log(huge + ' is really big'); // converts the number to string

//division

// bigint would just return the integer of the devision operation

// fundamentals of date and time
// dates and times can be a little bit messy and confusing in javascript

//1 Create a date - 4 ways.. they use the same function but they accept different parameters

//const now = new Date();
//
//console.log(now);
//
//console.log(new Date(' Fri Jul 29 2022 16:27:33')); // not the best way... consistency
//
//console.log(new Date(account1.movementsDates[0])); // z signifies utc without dst
//
//console.log(new Date(2037, 10, 19, 15, 23, 5)); // "2037-11-19T14:23:05.000Z"   month in javasript is 0 based //weird
//// javascript also autocorrects the dates
//
//console.log(new Date(0)); // "1970-01-01T00:00:00.000Z"   start of unix time
//console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after unix // in js go till milli seconds//
//
// these dates are just another special type of objects
// they have their own methods just like arrays or maps

// working with dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10... cuz 0 based
console.log(future.getDate()); // 19 .. weird
console.log(future.getDay()); // gwt the number of the day starting from sunday as 0  4
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // 2037-11-19T14:23:00.000Z

// we can also get time stamp for the date
// it's the milliseconds based since 1 - 1- 1970
// time stamp
console.log(future.getTime()); // 2142253380000
console.log(new Date(2142253380000)); // milliseconds passed since unix // Thu Nov 19 2037 15:23:00 GMT+0100 (Central European Standard Time)

// we can also get a nicely formatted sting

// time stamp for this moment right now
console.log(Date.now());

// there are also set versions of all these methods so we can change any variable in the date

//for eg

future.setFullYear(2040);
console.log(future);

// setMonth etc performs auto corection
