---
title: JS Filter
slug: JS_filter method
meta: 자바스크립트 필터 메소드에 대해 알아보기
---

# 📌들어가기에 앞서

> 해당 포스트는 자바스크립트를 학습한 내용을 일부 정리한 내용입니다. 모든 내용을 정리하기보다는 간단히 개념을 정리하고 활용할 수 있는 방법을 위주로 작성하였습니다. 아직 배우는 중으로 잘못된 부분이 있을 수 있습니다.

<br/>

# 📖 filter 메서드

<br/>

## 🔎 filter 메서드란 ?

<br/>

> `filter` 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다. | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

`filter` 메서드는 자신을 호출한

reduce 메서드는 배열의 요소를 조건에 따라 재구성하는 기능을 수행합니다. 자신을 호출한 배열의 모든 요소들을 반복하면서 전달 받은 함수(콜백함수)를 만족하는 요소만으로 새롭게 구성된 배열을 반환합니다. 이 때 **원본 배열은 변경되지 않습니다.**
`filter` 메서드가 생성하여 반환한 새로운 배열의 `length` 는 `ilter` 메서드를 호출한 배열의 `length` 의 값과 같거나 작습니다.

<br/>

`filter` 메서드의 기본 구문은 아래와 같습니다.

```js
const newArray = originalArray.filter(callbackFunction(element, index, array) {
  // return boolean value
});

```

- `originalArray`: 필터링을 할 원본 배열입니다.
- `newArray`: 조건 함수를 만족하는 요소들로 새로운 배열을 생성합니다.

- `callbackFunction`: 필수 매개변수로, 조건 함수 또는 콜백 함수라고 불리며, 배열의 요소들을 순회하면서 각 요소를 대상으로 실행됩니다.
- 이 함수는 3개의 매개변수를 받습니다.

  - `element`: 배열의 현재 요소입니다.

  - `index`: 현재 요소의 인덱스입니다.
  - `array`: filter() 메서드를 호출한 원본 배열입니다.
  - `return boolean value`: 조건 함수가 true를 반환하면 현재 요소를 새로운 배열에 포함하고, false를 반환하면 현재 요소를 새로운 배열에서 제외합니다.

<br/>

예를 들어, [1, 2, 3, 4, 5] 라는 배열이 있을 때, 아래와 같이 `filter` 메서드를 활용하
여 짝수만 추출할 수 있습니다.

```js
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter((number) => number % 2 === 0);
console.log(evenNumbers); // [2, 4]
```

위 코드에서`number % 2 === 0`은 `true`를 반환하는 조건 함수입니다. 따라서 `filter` 메서드는 `numbers` 배열의 모든 요소를 순회하면서, 해당 조건을 만족하는 요소만을 새로운 배열인 `evenNumbers`에 담아 반환합니다.

<br/>

# 📖 filter 메서드 다양하게 활용해보기

<br/>

## 🔎 조건에 맞는 요소만 추출하기

<br/>

### ✍ 객체 배열에서 특정 조건에 맞는 객체 추출하기

<br/>

```js
const users = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Peter', age: 20 },
];
const youngUsers = users.filter((user) => user.age <= 25);
console.log(youngUsers);
/* 
[{ id: 1, name: 'John', age: 25 },
{ id: 3, name: 'Peter', age: 20 }] 
*/
```

<br/>

### ✍ 특정 값 이상인 요소만 추출하기

<br/>

```js
const numbers = [1, 2, 3, 4, 5];
const greaterThanThree = numbers.filter((number) => number >= 3);
console.log(greaterThanThree); // [3, 4, 5]
```

<br/>

### ✍ 특정 문자열이 포함된 요소만 추출하기

<br/>

```js
const fruits = ['apple', 'banana', 'orange', 'kiwi'];
const includesA = fruits.filter((fruit) => fruit.includes('a'));
console.log(includesA); // ['apple', 'banana', 'orange']
```

<br/>

### ✍ 특정 범위의 요소만 추출하기

<br/>

```js
const numbers = [1, 2, 3, 4, 5];
const range = numbers.filter((number) => number >= 2 && number <= 4);
console.log(range); // [2, 3, 4]
```

<br/>

### ✍ 배열 요소를 변환하여 추출하기

<br/>

```js
const numbers = [1, 2, 3, 4, 5];
const multipliedNumbers = numbers.map((number) => number * 2).filter((number) => number >= 5);

console.log(multipliedNumbers); // [6, 8, 10]
```

`numbers` 배열의 각 요소에 2를 곱한 값을 새로운 배열에 담으려면, filter와 함께 map 메서드를 사용하여 작성할 수 있습니다. 위 예제 코드에서, `map` 메서드는 배열의 각 요소에 2를 곱한 값을 반환하고, filter 메서드는 반환된 값이 5 이상인 요소만 추출합니다. 따라서 `multipliedNumbers` 배열에는 `[2, 4, 6, 8, 10]` 중에서 5 이상인 요소만 남게 됩니다.

<br/>

다른 예시로는, 배열의 문자열 요소를 모두 대문자로 변환하여 새로운 배열을 생성하는 경우가 있습니다.

```js
const fruits = ['apple', 'banana', 'cherry', 'durian'];

const uppercasedFruits = fruits
  .map((fruit) => fruit.toUpperCase())
  .filter((fruit) => fruit.startsWith('A') || fruit.startsWith('C'));

console.log(uppercasedFruits); // ['APPLE', 'CHERRY']
```

위 예제 코드에서, `map` 메서드는 배열의 각 문자열 요소를 대문자로 변환하고, `filter` 메서드는 반환된 문자열이 'A' 또는 'C'로 시작하는 요소만 추출합니다. 따라서 `uppercasedFruits` 배열에는 `['APPLE', 'BANANA', 'CHERRY', 'DURIAN']` 중에서 `'APPLE'`과 `'CHERRY'`만 남게 됩니다.

<br/>

### ✍ 특정 속성 값에 따라 요소를 그룹핑하여 추출하기

<br/>

```js
const users = [
  { name: 'Alice', age: 25, gender: 'female' },
  { name: 'Bob', age: 30, gender: 'male' },
  { name: 'Charlie', age: 35, gender: 'male' },
  { name: 'David', age: 40, gender: 'male' },
  { name: 'Ella', age: 45, gender: 'female' },
];

// gender가 female인 요소 추출하기
const femaleUsers = users.filter((user) => user.gender === 'female');
console.log(femaleUsers);
/*
[{ name: 'Alice', age: 25, gender: 'female' }, 
{ name: 'Ella', age: 45, gender: 'female' }]
*/

// gender가 male인 요소 추출하기
const maleUsers = users.filter((user) => user.gender === 'male');
console.log(maleUsers);
/*
[{ name: 'Bob', age: 30, gender: 'male' },
{ name: 'Charlie', age: 35, gender: 'male' }, 
{ name: 'David', age: 40, gender: 'male' }]
*/
```

위 예시에서는 filter 메서드에 gender 속성 값이 female인 경우와 male인 경우를 각각 조건으로 설정하여 요소를 추출했습니다. 결과적으로 female과 male에 따라 그룹핑된 요소들이 각각 추출되었습니다.

<br/>

### ✍ 배열에서 특정 속성 값을 이용하여 요소를 새로운 객체 배열로 변환하여 추출하기

<br/>

```js
const users = [
  { name: 'Alice', age: 20 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 30 },
  { name: 'David', age: 35 },
];

const filteredUsers = users
  .filter((user) => user.age >= 25)
  .map((user) => ({ name: user.name, age: user.age }));
console.log(filteredUsers); /* 
[{ name: 'Bob', age: 25 }, 
{ name: 'Charlie', age: 30 }, 
{ name: 'David', age: 35 }]
*/
```

위 예제에서는 filter 메서드를 사용하여 age 속성 값이 25 이상인 요소만 추출하고, map 메서드를 사용하여 새로운 객체 배열을 생성했습니다. 이때 map 메서드는 추출된 요소를 새로운 객체로 변환하는 데 사용되었습니다. 즉, map 메서드의 콜백 함수에서는 추출된 요소를 새로운 객체로 변환하여 반환해야 합니다. 이때 새로운 객체의 속성 이름은 원하는 대로 지정할 수 있습니다. 위 예제에서는 name과 age 속성을 유지하였습니다.

<br/>

## 🔎 배열에서 특정 요소를 추출하기

<br/>

### ✍ falsy 값 제거하기

<br/>

```js
const arr = [1, 2, null, 3, undefined, 4, '', 0, NaN, 5];
const filteredArr = arr.filter(Boolean);
console.log(filteredArr); // [1, 2, 3, 4, 5]
```

<br/>

### ✍ 정규식을 이용하여 배열에서 특정 문자열 패턴을 가진 요소만 추출하기

<br/>

```js
const words = ['apple', 'banana', 'orange', 'grapefruit', 'kiwi', 'pineapple'];

// 정규식 패턴을 이용하여 'ap'로 시작하는 요소만 추출하기
const filteredWords = words.filter((word) => /^ap/.test(word));

console.log(filteredWords); // ['apple']
```

위 예시에서는 `^ap`를 정규식 패턴으로 사용하여, `ap`로 시작하는 문자열을 가진 요소만 추출하도록 필터링하였습니다. `test` 메서드를 사용하여 해당 요소가 정규식 패턴과 일치하는지 여부를 확인합니다.

<br/>

### ✍ 특정 속성이나 키에 대해 중복된 값을 제거하고 추출하기

<br/>

```js
const data = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'John' },
  { id: 4, name: 'Bob' },
  { id: 5, name: 'Jane' },
];

const filteredData = data.filter((item, index, self) => {
  // 배열에서 현재 아이템의 인덱스와 같은 인덱스를 가지는 아이템이 있는지 검사
  return index === self.findIndex((t) => t.name === item.name);
});

console.log(filteredData);
// [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}, {id: 4, name: 'Bob'}]
```

```js
const arr = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
  { id: 3, name: 'cherry' },
  { id: 4, name: 'apple' },
  { id: 5, name: 'cherry' },
  { id: 6, name: 'banana' },
  { id: 7, name: 'apple' },
  { id: 8, name: 'banana' },
];

const result = arr.filter(
  (elem, index, self) => index === self.findIndex((t) => t.name === elem.name)
);

console.log(result);
// [ { id: 1, name: 'apple' },
//   { id: 2, name: 'banana' },
//   { id: 3, name: 'cherry' } ]
```

위 코드에서 `filter` 메서드 내부에서 `findIndex` 메서드를 사용합니다. `findIndex` 메서드는 주어진 조건을 만족하는 첫 번째 요소의 인덱스를 반환합니다. `findIndex` 메서드로 찾은 인덱스와 현재 아이템의 인덱스를 비교하여 중복된 값을 제거합니다.

<br/>

### ✍ 특정 속성의 값을 기준으로 요소를 오름차순 또는 내림차순으로 정렬하여 추출하기

<br/>

```js
const arr = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 32 },
  { name: 'Mike', age: 18 },
  { name: 'Alex', age: 27 },
];

// 나이를 기준으로 오름차순으로 정렬하고, 25세 이상인 사람들만 추출하기
const filteredArr = arr.sort((a, b) => a.age - b.age).filter((person) => person.age >= 25);

console.log(filteredArr);
/* 
[{ name: 'John', age: 25 }, 
{ name: 'Alex', age: 27 },
{ name: 'Jane', age: 32 }]
*/
```

위 예시에서는 `sort` 메서드를 사용하여 `age` 속성 값을 기준으로 오름차순으로 정렬한 후, `filter` 메서드를 사용하여 `age` 속성 값이 25 이상인 요소만 추출하였습니다. 결과적으로, `filteredArr` 변수에는 `age` 속성 값이 25 이상인 요소들만 저장되어 있습니다.

<br/>

### ✍ 특정 인덱스 범위의 요소만 추출하기

<br/>

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const startIndex = 2;
const endIndex = 5;

const filteredArr = arr.filter((_, index) => {
  return index >= startIndex && index <= endIndex;
});

console.log(filteredArr); // [3, 4, 5, 6]
```

`filter` 메서드를 사용하여 특정 인덱스 범위의 요소만 추출할 수 있습니다. 이때는 `Array.prototype.filter` 메서드와 함께 `Array.prototype.indexOf` 메서드를 활용합니다.예를 들어, 배열에서 인덱스 2부터 5까지의 요소만 추출하고 싶다면 위와 같이 코드를 작성할 수 있습니다.
위 코드에서는 `filter` 메서드를 사용하여 `index`를 기준으로 필터링합니다. `startIndex`과 `endIndex`를 사용하여 추출할 인덱스 범위를 지정하고, `filter` 메서드에서 해당 범위 내의 인덱스만 필터링하여 `filteredArr`에 저장합니다. 출력 결과는 `[3, 4, 5, 6]`이 됩니다.

<br/>

### ✍ 특정 요소를 제외하고 추출하기

<br/>

```js
const fruits = ['apple', 'banana', 'orange', 'mango', 'kiwi'];
const newFruits = fruits.filter((fruit) => fruit !== 'orange');
console.log(newFruits); // ['apple', 'banana', 'mango', 'kiwi']
```

<br/>

### ✍ 특정 속성 값이 배열인 요소만 추출하기

<br/>

```js
const data = [
  { id: 1, name: 'Alice', hobbies: ['reading', 'painting'] },
  { id: 2, name: 'Bob', hobbies: ['swimming'] },
  { id: 3, name: 'Charlie', hobbies: ['drawing', 'cooking'] },
  { id: 4, name: 'David', hobbies: ['hiking', 'camping'] },
  { id: 5, name: 'John', hobbies: 'camping' },
];

const filteredData = data.filter((item) => Array.isArray(item.hobbies));
console.log(filteredData);
// [{ id: 1, name: 'Alice', hobbies: ['reading', 'painting'] },
//  { id: 2, name: 'Bob', hobbies: ['swimming'] },
//  { id: 3, name: 'Charlie', hobbies: ['drawing', 'cooking'] },
//  { id: 4, name: 'David', hobbies: ['hiking', 'camping'] }]
```

위 예시에서는 `filter` 메서드를 사용하여 `hobbies` 속성 값이 배열인 요소만 추출하였습니다. `Array.isArray` 메서드를 사용하여 속성 값이 배열인지 확인하고, filter() 메서드를 사용하여 추출합니다.

<br/>

### ✍ 특정 요소를 찾아서 추출하기

<br/>

```js
const items = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
  { id: 3, name: 'orange' },
  { id: 4, name: 'grape' },
];
const filteredItems = items.filter((item) => item.id === 2);
console.log(filteredItems); // [{ id: 2, name: 'banana' }]
```

위 코드에서는 `filter` 메서드에 전달한 콜백 함수에서 조건으로 `item.id === 2`를 사용했습니다. 이 조건은 `id`가 `2`인 객체만 추출하도록 만들어주는 역할을 합니다.

<br/>

# 📚 레퍼런스

> 이웅모. 모던 자바스크립트 Deep Dive : 자바스크립트의 기본 개념과 동작 원리 / 이웅모 지음 (2020). Print.

> [Array.prototype.filter() | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
