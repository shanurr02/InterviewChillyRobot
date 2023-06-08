"use strict";
/*******************************  PROBLEM  ************************************************ */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var fs = require("fs"); // Importing the 'fs' module from Node.js for file system operations
// Function to read the input file and return a Promise resolving to an array of lines
function readFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf-8', function (err, data) {
            if (err) {
                reject(err); // Reject the promise with the error if file reading fails
            }
            else {
                var lines = data.split('\n').map(function (line) { return line.trim(); }).filter(function (line) { return line !== ''; });
                resolve(lines); // Resolve the promise with the array of lines
            }
        });
    });
}
// Function to find the first non-repeating character in a string
function findChar(str) {
    var charCount = new Map(); // Map to store character counts
    // Count the occurrences of each character in the string
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var char = str_1[_i];
        if (charCount.has(char)) {
            charCount.set(char, charCount.get(char) + 1); // Increment count if character exists in map
        }
        else {
            charCount.set(char, 1); // Add character to map with count 1 if it doesn't exist
        }
    }
    // Find the first non-repeating character by iterating over the string
    for (var _a = 0, str_2 = str; _a < str_2.length; _a++) {
        var char = str_2[_a];
        if (charCount.get(char) === 1) {
            return char; // Return the first non-repeating character found
        }
    }
    return null; // Return null if no non-repeating character is found
}
// Function to loging  each line result  and  calling findchar for the first non-repeating character
function logging(lines) {
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var result = findChar(line);
        console.log(" '".concat(line, "' ----------------       --------------  '").concat(result, "'"));
    }
}
// Main function to execute the program
/* By marking the main function as async, it becomes an asynchronous function, and we can
use await within it to handle promises in a synchronous-like manner. This makes the code
more readable and easier to follow, especially when dealing with asynchronous operations
like file reading. The await keyword is used to wait for a Promise to resolve before proceeding with
the execution of the code*/
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var inputFile, lines, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputFile = 'input.txt';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, readFile(inputFile)];
                case 2:
                    lines = _a.sent();
                    console.log('Input String    :     First non-repeating character  ');
                    logging(lines); // Process each line and find the first non-repeating character
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error('An error occurred while reading the input file:', err_1); // Handle any errors during file reading
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Entry point of the program
main();
