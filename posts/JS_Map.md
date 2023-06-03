---
title: JS Map
slug: JS_Map
meta: 자바스크립트 Map에 대해 알아보기
---

# 📌들어가기에 앞서

> 해당 포스트는 자바스크립트를 학습한 내용을 일부 정리한 내용입니다. 모든 내용을 정리하기 보다는 간단히 개념을 정리하고 활용할 수 있는 방법을 위주로 작성하였습니다.  
>  아직 배우는 중으로 잘못된 부분이 있을 수 있습니다. 이에 대해서 무분별한 비난보다는 가르침을 부탁드리겠습니다.

</br>

# 📖 Map

</br>

## 🔎 요약

</br>

`Map 객체`는 `키-값` 쌍의 쌍으로 이루저진 컬렉션입니다. Map객체는 객체와 유사하지만 다음과 같은 차이가 있습니다.

</br>

|          구분          |          객체           |       Map 객체        |
| :--------------------: | :---------------------: | :-------------------: |
| 키로 사용할 수 있는 값 |   문자열 또는 심벌 값   | 객체를 포함한 모든 값 |
|        이터러블        |            X            |           O           |
|     요소 개수 확인     | Object.keys(obj).length |       Map.size        |

</br>

이 객체는 다양한 용도로 사용될 수 있으며, 배열과 객체와 같은 다른 자료구조와 함께 사용될 수 있습니다. Map 객체는 키와 값을 연결하고, 다양한 타입의 키를 사용할 수 있습니다.

</br>

Map 객체의 특징 중 하나는, 다양한 자료형을 키로 사용할 수 있다는 것입니다. 객체와 다르게 문자열과 심벌뿐만 아니라, 숫자, 불리언, 심지어 객체나 함수도 키로 사용할 수 있습니다. 또한, Map 객체는 이터레이션을 지원하기 때문에, `for...of` 루프나 `forEach `메서드를 사용하여 Map 객체의 키-값 쌍에 접근할 수 있습니다.

</br>

Map 객체가 제공하는 주요 메서드를 요약하면 다음과 같습니다.

- `set(key, value)`: Map 객체에 키-값 쌍을 추가합니다.
- `get(key)`: 주어진 키에 해당하는 값을 반환합니다.
- `has(key)`: 주어진 키가 Map 객체에 있는지 확인합니다.
- `delete(key)`: 주어진 키에 해당하는 값을 삭제합니다.
- `clear()`: Map 객체의 모든 키-값 쌍을 삭제합니다.
- `size`: Map 객체의 키-값 쌍의 수를 반환합니다.

</br>

Map 객체는 키-값 쌍을 저장하므로, 객체와 달리 속성의 이름을 문자열로 변경하지 않아도 되며, 속성 이름 충돌을 막을 수 있습니다. 또한, Map 객체는 순서가 보장되어 있는 이터러블이므로, 키-값 쌍의 순서를 지켜야 하는 경우에 유용합니다.

</br>

마지막으로, Map 객체는 다른 자료구조와 함께 사용될 수 있습니다. 예를 들어, Set 객체와 함께 사용하여 중복을 제거하거나, Object와 함께 사용하여 Map 객체와 Object의 장점을 결합할 수 있습니다.

</br>
</br>

# 📖 Map 객체 생성 및 사용법

</br>

## 🔎 생성

</br>

- Map 객체는 `Map 생성자 함수`로 실행한다.
- Map 생성자 함수에 인수를 전달하지 않으면 빈 Map 객체가 생성된다.

</br>

```js
const myMap = new Map();
console.log(myMap); // Map(0) {}
```

</br>

위 처럼 인수를 전달하지 않고 빈 Map객체를 생성할 수도 있고, 다음과 같이 초기값을 지정하여 생상할 수도 있습니다.

</br>

```js
const myMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
  ['key3', 'value3'],
]);

console.log(myMap);
//Map(3) {'key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3'}
```

</br>

Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성합니다. 이때 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소가 전달되어야 합니다.

</br>

```js
const myMap2 = new Map([1, 2]);
console.log(myMap2);

// TypeError: Iterator value 1 is not an entry object
//    at new Map (<anonymous>)
```

</br>

또한 Map 생성자 함수의 인자로 전달한 이터러블에 중복된 키를 갖는 요소가 존재하면 값이 덮어써집니다. 그러므로 Map 객체에는 중복된 키를 갖는 요소가 존재할 수 없습니다.

</br>

```js
const map = new Map([
  ['key1', 'value1'],
  ['key1', 'value2'],
]);
console.log(map);
/*
Map(1) {'key1' => 'value2'}
*/
```

</br>

## 🔎 요소 개수 확인

</br>

Map 객체의 요소 개수는 `Map.prototype.size` 프로퍼티를 사용합니다.
size 프로퍼티는 setter 함수 없이 getter 함수만 존재하는 `접근자 프로퍼티`입니다. 따라서 size 프로퍼티에 숫자를 할당하여 Map 객체의 요소 개수를 변경할 수 없습니다.

</br>

```js
const myMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
  ['key3', 'value3'],
]);
console.log(myMap.size); //3

console.log(Object.getOwnPropertyDescriptor(Map.prototype, 'size'));
//{set: undefined, enumerable: false, configurable: true, get: ƒ}

myMap.size = 10; // 에러가 발생하진 않지만 입력은 무시된다.

console.log(myMap.size); //3
```

</br>

## 🔎 요소 추가

</br>

Map 객체에 요소를 추가할 때는 `Map.prototype.set` 메서드를 사용합니다

</br>

```js
const myMap = new Map();
myMap.set('key1', 'value1');
myMap.set('key2', 'value2');
console.log(myMap.size); // 출력값: 2
```

</br>

`set` 메서드는 새로운 요소가 추가된 Map 객체를 반환합니다. `set` 메서드를 호출한 후에 `set` 메서드를 연속적으로 호출할 수 있습니다(`method chinaing`).

</br>

```js
const map = new Map();
map.set('key1', 'value1').set('key2', 'value2');
console.log(map); // Map(2) {'key1' => 'value1', 'key2' => 'value2'}
```

</br>

`Map 객체` 생성 예시에서 보았듯이 중복된 키를 갖는 요소가 존재할 수 없기 때문에 중복된 키를 갖는 요소를 추가할 경우 에러가 발생하지 않고 값이 덮어 써진다.

</br>

```js
const map = new Map();
map
  .set('key1', 'value1') // 추가
  .set('key1', 'value2') // 덮어쓰여짐 여기까지 Map(1) {'key1' => 'value2'}
  .set('key1', 'value3'); // 덮어쓰여짐 Map(1) {'key1' => 'value3'}

console.log(map); // Map(1) {'key1' => 'value3'}
```

</br>

## 🚨 NaN 과 NaN, +0 과 -0 을 같은 값으로 판단합니다.

</br>

비교 연산자를 사용했을 때 NaN과 NaN을 다르다고 평가됩니다. 하지만 Map 객체는 NaN과 NaN을 같다고 평가하여 중복 추가를 허용하지 않습니다. +0과 -0은 비교 연산자에서와 같이 같다고 평가되어 중복 추가되지 않습니다.

</br>

```js
const map = new Map();
console.log(NaN === NaN); //false
console.log(0 === -0); // true

//NaN과  Nan을 같다고 평가하여 중복 추가를 허용하지 않는다
map.set(NaN, 'value1').set(NaN, 'value2');
console.log(map); // Map(1) {NaN => 'value2'}

// +0과 -0을 같다고 평가하여 중복 추가를 허용하지 않는다.
map.set(0, 'value1').set(-0, 'value2'); // Map(2) {NaN => 'value2', 0 => 'value2'}
```

</br>

## 🚨 Map 객체는 모든 값을 키로 사용할 수 있습니다.

</br>

객체는 문자열과 심벌 값만 키로 사용할 수 있지만 Map 객체는 키 타입에 제한이 없습니다. 따라서 객체를 포함한 모든 값을 키로 사용할 수 있습니다. 이것이 일반 객체와 Map 객체의 가장 큰 차이점입니다.

</br>

```js
const map = new Map();
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };
// 객체도 키로 사용할 수 있습니다.
map.set(lee, 'developer').set(kim, 'designer');
console.log(map);
//Map(2) {{name : 'Lee'} => 'developer', {name : 'Kim'} => 'designer'}
```

</br>

## 🔎 객체 요소 가져오기

</br>

Map 객체에서 특정 요소를 가져오려면 `Map.prototype.get` 메서드를 사용할 수 있습니다. get 메서드의 인수로 키를 전달하면 Map 객체에서 전달한 키를 갖는 값을 반환합니다. 만약 전달한 키를 갖는 요소가 없을 경우에는 `undefined`를 반환합니다.

</br>

```js
const myMap = new Map();
myMap.set('key1', 'value1');
myMap.set('key2', 'value2');
console.log(myMap.get('key1')); // 출력값: "value1"
```

</br>

```js
const map = new Map();
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

map.set(lee, 'developer').set(kim, 'designer');

console.log(map.get(lee)); // developer
console.log(map.get(kim)); // designer
```

</br>

## 🔎 요소가 있는지 확인하기

</br>

Map 객체에 특정 요소가 존재하는지 확인하려면 `Map.prototype.has` 메서드를 사용할 수 있습니다. has 메서드는 특정 요소의 존재 여부를 `boolean` 값으로 반환합니다.

</br>

```js
const myMap = new Map();
myMap.set('key1', 'value1');
myMap.set('key2', 'value2');
console.log(myMap.has('key1')); // 출력값: true
```

</br>

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([
  [lee, 'developer'],
  [kim, 'designer'],
]);

console.log(map.has(lee)); // true
console.log(map.has('kkey')); // false
```

</br>

## 🔎 요소 삭제하기

</br>

`Map.prototype.delete` 메서드를 사용하여 요소를 삭제할 수 있습니다. `delete` 메서드는 삭제 성공 여부를 나타내는 `boolean` 값을 반환합니다.

</br>

```js
const myMap = new Map();
myMap.set('key1', 'value1');
myMap.set('key2', 'value2');
myMap.delete('key1'); // true
```

</br>

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([
  [lee, 'developer'],
  [kim, 'designer'],
]);

map.delete(kim);
console.log(map); // Map(1) {{name : 'Lee'} => 'developer'}
```

</br>

존재하지 않는 키로 Map 객체의 요소를 삭제하려해도 에러가 발생하지 않고 무시됩니다.

</br>

```js
// 존재하지 않는 키 'key2'로 요소를
const map = new Map([['key1', 'value1']]);
map.delete('key2');
console.log(map); // Map(1) {'key1' => 'value1'}
```

</br>

`delete` 메서드는 삭제 성공 여부를 나타내는 `boolean` 값을 반환하기 때문에 `set` 메서드와 달리 연속적으로 호출(method chaining)을 할 수 없습니다.

</br>

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };
const map = new Map([
  [lee, 'developer'],
  [kim, 'designer'],
]);

map.delete(lee).delete(kim);
// TypeError: map.delete(...).delete is not a function
```

</br>

## 🔎 일괄 삭제

</br>

Map 객체 요소를 일괄 삭제하려면 `Map.prototype.clear` 메서드를 사용하면 됩니다. 모든 요소를 삭제하기 때문에 반환값은 언제나 `undefined` 입니다.

</br>

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };
const map = new Map([
  [lee, 'developer'],
  [kim, 'designer'],
]);

map.clear();
console.log(map); // Map() {}
```

</br>

## 🔎 중복 제거하기

</br>

Map 객체는 다른 자료구조와 함께 사용할 수 있습니다. 예를 들어, 다음과 같이 Set 객체와 함께 사용하여 중복을 제거 할 수 있습니다.

</br>

```js
const newArray = [1, 2, 1, 2, 3, 2];
const mySet = new Set([...newArray]);
const myMap = new Map([...mySet].map((x) => [x, 0]));

console.log('newArray', newArray);
// newArray (6) [1, 2, 1, 2, 3, 2]

console.log('mySet', mySet);
// mySet Set(3) {1, 2, 3}

console.log('myMap', myMap);
// myMap Map(3) {1 => 0, 2 => 0, 3 => 0}
```

</br>

# 📖 Map 객체의 forEach, 이터러블

## 🔎 forEach

</br>

> [Map.prototype.forEach() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach)

</br>

Map 객체의 요소를 순회하려면 `Map.prototype.forEach` 메서드를 사용할 수 있습니다. `Map.prototype.forEach` 메서드는 Array.prototype.forEach 메서드와 유사하게 콜백 함수와 콜백함수 내부에서 this로 사용될 객체(옵션)을 인수로 전달합니다.

- 첫 번째 인수: 현재 순회 중인 요소값
- 두 번째 인수: 현재 순회 중인 요소키
- 세 번째 인수: 현재 순회 중인 Map 객체 자체

</br>

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };
const map = new Map([
  [lee, 'developer'],
  [kim, 'designer'],
]);

map.forEach((v, k, map) => console.log(v, k, map));
/*
developer {name: 'Lee'} Map(2) 
{{name : 'Lee'} => 'developer', {name : 'Kim'} => 'designer'}

designer {name: 'Kim'} Map(2) 
{{name : 'Lee'} => 'developer', {name : 'Kim'} => 'designer'}
*/
```

</br>

```js
const myMap = new Map([
  ['key1', 'value1'],
  [123, 'value2'],
  [true, 'value3'],
]);

// forEach() 메서드를 사용한 순회
myMap.forEach((value, key) => {
  console.log(key, value);
});
/*
key1 value1
123 'value2'
true 'value3'
*/
```

</br>

## 🔎 이터러블

</br>

Map 객체는 이터러블이기 때문에 `for...of` 문으로 순회할 수 있으며, 스프레드 문법과 구조분해할당의 대상이 될 수 있습니다.

</br>

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };
const map = new Map([
  [lee, 'developer'],
  [kim, 'designer'],
]);

// Map 객체는 Map.prototype의 Symebol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in map); // true

// 이터러블인 Map 객체는 for.. of 문으로 순회할 수 있습니다.
for (const entry of map) {
  console.log(entry);
}
/*
[{name : 'Lee'}, 'developer']   
[{name : 'Kim'}, 'designer'] 
*/

// Map 객체의 스프레드 문법
console.log([...map]);
/*
[{name : 'Lee'}, 'developer']   
[{name : 'Kim'}, 'designer'] 
*/

//Map 객체의 구조분해할당
const [a, b] = map;
console.log(a, b);
/*
[{name : 'Lee'}, 'developer']   
[{name : 'Kim'}, 'designer'] 
*/
```

</br>

```js
const myMap = new Map([
  ['key1', 'value1'],
  [123, 'value2'],
  [true, 'value3'],
]);

// for...of 루프를 사용한 순회
for (const [key, value] of myMap) {
  console.log(key, value);
}
/*
key1 value1
123 'value2'
true 'value3'
*/
```

</br>

## 🔎 keys, values, entries

</br>

Map 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 사용할 수 있다.

</br>

|      Map 메서드       |                  설명                   |
| :-------------------: | :-------------------------------------: |
|  Map.prototype.keys   |     요소키를 값으로 갖는 객체 반환      |
| Map.prototype.values  |     요소값을 값으로 갖는 객체 반환      |
| Map.prototype.entries | 요소키와 요소값을 값으로 갖는 객체 반환 |

</br>

```js
const myObj = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
};

// Object.keys()를 사용한 순회
for (const key of Object.keys(myObj)) {
  console.log(key, myObj[key]);
}
/*
key1 value1
key2 value2
key3 value3
*/

//

// Object.entries()를 사용한 순회
for (const [key, value] of Object.entries(myObj)) {
  console.log(key, value);
}
/*
key1 value1
key2 value2
key3 value3
*/
```

</br>

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };
const map = new Map([
  [lee, 'developer'],
  [kim, 'designer'],
]);

for (const key of map.keys()) {
  console.log(key);
} // {name: 'Lee'}    {name: 'Kim'}

for (const value of map.values()) {
  console.log(value);
} // developer  designer

for (const entry of map.entries()) {
  console.log(entry);
}
/*
[{name : 'Lee'}, 'developer']   
[{name : 'Kim'}, 'designer'] 
*/
```

</br>

> ### 🚨 Map 객체는 요소의 순서에 의미를 갖지 않지만 Map 객체를 순회하는 순서는 요소가 추가된 순서를 따른다. 이는 ECMAScript 사양에 규정되어 있지는 않지만 다른 이터러블의 순회와 호환성을 유지하기 위함이다

</br>

# 🎁 좀 더 생각해볼 부분

## ✍ Map 객체의 성능

1. 시간 복잡도
2. 메모리 사용량
3. Map 객체와 일반 객체의 성능 차이

</br>

> [JavaScript ES6 Map vs Object Performance 비교](https://medium.com/@wdjty326/javascript-es6-map-vs-object-performance-%EB%B9%84%EA%B5%90-7f98e30bf6c8)

</br>

# 🥊 실전문제

</br>

## 🎯 [[level 1] 완주하지 못한 선수 - 42576](https://school.programmers.co.kr/learn/courses/30/lessons/42576)

</br>

```js
function solution(participant, completion) {
  //참여자 명단에는 있지만, 완주자 명단에 없으면 완주하지 못한 것.
  //동명이인의 참여자, 참여자 명단의 인원과 완주자 명단의 인원이 같은가.
  // 예제 #3 "mislav"는 참여자 명단에는 두 명이 있지만, 완주자 명단에는 한 명밖에 없기 때문에 한명은 완주하지 못했습니다.

  //참가자 명단을 Map 객체에 저장
  const participantMap = new Map();

  for (let p of participant) {
    // Map 객체에 참가자 이름을 key로, 등장 횟수를 values로 저장
    // 이미 Map 객체에 이름이 존재할 경우, value++

    participantMap.set(p, participantMap.get(p) + 1 || 1);
  }

  // 완주한 선수 명단을 순회하며 Map() 객체에서 해당 선수를 제거
  for (let c of completion) {
    if (participantMap.has(c)) {
      // Map() 객체에서 해당 선수의 등장 횟수를 1 감소시킵니다.
      participantMap.set(c, participantMap.get(c) - 1);
      // 만약 해당 선수의 등장 횟수가 0이라면, Map() 객체에서 해당 선수를 제거합니다.
      if (participantMap.get(c) === 0) {
        participantMap.delete(c);
      }
    }
  }

  // Map() 객체에서 제거되지 않은 선수가 완주하지 못한 선수입니다.
  const answer = participantMap.keys().next().value;
  return answer;
}
```

</br>

1. 참가자 명단을 Map 객체에 저장합니다. 이때, 참가자의 이름을 key로, 등장 횟수를 value로 저장합니다. 이미 Map 객체에 이름이 존재할 경우, value를 1 증가시킵니다.

2. 완주한 선수 명단을 순회하며, Map 객체에서 해당 선수를 제거합니다. 만약 Map 객체에 해당 선수가 존재하지 않을 경우, 제거하지 않습니다. 이때, Map 객체에서 제거되지 않은 선수가 완주하지 못한 선수입니다.
3. Map 객체에서 제거되지 않은 선수를 반환합니다.

</br>

## 🎯 [[level 2] 위장 - 42578](https://school.programmers.co.kr/learn/courses/30/lessons/42578)

</br>

```js
function solution(clothes) {
  let answer = 1; // 결과값 초기화

  const clothesMap = new Map(); // 맵 객체 생성

  // clothes 배열을 순회하면서 각 종류의 옷의 개수를 clothesMap 맵에 등록
  for (let [name, kind] of clothes) {
    clothesMap.set(kind, (clothesMap.get(kind) || 0) + 1);
  }

  // 모든 종류별로 선택할 수 있는 옷의 개수에 1을 더해 곱한 결과를 모두 곱함
  for (let count of clothesMap.values()) {
    answer *= count + 1;
  }

  // 아무것도 선택하지 않는 경우를 제외하기 위해 결과값에서 1을 뺌
  return answer - 1;
}
```

</br>

해시맵(Map)을 이용하여 옷의 종류별 개수를 카운팅하고, 이를 활용하여 모든 경우의 수를 구할 수 있습니다.

1. clothesMap 이라는 새로운 Map 객체를 생성합니다. 이 맵은 key 값으로 옷의 종류, value 값으로 해당 종류의 개수를 저장합니다.

2. for...of 루프를 이용하여 clothes 배열을 순회하면서, 각각의 옷의 종류를 clothesMap 맵에 등록합니다. 만약 같은 종류의 옷이 이미 clothesMap 맵에 등록되어 있다면 개수를 1 늘려줍니다.

3. 이제 clothesMap 맵에 저장된 값들을 이용하여 모든 경우의 수를 구합니다. 모든 경우의 수를 구하는 방법은 간단합니다. 각 종류별로 선택할 수 있는 옷의 개수에 1을 더해 곱한 결과를 모든 종류에 대해 곱해주면 됩니다. 그리고 마지막으로, 아무것도 선택하지 않는 경우를 제외하기 위해 결과값에서 1을 빼줍니다.

</br>

## 🎯 [[level 3] 베스트앨범 - 42579](https://school.programmers.co.kr/learn/courses/30/lessons/42579)

</br>

```js
//*요구사항
//같은 장르끼리 묶는다
//묶인 노래들을 재생 순으로 정렬
//2개씩 묶는다

function solution(genres, plays) {
  // 장르별 총 재생 수와 2개의 높은 재생 수를 가진 노래를 저장하는 Map() 객체 생성
  const genreMap = new Map();

  // genres와 plays 배열을 순회하며 Map() 객체에 데이터를 추가
  genres
    .map((genre, index) => [genre, plays[index]])
    .forEach(([genre, play], index) => {
      // Map() 객체에서 해당 장르의 정보를 가져옴, 없는 경우 초기화
      const data = genreMap.get(genre) || { total: 0, songs: [] };
      // 해당 장르의 총 재생 수와 노래 정보를 갱신
      genreMap.set(genre, {
        total: data.total + play,
        songs: [...data.songs, { play, index }]
          .sort((a, b) => b.play - a.play) // 노래를 재생 수가 높은 순으로 정렬
          .slice(0, 2), // 재생 수가 높은 2개의 노래만 선택
      });
    });

  // Map() 객체를 배열로 변환하여 장르별 총 재생 수로 정렬한 후 노래 인덱스를 추출
  return [...genreMap.entries()]
    .sort((a, b) => b[1].total - a[1].total)
    .flatMap((item) => item[1].songs)
    .map((song) => song.index);
}
```

</br>

1. 이 코드에서는 장르별로 노래를 구분하고, 장르별로 노래를 총 재생 수가 높은 순으로 정렬하여, 가장 많이 재생된 장르의 노래부터 최대 2개씩 추출하는 방식으로 베스트앨범을 구성합니다.

2. 코드의 구체적인 동작 과정은 다음과 같습니다.
3. Map() 객체 genreMap을 생성합니다. 이 객체는 각 장르별로 총 재생 수와 노래 정보를 저장합니다.
4. genres와 plays 배열을 순회하며, 각 노래의 장르와 재생 수를 Map() 객체에 추가합니다. 노래 정보는 { play, index } 형태로 저장합니다.
5. 장르별로 총 재생 수와 노래 정보를 갱신합니다. 해당 장르의 노래 정보는 재생 수가 높은 순으로 정렬하고, 상위 2개의 노래만 선택합니다.
6. Map() 객체 genreMap을 배열로 변환한 후, 장르별 총 재생 수로 내림차순 정렬합니다.
7. 정렬된 배열에서 각 장르별로 상위 2개의 노래를 추출합니다.
8. 추출된 노래의 인덱스를 배열로 반환합니다.

</br>

## 🎯 [[level 3] [카카오 인턴] 보석 쇼핑 - 67258](https://school.programmers.co.kr/learn/courses/30/lessons/67258)

</br>

```js
function solution(gems) {
  let answer = [0, gems.length]; //가장 긴 길이로 초기화
  let start = 0; //첫번째 포인터
  let end = 0; // 두번째 포인터

  const gemKinds = new Set(gems).size; //겹치지 않는 보석의 갯수
  const collect = new Map(); //보석을 담아둘 변수
  collect.set(gems[0], 1); // 시작하면서 첫보석을 먼저 담는다

  while (start < gems.length && end < gems.length) {
    if (collect.size === gemKinds) {
      //모든 보석을 구매할 수 있다면
      if (end - start < answer[1] - answer[0]) {
        //구간을 갱신
        answer = [start + 1, end + 1];
      }
      collect.set(gems[start], collect.get(gems[start]) - 1);
      //첫 포인터에 해당하는 보석을 한 개 줄인다.

      if (collect.get(gems[start]) === 0) {
        //만약 0 이 됐다면 목록에서 제거된다.
        collect.delete(gems[start]);
      }
      start += 1; //첫번째 포인터 증가
    } else {
      end += 1;
      collect.set(gems[end], 1 + (collect.get(gems[end]) || 0)); //보석을 추가한다.
    }
  }

  return answer;
}
```

</br>

1. 배열 gems의 길이를 기준으로 시작과 끝을 정합니다. (가장 긴 길이로 초기화)

2. 중복되지 않은 보석의 종류를 알기 위해 Set()을 이용하여 중복을 제거한 집합을 만듭니다.
3. Map()을 이용하여 현재까지 구매한 보석을 담아둘 변수 collect를 선언합니다. 처음에는 첫번째 보석을 포함하여 초기화합니다.
4. while 루프를 돌며 첫번째 포인터와 두번째 포인터의 위치를 이동시키며 구간을 계산합니다.
5. 구매한 보석의 종류가 모든 보석의 종류와 같다면 현재 구간의 길이를 비교하여 더 짧은 구간을 선택합니다. 그리고 첫번째 포인터가 가리키는 보석을 제거하고, 만약 해당 보석이 현재 구간 내에 없다면 Map()에서 해당 보석을 제거합니다. 구매한 보석의 종류가 모든 보석의 종류보다 적다면 두번째 포인터를 이동시키며 보석을 추가합니다. `(투포인터)`

</br>

# 📚 레퍼런스

> 이웅모. 모던 자바스크립트 Deep Dive : 자바스크립트의 기본 개념과 동작 원리 / 이웅모 지음 (2020). Print.

> [Array.prototype.forEach()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

> [Map.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach)

> [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

> [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)
