function tenSquared(){


	return 10 * 10;
}

///the above function would be a useless function because there is no reusability to it whatsover, it just evaluates to 100, so why not just give it a number of 100;

//the below function is useful because it is generalized, we have given it a parameter and can pass in any argument we want. This way, we can reuse it as many times as we want. The principle of making our functions reusable is why we have higher order functions.

function squareNum(num){
	return num * num;
}

squareNum(10); //100
squareNum(9); //81

function copyArrayAndMultiplyBy2(array){

   let output = [];

   for(let i = 0; i < array.length; i ++){

   	output.push(array[i]*2);
   }

   return output;

}

const myArray = [1, 2, 3];
let result = copyArrayAndMultiplyBy2(myArray);
console.log(result);

//line by line
//1) Declare a function called copyArrayAndMultiplyBy2 and assign it to the global memory space (skip over function body until it is called)
//2) Declare a variable called myArray and assign 3 items to it and save it to global memory.
//3) Declare a variable called result in global memory  
//4) Pass myArray in as an argument of the copyArrayAndMultiplyBy2 function, Call the function, whatever this function returns is going to get stored as the value of of the result variable (So the variable will be undefined at first, but as soon as the code runs, it will hold the value of what the function returns)
//5) Invoke the function (the code in the brackets runs and a new execution context is created) Pass the myArray ([1, 2, 3])in as an argument of the array parameter of copyArrayAndMultiplyBy2  
//6) Declare a variable called output in the local memory space of the copyArrayAndMultipyBy2 function and assign it the value of an empty array.
//7) Run a for loop over the length of the array and push each item into our empty output array after it has been muliplied by 2
//8) Return the value of output into the local memory of the copyArrayAndMultiplyBy2 function and then store the return value into the global memory of the variable result.


//We can wrap up more functionality to use in the above function by passing in more functions as arguments

function copyArrayAndManiputate(array, instructions){

	let outputA = [];
	for (let i = 0; i < array.length; i ++){

		outputA.push(instructions(array[i]));

	}

	return outputA;

}

function multiplyBy2(input){

	return input * 2;
}

let resultA = copyArrayAndManiputate([1, 2, 3], multiplyBy2);

console.log(resultA);

// when we call copyArrayAndManiputate, we can pass in a function as the argument for the instructions parameter. so we generalize the function and only pass in the instructions when we run the copyArrayAndManiputate function

//copyArrayAndManiputate Line by Line

//1) Declare a function called copyArrayAndManiputate that takes two parameters (array and instructions) and save the function to global memory
//2) Declare a function called multiplyBy2 that takes one parameter and save this function to global memory
//3) Declare a variable called resultA (it will have the value of undefined even as we are invoking it. when we have the returned value it will be stored as the value of resultA.)
//4) Call the function copyArrayAndManiputate, pass in an array [1, 2, 3] as one argument and the entire multiplyBy2 function definition as the other. 
//so wherever we see array in this function, it will be replaced by [1, 2, 3] and wherever we see instructions, js will replace that with the words multiplyBy2
//Whatever this function returns will be stored in the value of the resultA variable
//5) copyArrayAndManiputate invokes and the array and the return value of multiplyBy2 are passed in as arguments
//6) This creates a new execution context and copyArrayAndManiputate goes to the top of the call stack
//7) The parameters and arguements are what are first stored into local memory. (array : [1, 2, 3] and instructions : multiplyBy2)
//8) A variable called outputA is declared and assigned the value of an empty array.
//9) We run a for loop over the length of array. It iterates 3 times. The item at the 0 index is operated on by the instructions, the item at 1 and 2 index are as well
//10) When instructions invokes, a new execution context is created and instructions goes on top of the call stack
//11) The first parameter to be saved into the local variable space of instructions (which is really just multiplyBy2) is input : 1. Input which is 1 gets multiplied by 2 and pushed into the outputA array, it gets returned in outputA in the execution context of copyArrayAndManipulate. the execution context that was created is popped off the stack.
//12) The for loop iterates again. This time the iterator is at 1 and the value is 2. A new execution context is created. the first parameter into this new execution context is input : 2, it gets multiplied by 2 and pushed into the outputA array and returned in outputA in the execution context of copyArrayAndManiputate. this execution context is also popped off the stack.
//13) The for loop iterates again. This time the iterator is at 2 and the value is 3. A new execution context is created. the first parameter into this new execution context is input : 3, it gets multiplied by 2 and pushed into the outputA array and returned in outputA in the execution context of copyArrayAndManiputate. this execution context is also popped off the stack.
//14) The returned value of outputA ([2, 4, 6]) is now returned into the global variable of resultA.

//The second function is more flexible since it is more general and we pass in a function as a parameter
//This works because functions are first class objects. They can co-exist with and can be treated like any other javscript object
//They can be assigned to variables and properties of other objects, passed in as arguments into functions and returned as values from functions
//Functions, unlike other objects have the ability to be called(invoked, run) and that can present consequences.

//Callbacks vs Higher order functions
//The function we pass in is the callback, The outer function that takes in the callback is the higher order function
//Higher order functions takes in or pass out a function

//Callbacks and Higher order functions simplify our code and keep it from having to repeat. we can pass placeholders(parameters) and pass in a callback function to do specific functionality so that we don't have to rewrite code
//They also let us run Asynchronous code

//Goals of Asynchronous javscript
//Be able to do tasks that take a long time to complete (getting data from the server)
//Continue running our js code line by line without one long task blocking further javascript execution
//when our slow task completes, we should be able to run functionality knowing that task is done and data is ready.


//closures and callbacks

//passes a function and a second parameter to setTimeout 
//thanks to the closure, it still has access to greeting 3 seconds later


function sayHiLater(){

   let welcome = "Hi";

   setTimeout(function(){

     console.log(welcome);

   }, 3000);


}

//sayHiLater();

//functions that do something after you run another function/ giving this function to another function and having it execute is called a callback
//i execute you and, when you're done,  you in turn execute this other function for me
//Callback function: a function you give to another function, to be run when the other function is finished (I call function A and give it function B as an argument, and when function A finishes running, it calls function B for me)

function tellMeWhenDone(callBack){

 let a = 1000;//some work
 let b = 2000;//some work
 console.log(a + b);
 callBack();//the callback (it runs the function that I give it)

}

tellMeWhenDone(function(){
 
  console.log("I am done");

});

//I can call it again and this time pass in a different callback function

tellMeWhenDone(function(){
 
  console.log("I am done again");

});

//Callbacks are necessary for asynchronous programming (including waiting for user requests, making a request to another server, doing something with the response, loading a file, etc)  
//if you used a function synchronously, instead of a callback, then the function would be called too soon. It would be called before it gets the data that it needs and therefore would not work.

//if we have 3 functions that execute synchronously and the first 2 take more time than the last one, then that means that the first two functions are blocking the call stack/main thread. So we can't perform any other operation while the first two are still executiong. Callbacks solve this issue.

//JavaScript is a Syncronous, single threaded, blocking language but you can maniputlate it to behave asynchronously (which allows programs to do more than one thing at a time)

//Features like Promises allow you to set an operation running(eg.fetching an image from the server) and then wait until the result has returned before running another operation. Since the operation is happening somewhere else, the main thread is not blocked while the async operation is being processed.

//code below runs one line at a time and the p element will not appear until the date shows up in the console. While each operation is being processed, nothing else can happen since JS is single threaded. Every thing is blocked until an operation completes.

const btn = document.querySelector("button");
btn.addEventListener("click", ()=>{
  
  let myDate;

  for(let i = 0; i < 10000000; i ++){
   
   let date = new Date();
   myDate = date;

  }

  console.log(myDate);

  let pElem = document.createElement("p");
  pElem.textContent = "This is a newly-added Paragraph.";
  document.body.appendChild(pElem);


});

//if you try to run the two tasks below
//when you fetch and image from the server, you don't know how long it will take to download
//so when you run the second line, it will throw an error since the the first task is not availble yet
//So you need to make your code wait until the response is returned before it tries to do anything else

// let response = fetch("myImage.png");
// let fetched = response.fetched();


const array = [1, 2, 3];

function update(callback) {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    const updated = callback(array[i]);
    output.push(updated);
  }

  return output;
}

// Callback functions
function add10(num) {
  return num + 10;
}

function multiplyBy20(num) {
  return num * 20;
}

function stringify(num) {
  return num.toString();
}

// Call update with each callback function
let addedNumbers = update(add10); // returns [11, 12, 13]
console.log(addedNumbers);
update(multiplyBy20); // returns [20, 40, 60]
update(stringify); // returns [‘1’, ‘2’, ‘3’]

//Callback: It is passed in as an argument of another function. It is called inside of the other function.
//Higher Order Function: It takes a function as an argument. It calls the input function when it is called. Higher order functions have callbacks as inputs and call those callbacks somewhere in their definition.

//Higher Order Function

function pluralize(array) {
//create an empty array to hold our results	
 const result = [];

 //loop through the array that is passed in

 for(let i = 0; i < array.length; i++) {

 	//the addS function is passed in as a callback of the push method and invoked
 	//each string in the array is being passed in as a parameter of the addS function
    
   result.push(addS(array[i]));
 }

 return result;
}


//Callback

function addS(string) {
//the parameter is concatenated with an s
 return `${string}s`;
}

const animals = ["goat", "duck", "pig", "cow"];

//call the pluralize function and pass in our animals array
console.log(pluralize(animals))


// <------------Map function-------------------> 

//callback function

function subtractTwo(number){

   // returns  a number with two subtracted from it
	return number - 2 ;
}

//higher order function

// map function takes an array and a callback function

function mapA(array, callback){
    
    //create an empty array

     let newArray = [];

    //loop through the length of the array that we are going to pass in 

     for(let i = 0; i < array.length; i ++){
         
       //each item in the array will be computed against our callback function
     	newArray.push(callback(array[i]));
     }

     return newArray;
}

// create an array to pass in 

let numbers = [3, 7, 9];

//call the map function, pass in our array and our callback
console.log(mapA(numbers, subtractTwo));


//<--------------For Each--------------->


let num = [1, 2, 3];

function forEach(arr, callback){

 for(let i = 0; i < arr.length; i ++){
     
     callback(arr[i]);

 }

}

forEach(num, i => console.log(i));




function map(array, callback){

    let arrayA = [];
 
    forEach(arrayA.push(n => n - 2));


    return  arrayA;

}


console.log(map(num,n => n - 2));

//callbacks enable higher order functions like map, filter and reduce. Makes code more concise. 
//when we see a function name passed in, we are passing a reference to where that function lives in memory

//we pass in parameters in functions, they are taken is as arguments and are stored as variables in local memory
//return passes the value out of local memory and saves it to global memory. nothing executes after undefined.  