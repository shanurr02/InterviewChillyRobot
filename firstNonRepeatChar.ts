
/*******************************  PROBLEM  ************************************************ */

/*Please write a program that does the following:

It reads inputs from a text file with contents of the manner:
```
aabbdd
aabbddnndsk
porel
qwertlt
```

And for each string in each line finds the first non-repeating character and
 prints it to console the  in the following format:
```
Given 'aabbddch' the first non-repeating character was 'c'
```
Try to write your most efficient code to do this.

Requirements:
- The program should be written with Node and Typescript.
- The program should use modular functions, proper naming of variables, parameters, and functions.
- Each function should have a single responsibility.
- Any data structure you use should have a justifiable comment with it as to why that is your choice.*/



/***********************************  SOLUTION  ********************************************************* */


/* Command to Run Program 
   1. npm install @types/node
   2. npx tsc firstNonRepeatChar.ts
   3. node firstNonRepeatChar.js
   Run these commands in terminal one by one.
*/




/* I use Map, here is the five reason why i use it

  1. The Map data structure allows values to be associated with specific keys, 
   which is required for counting the number of repetitions of characters in a string.

  2. Map provides an efficient lookup mechanism for retrieving values depending on the keys.
   The complexity of key-based operations is O(1).

  3. Map maintains the order in which key-value pairs are inserted, 
   ensuring that the first non-repeating character found in the string is accurately returned.

  4. Map automatically manages duplicate keys, making sure that each character 
   is counted precisely without requiring additional logic to manage duplicates.

 5. Map includes useful methods like has() and get() that make it simple to determine
   whether a key exists and retrieve its related value.

 6. Using the for-of loop, a map makes it simple to iterate over its elements.
*/




import * as fs from 'fs';  // Importing the 'fs' module from Node.js for file system operations




// Function to read the input file and return a Promise resolving to an array of lines
function readFile(filePath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);  // Reject the promise with the error if file reading fails
        } else {
          const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
          resolve(lines);  // Resolve the promise with the array of lines
        }
      });
    });
  }





// Function to find the first non-repeating character in a string
function findChar(str: string): string | null {
  const charCount = new Map<string, number>();  // Map to store character counts

  // Count the occurrences of each character in the string
  for (const char of str) {
    if (charCount.has(char)) {
      charCount.set(char, charCount.get(char)! + 1);  // Increment count if character exists in map
    } else {
      charCount.set(char, 1);  // Add character to map with count 1 if it doesn't exist
    }
  }
// Find the first non-repeating character by iterating over the string
  for (const char of str) {
    if (charCount.get(char) === 1) {
      return char;  // Return the first non-repeating character found
    }
  }

  return null;  // Return null if no non-repeating character is found
}




// Function to loging  each line result  and  calling findchar for the first non-repeating character
function logging(lines: string[]): void {
    for (const line of lines) {
      const result = findChar(line);
      console.log(` '${line}' ----------------       --------------  '${result}'`);
    }
  }



// Main function to execute the program
/* By marking the main function as async, it becomes an asynchronous function, and we can 
use await within it to handle promises in a synchronous-like manner. This makes the code
more readable and easier to follow, especially when dealing with asynchronous operations
like file reading. The await keyword is used to wait for a Promise to resolve before proceeding with 
the execution of the code*/

async function main() {
  const inputFile = 'input.txt';

  try {
    const lines = await readFile(inputFile);  // Read the lines from the input file
    console.log('Input String    :     First non-repeating character  ');
    logging(lines);  // Process each line and find the first non-repeating character
  } catch (err) {
    console.error('An error occurred while reading the input file:', err);  // Handle any errors during file reading
  }
}

// Entry point of the program
main();
