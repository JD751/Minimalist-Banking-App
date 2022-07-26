'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// once the page is reloaded the data refreshes and all the transactions are gone
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// whenevr we get data from a web API, this data usually comes in the form of objects
// pass the data that the function needs directly into the function rather than creating a global variable

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  //inner html is like textContent, however it also includes all the html classes and styling and sets it to empty

  const moves = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  moves.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    // we use template literals  with html code in js all the time
    // you can also add template literal to the class name
    // template literal is literally a life saver here
    const html = `<div class="movements__row">
  <div class="movements__type movements__type--${type}">${i + 1} ${type} </div>

  <div class="movements__value"> ${mov} € </div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  // now we haveto find a way to adding the html to a webpage here
};
//displayMovements(account1.movements);

// containerMovements.insertAdjacentHTML('afterbegin', html);
//this method accepts two arguments,strings, first
// First, the position at which we want to attach the html
// Second the string
/*
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

// methods are simply functions that we can call on objects
// methods are basically functions attached to objects
// array are also objects
// array methods are tools that we can use on arrays

// some simple tools aka array methods

let arr = ['a', 'b', 'c', 'd', 'e'];
//SLICE METHOD
//slice method - similar to slice method on strings
// a slice method is a method in which we can take a slice of the array without changing the original array
// slice. ('position where you want to start the slice, positions where you want to end the slice)
// it does not mutate the array it rather creates a new ' sliced array)

console.log(arr.slice(1, 4)); // (3) ['b', 'c', 'd'] // starts at [1] and includes till [3], ends but doesn't include [4]
console.log(arr.slice(2)); //(3) ['c', 'd', 'e']// if the end parameter is not defined it goes on till the end of the array
console.log(arr.slice(-2)); // (2) ['d', 'e']//-2 will start counting from the end will take the last two elements//
// negative begin parameter starts to copy from the end of the array
console.log(arr.slice(1, -2)); //  ['b', 'c']
// if you want to create a shallow copy of arr. you can use slice without any parameters
console.log(arr.slice()); //(5) ['a', 'b', 'c', 'd', 'e']
// That's the same as using a spread operator and binding it in an array
console.log([...arr]); //  ['a', 'b', 'c', 'd', 'e']
console.log(...arr); // a b c d e, spread the elements without binding it in an array

// SPLICE METHOD
// Works the same way as slice method. The fundamental difference is that it changes or mutates
// the same array instead of creatin a new array
// the first parameter in the splice method defines the beginning of the method in the array and
// the second parameter defines the number of element that we want to delete,
// the second parameter is called delete count

console.log(arr.splice(2)); // (3) ['c', 'd', 'e']
// let's see what happens to the original array
console.log(arr); // (2) ['a', 'b'] // the extraxted elements are gone from the original array
// if we want to get rid of the last element
console.log(arr.splice(-1)); // ['b']
console.log(arr); // ['a']

// if you want to find out about any particular method you canuse mdn documentation

// REVERSE METHOD

const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // (5) ['f', 'g', 'h', 'i', 'j']
// reverse method mutates the original array
console.log(arr2); // (5) ['f', 'g', 'h', 'i', 'j']

// CONCAT METHOD
// It's used to concatente two arrays
//linking things together in a series
// doesn't mutate the original array

const letters = arr.concat(arr2);
console.log(letters); // ['a', 'f', 'g', 'h', 'i', 'j']

const letters2 = arr2.concat(arr);
console.log(letters2); // [ 'f', 'g', 'h', 'i', 'j', 'a']

// we can do this the following way aswell
// using the spread operator. This doesn't mutate the array either
console.log([...arr, ...arr2]); // (6) ['a', 'f', 'g', 'h', 'i', 'j']

// JOIN METHOD

console.log(letters.join('-')); // a-f-g-h-i-j

// we already know
// push()
//shift()
// pop()
//unshift()
// index of()
// icludes()

// no developer knows these methods by heart
// you can come back to it or see it in mdn resources

//THE NEW AT METHOD

const arr3 = [23, 11, 64];
console.log(arr3.at(0)); // 23 same as arr[0]
// why use at instead of the bracket notationd
// to get the last element of an array

// two examples of more traditional approaches
console.log(arr3.slice(-1)[0]); // 64
console.log(arr3[arr3.length - 1]); // 64

// the at method makes it easier because we can even use - in the method
// negative index basically starts counting from the last element
console.log(arr3.at(-1)); // 64

// at method also works on strings
console.log('jawad'.at(0));
console.log('jawad'.at(-1));

// we have  already learned how to loop over an array using the for off loop
// but for each loop is fundamentally different

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// let's start with for of loop
//for (const movement of movements) {

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Activity ${i + 1}: ${movement} credited`);
  } else {
    console.log(`Activity ${i + 1}: ${Math.abs(movement)} debited`);
  }
}

// using for each method to achieve the exact same thing in an  easier way
// Each with a capital letter
// for each is a higher order function that requiers a callback function to tell it what to do
// it's the foreach method that would call the function, we are not calling it ourselves
// when exactly will the foreach method call the callback function?
// the for each method loops over the array and for each iteration it calls the callback function
// it'll pass the current element of the array as an argument

console.log('---------FOREACH---------------');


movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Activity ${i + 1}: ${mov} credited`);
  } else {
    console.log(`Activity ${i + 1}: ${Math.abs(mov)} debited`);
  }
});

// in each iteration the function is called for the corresponding value
// we get the same result
// 0 : FUNCTION(200)
//1: FUNCTION(450)
//3: function(400)

// for each method is a more cleaner way
// IN foreach method it's a lot easier to get access to the current index
// it's the foreach method that calls the callback function in each iteration
// as it calls the method it passes through the elements of the array
// but that's not all what it passes through
// it ALSO passes through the index and the entire array
// the name of the arguments doesnot matter but what matters is the order
// THE FIRST ELEMENT ALWAYS NEEDS TO BE THE ELEMENT
// THE SECOND ELEMENT SHOULD ALWAYS BE THE INDEX
// AND THE THIRD ELEMENT SHOULD ALWAYS BE THE ENTIRE ARRAY
// but using the entries method in the for of loop. the first argument is index and the second is value
// THAT'S BECAUSE THAT'S THE ORDER IN WHICH THE VALUES ARE PASSED IN THE CALLBACK FUNCTION
// AND OFCOURSE WE DON'T NEED TO USE ALL THE ARGUMENTS, WE CAN USE ONE, TWO OR THREE

// when to use foreach and for of loop

// You cannot break out of the foreach loop. the continue and break statements don't work for the for each method at all!

// if you need to break out of  loop you have to use the for of loop

// FOR EACH METHOD ON MAPS AND SETS

// Maps

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (val, key, map) {
  console.log(`${map}: ${val}`);
});

// Sets

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EURO', 'EURO', 'GBP']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (val2, key, map) {
  console.log(`${map}: ${val2}`);
});

// sets don't have keys so the second parameter returns value, because that;s all what it returns
//_ is a throw away variable in javascript. in other words, a variable that's completely unnecessary
*/

//---------------------Data Transformation----------------------------

// ===============Map Method======================

// It is similar to the for each method for that it loops over the entire array. however, the main difference is that it does not
// mutate the array rather creates a new array with the call back function
// Map method is usually even more useful than foreach method
// because it creates a brand new array and in javascript it's a good practice to create copy of data rather than mutating the original array

// ===============Filter method==============
// This method filters the array that satisfies a certain condition
// only elements that pass the specified condition would make it to a NEW filtered array

//===================Reduce Method===================

// Reduce boils down ('reduces) all the elements in an array down to a single value
//e.g adding all the elements of an array together
// it creates an accumulator variable that holds the values while all the values in the array
// are being perormed until the final operation where the accumulator becomes the final value
//like a snowball that keeps getting bigger and bigger as it moves down that hill
// the whole process has reduced the whole array into a single value
// There's NO new array created in this case
// only the reduced value is returned

//<<<<<<<<<<<<<<  MAP METHOD>>>>>>>>>>>>>>>>>>>>.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// LET'S SUPPOSE THESE MOVEMENTS ARE IN EURO AND WE NEED TO CONVERT IT INTO $

const euroToUsd = 1.1;

// Functional programming
// New and modern waqy of doing stuff
// great for me cuz i'm proefficient in functional programming
/*
const conversion = movements.map(function (mov) {
  return Math.abs(mov * euroToUsd);
});

console.log(conversion);
console.log(movements);
*/
// we can use arrow function to simplify the call back function
// this is a preferable way to write code since it's much cleaner, and I like it aswell
// arrow functions are ideal as callback functions

const conversion = movements.map(mov => Math.abs(mov * euroToUsd));

console.log(conversion);
console.log(movements);

// Below is the old way of doing stuff, object oriented programming
let mov2 = [];

for (const mov of movements) {
  mov2.push(mov * euroToUsd);
}
console.log(mov2);
console.log(movements);

// just like the foreach method, the map method has access to all the three parameters (value, index, array)
// it's completely ok to have two or morte return statements in a function as long as only one of them is executed at a time
// with the for each method we console log and that created side effects. for each method creates side effects
// with the map method we simply return the values and a new array is created in which all the iterations are stored
// in the map method we didn't create side effects but rather a new array
const movementsDescription = movements.map(
  (mov, i) =>
    `Activity ${i + 1}: ${Math.abs(mov)} ${mov > 0 ? 'credited' : 'debited'}`
);
// we do not call the callbackfunction, the higher order function calls the callback function
console.log(movementsDescription);

// always use return from the callback function

//<<<<<<<<<<<<<<<<<<<<<< map method example>>>>>>>>>>>>>>>>

//const account1 = {
//  owner: 'Jonas Schmedtmann',
//  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//  interestRate: 1.2, // %
//  pin: 1111,
//};
//
//const account2 = {
//  owner: 'Jessica Davis',
//  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//  interestRate: 1.5,
//  pin: 2222,
//};
//
//const account3 = {
//  owner: 'Steven Thomas Williams',
//  movements: [200, -200, 340, -300, -20, 50, 400, -460],
//  interestRate: 0.7,
//  pin: 3333,
//};
//
//const account4 = {
//  owner: 'Sarah Smith',
//  movements: [430, 1000, 700, 50, 90],
//  interestRate: 1,
//  pin: 4444,
//};
//
//const accounts = [account1, account2, account3, account4];
// compute username

// username would be the initials

const user = 'Steven Thomas Williams'; //stw
console.log(user);
const username = user
  .toLowerCase()
  .split(' ')
  .map(val => val[0])
  .join(''); // (3) ['steven', 'thomas', 'williams']
console.log(username);

//const createUsernames = function (user) {
//  return user
//    .toLowerCase()
//    .split(' ')
//    .map(val => val[0])
//    .join('');
//};

console.log(accounts);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(val => val[0])
      .join('');
    // in this function we do not return anything because what we're doing is to produce a side effect
  });
};
createUsernames(accounts);
console.log(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, val) => acc + val, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
// label is all the code that we represent by text, very useful for document.query selector
//calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes}€`;
};

//calcDisplaySummary(account1.movements);

const calcDisplaySummaryOut = function (acc) {
  const outgoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(outgoing)}€`;
};

//calcDisplaySummaryOut(account1.movements);

const interest = function (acc) {
  const inter = acc.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${inter >= 1 ? inter : 0} €`;
};
const displayUI = function (acc) {
  //Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
  calcDisplaySummaryOut(acc);
  interest(acc);
};
// Event handler

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // prevent the form from submitting
  // as we hit enter while on the username or pin field, we would get more and more click events
  // this is because it's the same as clicking the login button

  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // if no element matches the condition the find method would return undefined
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //? is optional chaining, basically like currentAccount&&curentAccount.pin, to avaoid errors if other value is input
    // we need to convert the value to a number as the .value is always a string
    //display UI and welcome message

    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    displayUI(currentAccount);
  }

  //console.log('LOGIN');
});

//>>>>>>>>>>>><<<<<<Transferring money from one account to the other>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  // without this if we click it'll reload the page
  // an issue pretty common with forms
  // we have to use preventdefault() method quite a bit
  const amountTrans = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc?.username === inputTransferTo.value
  );

  console.log(amountTrans, receiverAcc);
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amountTrans > 0 &&
    receiverAcc &&
    amountTrans <= currentAccount.balance &&
    receiverAcc.username !== currentAccount.username // if this username doesn't exist than the whole and operation would not execute
  ) {
    //Doing the transfer

    currentAccount.movements.push(-amountTrans);
    receiverAcc.movements.push(amountTrans);
    displayUI(currentAccount);
  }

  inputTransferTo = blur();
  inputTransferAmount = blur();
});

//>>>>>>>>>>>>>>>>>>>>>>> some method <<<<<<<<<<<<<<<<<<<<<<

// the account owner only gets tyhe loan if there's atleadst one transaction of the minimum 10 percent of the requested loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  // whgenever we see or hear the word any, we know it's a good use case for the sum method

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add tthe movement

    currentAccount.movements.push(amount);
    displayUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Find Index method <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// find index returns the index of the found element

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    inputCloseUsername.value = inputClosePin.value = ' ';

    console.log('valid DEL');
    const index = accounts.findIndex(
      // findindex would return the index of the first element for which the condition we've specified is true
      acc => acc.username === currentAccount.username
      // both find and findindex method get access to the current array parameter and both were introduced in ES6
    );
    console.log(index);
    // delete account
    accounts.splice(index, 1);
    // hide UI
    containerApp.style.opacity = 0;
    // splice method mutates the underlying array itself so no need to save the result anywhere
    // currentAccount.findIndexof(i => accounts.splice(i));
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

//>>>>>>>>>>>>>>>>>>>>>sort button>>>>>>>>>>>>>>>>>>>>>

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// using the reduce method to add the balance and print the total balance

// You can't call the method on a function that you have defined as a const variable. after the equal sign there must be a function
// each function should receive the data that it works with rather than a global variable
// you can only call the join method on an array
// side effects is to do some work i-e adding a kay and value without returning anything

//console.log(username.join(' ')) // steven thomas williams

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<FILTER METHOD >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// WE SPECIFY THE CONDITION BY CALLIN A CALLBACK FUNCTION
// just like foreach and map method, this method also gets acceseed thru the current element, value, index and array

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposits);

const deps = [];
for (const mov of movements) {
  if (mov > 0) deps.push(mov);
}

console.log(deps);

const withdrawals = movements.filter(function (mov) {
  const withdrawn = mov < 0;
  return Math.abs(withdrawn);
});

console.log(withdrawals);

// the good thing about functional programming is that we can chain the methods together to build something more effeciently

//<<<<<<<<<<<<<<<<<<<<<<<<<<Reduce Method >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// example adding up all the numbers in one array
// let's add up all the elements of the movement array

console.log(movements);

// by adding all the values in the array we'll end up with the global balance of trhe account

//const balance = movements.reduce(function (
//  accumulator,
//  currentValue,
//  index,
//  array
//) {
//  console.log(`iteration number: ${index} : ${accumulator}`);
//  return accumulator + currentValue;
//},
//10);

// in the reduce emethod the first element is the accumulator
// it's essentially the snowball that keeps adding the value until the last iteration by which the accumulator becomes the final value
// reduce (function(accumulator, ))
// the rest of the arguments in a reduce method are the same as the other methods
// In the reduce mwthod we also need to specify the initial value and it comes after the paranthesis of the function after a comma
// if the value is not added, it's assumed to be zero by the method

// doing the same thing manually with a for loop

let balance2 = 10;
for (let mov of movements) {
  balance2 += mov;
  //console.log(balance2);
}

// starts to become very cumbersome when we have to do many loops for many operations
// in abn arrow function, when using more thsn one execution use return, otherwise it'll give youy undefined error

const balance = movements.reduce((accumulator, currentValue, index) => {
  console.log(`iteration number: ${index} : ${accumulator}`);
  return accumulator + currentValue;
}, 0);
//console.log(balance);

// even simpler way, using an arrow function
// with reduce method we can also do a lot of other stuff

// for eg calculate the maximum value of the movement array
console.log(movements);

const returnedValues = movements.reduce(function (acc, cur) {
  return acc < cur ? acc : cur;
}, movements[0]);
// the returned value always go to the accumulator
// in other words the accumulator, collects or accumulates the returned values
// the reduce method is one of the most powerful array method and is used extensively
// it's difficult for others to understand
console.log(returnedValues);

//______________Chaining methods______________

// we can do all the operations individually and store the results in variables. However, we can do it all at one go aswell
//
const depositsUSD = function (moves) {
  const depositToUsd = moves
    .filter(mov => mov > 0) // let's suppose we mad a mistake here by making it < rather than > 0
    //  .map(mov => mov * euroToUsd)
    .map((mov, i, arr) => {
      console.log(arr);
      return mov * euroToUsd;
    }) // we can log the arry here to see which values in the array were returned from the filter method
    .reduce((acc, mov) => acc + mov, 0);
  console.log(depositToUsd);
};

depositsUSD(movements);

// we can chain as many methods as we like as long as the first method or the method that is chained to returns a new array
// we cannot chain a method to reduce because it returns a value
// Analogous to pipeline/ the data that we input to the chain comes out on the other end of the pipeline after being processed
// through different chains
// one drawback of chainig is that it's relatively hard to debug problems
// it's hard to figure out where the leak is at the pipeline
// however, we can use arr to debug
// we can log arrays, using the third parameter of the callback function at anytime to debug or find out where the leak is in the pipeline
// working with these three methods gives us huge benefits compared to simply loops like for loops and for each loop
// do not over use chaining
// optimise chaining
// because chaining one method after the other can cause huge performance issues especially for huge arrays
// it's a bad practise in javascript to chain methods that mutate the underlying array for eg splice method
// usually always a good practise to avoid mutating arrays

//>>>>>>>>>>>>>>>>>>>>>>>> The some and every method <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// let's look at the includes method

console.log(movements);
console.log(movements.includes(-130));
// same as below

const anyDeposits2 = movements.some(dep => dep === -130);
console.log(anyDeposits2);

// for equality we use include

// we can use the includes method to test if an array contains a certain value
// include method only tests fdor equality
// if we want to test for a condition that's where the some method comes into play
// let's say we want to know if there has been any positive movement in this account

const anyDeposits = movements.some(dep => dep > 5000);
console.log(anyDeposits);

//>>>EVERY METHOD<<<<
// close cousin of the some method
// every returns true if all the elements in an array satisfy the condition of the method

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// by tghis time we have directly written the callback function as an argument to our array methods

// we could also write this function seperately and pass the function as a callback

// SEPERATE CALLBACK
// better for the DRY principal
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// flat and flatmap method
// let's say we have a nested array

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// form one big array consisting all the sub arrays
// we use the new flat method
// flat and flat map were introducd in es2019 so won't work with super old browsers
// no callback function is required for the flat method
// flat method only goes one level deep when flatening the array by default
// however you can manage the depth of the method with the argumenet flat(2) would go 2 levels deep
// you can only use flat method on arrays not objects
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

const accountsMovements = accounts.map(acc => acc.movements);
console.log(accountsMovements);

// using a map first and the flattening out is a pretty common operation in JS
// to solve this there's also another method called flat map, which essentially combines flat and map methods

const allArrays = accountsMovements.flat();
console.log(allArrays);

const totalMonies = allArrays.reduce((acc, cval) => acc + cval, 0);
console.log(totalMonies);

// flatMap

const accountsMovements2 = accounts.flatMap(acc => acc.movements); // Map with the capital M // essentially a map method that flattens the array at the end, requires a callback function like the map method
// flat map only goes one level deep and we cannot change it so if we want to go deeper we use the methods seperately
console.log(accountsMovements2);

const totalMonies2 = allArrays.reduce((acc, cval) => acc + cval, 0);
console.log(totalMonies2);

//>>>>>>>>>>>>>>>SORTING ARRAYS>>>>>>>>>>>>>>>>>>>>>>>

// sorting is a much talked about subject in computer science
// there are countless methods and algorithms to sort
//we'll use javascript built in sort method

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // array nicely sorted alphabetically (4) ['Adam', 'Jonas', 'Martha', 'Zach']
// sort method mutates the original array. be very careful with this method

// numbers

console.log(movements);
console.log(movements.sort()); // [-130, -400, -650, 1300, 200, 3000, 450, 70], numbers are not ordered because the sort method does the sorting based on strings not numbers
// we can fix this by passing in a compare callback function in the sort method
// in sorting if we return < 0 - ordere maintained of the two elemensts being compared
// however, if we return >0 i-e return 1- order is reversed between a and b
// Ascending order
const movementsAsc = movements.sort(function (a, b) {
  if (a > b) return 1; // switch order

  if (a < b) return -1; // keep order
});
console.log(movementsAsc);
// for numbers in ascending order we can greatly simplify this by writing

const movementsAscNumbers = movements.sort((a, b) => a - b); // if we return zero i-e the values of both the elements is same than the position simply remains the same

console.log(movementsAscNumbers);
// descending

const movementsDsc = movements.sort(function (a, b) {
  if (a > b) return -1;

  if (a < b) return 1;
});
console.log(movementsDsc);
// for numbers in desending order

const movementsDscNumbers = movements.sort((a, b) => b - a);
console.log(movementsDscNumbers);

// in case of a mixed array do not use the sort method as it's not going to work properly, no point

// this method would also work for strings
// if we're working with numbers then we could simplify this a lot by using some simple maths

// <<<<<<<<<<<<<<<<<<How to programmatically create and fill arrays<<<<<<<<<<<<<<<<<<<<<<<<
// we can generate arrays programmatically rather than manually

// Empty arrays and the fill method

const arrr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x); // [empty × 7]
// weird result with one argument it only displays the number of 7 empty spaces
// we can't even call any methods, except fill, on this empty array
// we can call the fill method on an empty array

//x.fill(1); // fill method mutates the underlying array

//x.fill(what we want to fill, index where to start, index where to end)

const arrFill = arrr.fill(23, 4, 6);
console.log(arrFill); // (7) [1, 2, 3, 4, 23, 23, 7]

console.log(x); // (7) [1, 1, 1, 1, 1, 1, 1]

// Array.from method
const y = Array.from({ length: 7 }, () => 1);
// Array.from({length object, callback function, exactly like the map method callback function})
console.log(y); // (7) [1, 1, 1, 1, 1, 1, 1]
// to create an array

const z = Array.from({ length: 7 }, (_, i) => i + 1); // it's a convention to use _ if we're not using a parameter
console.log(z);

const dice = Array.from(
  { length: 100 },
  cur => Math.round(Math.random(cur) * 5) + 1
);
console.log(dice);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), val=>Number(val.textContent.replace('€', ''))) ;
  console.log(movementsUI);
  //const valFinal= movementsUI.map(val=>Number(val.textContent.replace('€', '')))
  //console.log(valFinal);
});

// which array method to Use
// start by asking the question, what do i  actually want from this method



// we can attach event listeners to any object, it doesn't necessarily have to be a button

// Coding challenge number 1
/*

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.

Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
�
")
4. Run the function for both test datasets
Test data:
Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far �
GOOD LUCK �


const juliaNew = [9, 16, 6, 8, 3];
const kateNew = [10, 5, 6, 1, 4];
const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];

const julia2 = julia1.slice(1, -2);
console.log(julia2);

const juliaKate = [...julia2, ...kate1];
const juliaKaty = juliaNew.concat(kateNew);
console.log(juliaKate);
console.log(juliaKaty);

const checkdogs = function (juliaKate, juliaKaty) {
  const dogs = juliaKate || juliaKaty;
  dogs.forEach(function (val, i) {
    const des = val < 3 ? 'still a puppy' : 'an adult';
    console.log(`Dog number${i + 1} is ${des} and is ${val} years old`);
  });
};




checkdogs(juliaKate);
*/
/*


Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages �)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK �z
*/

/*const dogAges = [5, 2, 4, 1, 15, 8, 3];
const dogAges2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(function (dogAge) {
    if (dogAge <= 2) {
      return dogAge * 2;
    } else {
      return 16 + dogAge * 4;
    }
  });
  const adults = humanAges.filter(function (keep) {
    return keep >= 18;
  });

  const allAge = adults.reduce(
    (acc, cval, i, arr) => acc + cval / arr.length,
    0
  );

  //const averageAge = allAge / humanAges.length;
  console.log(humanAges);
  console.log(adults);
  //console.log(averageAge);
  console.log(allAge);
};
calcAverageHumanAge(dogAges);

const calcAverageHumanAgeChain = function (ages) {
  return ages
    .map(dogAge => (dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4))
    .filter(adult => adult >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
};
//console.log(ageChain);
const avg1 = calcAverageHumanAgeChain(dogAges2);
console.log(avg1);

// we can use the find method to retrieve one element of an array based on a condition
// find is another method that loops over the array
const firstWithdrwal = movements.find(mov => mov < 0);

// unlike the filter method the find method would not return the array rather the first element that satisfies the condition
// fiulter method returns a new array and the find method just the elemet of the array not the array
// first element of the array for the which the condition in the callback function becomes true
// first withdrawl
console.log(movements);
console.log(firstWithdrwal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); // {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}
//

// in this case it would return the object. as it's array within an array

let accFor;
for (const account of accounts) {
  if (account.owner === 'Steven Thomas Williams') {
    accFor = account;
  }
}
console.log(accFor);
*/
