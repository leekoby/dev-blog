---
title: JS Set
slug: JS_Set
meta: 자바스크립트 Set에 대해 알아보기
---

# 📌들어가기에 앞서

> 해당 포스트는 자바스크립트를 학습한 내용을 일부 정리한 내용입니다. 모든 내용을 정리하기 보다는 간단히 개념을 정리하고 활용할 수 있는 방법을 위주로 작성하였습니다.  
>  아직 배우는 중으로 잘못된 부분이 있을 수 있습니다. 이에 대해서 무분별한 비난보다는 가르침을 부탁드리겠습니다.

</br>

# 📖 Set

`Set 객체`는 중복을 하용하지 않는 **유일한 값들의 집합**입니다. `Set 객체`는 배열과 유사하지만 다음과 같이 차이가 존재합니다.

</br>

|                 구분                  | 배열 | Set 객체 |
| :-----------------------------------: | :--: | :------: |
| 동일한 값을 중복하여 포함 할 수 있다. |  O   |    X     |
|       요소 순서에 의미가 있다.        |  O   |    X     |
|    인덱스로 요소에 접근할 수 있다.    |  O   |    X     |

</br>

- 표에서와 같이 `Set 객체`는 **요소 순서에 의미가 없습니다.** 따라서 **인덱스로 요소에 접근할 수도 없습니다**.
- `Set 객체`는 객체나 배열과 같이 자바스크립트의 **모든 값을 요소로 저장**할 수 있습니다.

</br>

# 📖 Set 객체 생성 및 사용법

</br>

## 🔎 생성

</br>

- `Set 객체`는 `new Set()`으로 `Set 생성자 함수`를 호출하여 생성합니다.
- 생성시 인자가 없으면 **빈 Set 객체**를 만듭니다.
  </br>

```js
const set = new Set();
console.log(set); // Set {}
```

</br>

## 🔎 초기화

- `new Set(iterable)`으로 이터러블을 인수로 전달받아 `Set 객체`를 생성할 수 있습니다.
- 이때 이터러블의 **`중복된 값`을 Set 객체에 요소로 저장되지 않습니다.**
- 초기화할 때, `문자열`도 이터러블 객체로 간주하여 각 문자가 Set 객체에 추가됩니다.
- 다른 `Set 객체`를 인수로 전달하여 새로운 `Set 객체`를 만들 수 있습니다.

</br>

```js
const set = new Set([1, 2, 3]);
console.log(set); // Set {1, 2, 3}

// 중복 요소가 제거
const set = new Set([1, 2, 3, 3, 4, 4]);
console.log(set); // Set {1, 2, 3, 4}

// 문자열을 인수로 전달
const set = new Set('hello');
console.log(set); // Set {'h', 'e', 'l', 'o'}

// 다른 Set 객체를 인수로 전달
const set1 = new Set([1, 2, 3]);
const set2 = new Set(set1);
console.log(set2); // Set {1, 2, 3}
```

</br>

## 🔎 요소 개수 확인

</br>

`Set 객체`의 요소 개수를 확인하는 방법은 `Set.prototype.size` 프로퍼티를 이용하는 것입니다. `size` 프로퍼티는 `Set 객체`의 요소 개수를 반환합니다. 예를 들어 다음과 같이 Set 객체를 생성하고 `size`프로퍼티를 사용하여 요소의 개수를 확인할 수 있습니다. 앞서 서술했듯이 `Set` 객체는 중복된 값을 허용하지 않기 때문에, 중복된 값을 가지는 요소가 있더라도 `size` 프로퍼티는 중복을 제외한 요소의 개수를 반환합니다.

</br>

```js
const set = new Set([1, 2, 3]);
console.log(set.size); // 3

const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set.size); // 3
```

</br>

`size`프로퍼티는 `setter` 함수 없이 `getter` 함수만 존재하는 접근자 **`프로퍼티`**입니다. 따라서 `size` 프로퍼티에 숫자를 할당하여 `Set 객체` 요소 개수를 변경할 수 없다.

</br>

```js
const set = new Set([1, 2, 3]);
console.log(Object.getOwnPropertyDescriptor(Set.prototype, 'size'));
// {set: undefined, enumerable: false, configurable: true, get: ƒ}

set.size = 10; //무시된다.
console.log(set.size);
// 3
```

</br>

# 📖 Set을 이용한 중복 제거

</br>

## 🤚 NaN 과 NaN, +0 과 -0 을 같은 값으로 판단합니다.

</br>

```js
const set = new Set();
console.log(NaN === NaN); //false
console.log(0 === -0); // true

//NaN과  Nan을 같다고 평가하여 중복 추가를 허용하지 않는다
set.add(NaN).add(NaN);
console.log(set); // Set(1) {Nan}

// +0과 -0을 같다고 평가하여 중복 추가를 허용하지 않는다.
set.add(0).add(-0); // Set(2) {NaN, 0}
```

</br>

## 🔎 중복 제거 후 배열로 변환하기

</br>

` Set`을 이용하여 `중복을 제거`하고, 다시 배열로 변환하여 사용할 수 있습니다. 예를 들어, 다음과 같이 `중복을 제거한 후 배열로 변환`할 수 있고, `forEach 메서드를 사용`하여 각 요소를 출력할 수도 있습니다.

</br>

```js
const arr = [1, 2, 3, 3, 4, 4];
const uniqueArr = Array.from(new Set(arr));
console.log(uniqueArr);
// [1, 2, 3, 4]

uniqueArr.forEach((item) => console.log(item));
// 1
// 2
// 3
// 4
```

</br>

## 🔎 중복 제거 후 배열에 추가하기

</br>

`Set`을 이용하여 `중복을 제거`하고, 다른 배열에 추가하여 사용할 수 있습니다. 예를 들어, 다음과 같이 `중복을 제거한 후 다른 배열에 추가`하여 사용할 수 있습니다.

</br>

```js
const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];
const uniqueArr = [...new Set([...arr1, ...arr2])];
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

</br>

## 🔎 중복 제거 후 객체 배열에서 필터링하기

</br>

`객체를 포함한 배열`에서 중복을 제거하고, 특정 조건에 맞는 요소만 필터링하여 사용할 수 있습니다. 예를 들어, 다음과 같이 중복을 제거한 후 `filter 메서드를 사용`하여 id 값이 1인 요소만 필터링하여 사용할 수 있습니다.

</br>

```js
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Charlie' },
];
const uniqueArr = Array.from(new Set(arr.map((item) => item.id))).map((id) =>
  arr.find((item) => item.id === id)
);
const filteredArr = uniqueArr.filter((item) => item.id === 1);
console.log(filteredArr); // [{id: 1, name: 'Alice'}]
```

</br>

# 📖 Set의 주요 메서드 (add, delete, has, clear)

</br>

## 🔎 add(value)

</br>

Set 객체에 `값(value)을 추가`합니다.
이 메서드는 `Set 객체 자체를 반환`하므로, `체이닝(Chaining)을 사용`하여 여러 개의 값 추가가 가능합니다.
`Set 객체`에 중복된 요소의 추가는 허용되지 않기 때문에 에러는 발생하지 않지만 무시된다.

</br>

```js
const set = new Set();
set.add(1);
set.add('hello');
set.add(true);
console.log(set); // Set(3) {1, "hello", true}
```

</br>

## 🔎 delete(value)

</br>

Set 객체에서 지정된 값을 삭제합니다.
만약 값이 삭제되었다면 `true`를, 그렇지 않은 경우 `false`를 반환합니다.

</br>

```js
const set = new Set([1, 2, 3, 4, 5]);
set.delete(3);
console.log(set); // Set(4) {1, 2, 4, 5}

set.delete(10); // 해당 값이 없으면 false를 반환
```

</br>

## 🔎 has(value)

</br>

Set 객체에 지정된 값이 있는지 확인합니다.
값이 존재하면 `true`를, 그렇지 않은 경우 `false`를 반환합니다.

</br>

```js
const set = new Set([1, 2, 3, 4, 5]);
console.log(set.has(3)); // true
console.log(set.has(10)); // false
```

</br>

## 🔎 clear()

</br>

Set 객체의 모든 값들을 제거합니다.
clear 메서드는 언제나 `undefined`를 반환한다.
</br>

```js
const set = new Set([1, 2, 3, 4, 5]);
set.clear();
console.log(set); // Set(0) {}
```

</br>

## 🔎 forEach(callback [, thisArg])

</br>

Set 객체의 각 요소마다 주어진 콜백 함수(callback)를 실행합니다.
콜백 함수는 Set 객체의 각 값(value)에 대해 호출되며, 콜백 함수 내에서는 값에 대한 처리를 수행할 수 있습니다.
forEach() 메서드는 인자로 전달된 callback 함수의 매개변수로 세 개의 인자를 받습니다. 각각은 value, index, thisArg 입니다.

</br>

```js
const set = new Set([1, 2, 3]);

set.forEach((value, valueAgain, set) => {
  console.log(value);
});

// 콜백함수에서 인덱스 및 thisArg를 활용하는 예시
const myObj = {
  name: 'Alice',
  setName(value) {
    this.name = value;
  },
};

set.forEach(function (value, valueAgain, set) {
  this.setName(value); // thisArg로 전달된 myObj에 있는 setName() 메소드 호출
}, myObj);

console.log(myObj.name); // "3"
```

</br>

## 🔎 values()

</br>

Set 객체 내의 값(value)에 대한 `iterator를 반환`합니다.
values() 메서드를 호출한 Set 객체의 값(value)들이 저장된 순서대로 반환됩니다.

</br>

```js
const set = new Set([1, 2, 3]);
const values = set.values(); // SetIterator {1, 2, 3}

console.log(values.next().value); // 1
console.log(values.next().value); // 2
console.log(values.next().value); // 3
```

</br>

## 🔎 keys()

</br>

values() 메서드와 같은 결과를 반환합니다. Set 객체 내의 값(value)에 대한 iterator를 반환합니다.
다만, 이 메서드는 Set 객체의 표준 메서드가 아니며, values() 메서드를 사용하는 것을 권장합니다.

</br>

```js
const set = new Set([1, 2, 3]);
const values = set.values(); // SetIterator {1, 2, 3}

console.log(values.next().value); // 1
console.log(values.next().value); // 2
console.log(values.next().value); // 3
```

</br>

## 🔎 entries()

</br>

Set 객체 내의 값(value)과 동일한 값을 갖는 key를 갖는 iterator 객체를 반환합니다.
Set 객체는 각 요소가 값과 동일한 값을 갖는 유일한 요소이므로, key와 value가 모두 같습니다.
위의 메서드들을 이용해 Set 객체를 다룰 수 있으며, Set 객체의 값(value)들을 추가, 삭제, 확인하고, Set 객체의 값(value)들을 순회할 수 있습니다.

</br>

```js
const set = new Set([1, 2, 3]);
const entries = set.entries(); // SetIterator {[1, 1], [2, 2], [3, 3]}

console.log(entries.next().value); // [1, 1]
console.log(entries.next().value); // [2, 2]
console.log(entries.next().value); // [3, 3]
```

</br>

# 📖 Set과 배열 간의 변환

</br>

## 🔎 Set을 배열로 변환하기

</br>

`Array.from 메서드`나 `전개 연산자 ...`를 사용하여 Set을 배열로 변환할 수 있습니다.

</br>

```js
const mySet = new Set([1, 2, 3]);
const myArr = Array.from(mySet);
console.log(myArr); // [1, 2, 3]

const mySet = new Set([1, 2, 3]);
const myArr = [...mySet];
console.log(myArr); // [1, 2, 3]
```

</br>

## 🔎 배열을 Set으로 변환하기

</br>

배열을 Set으로 변환할 때는, `Set 생성자 함수`를 사용하면 됩니다.

</br>

```js
const myArr = [1, 2, 3, 3];
const mySet = new Set(myArr);
console.log(mySet); // Set {1, 2, 3}
```

</br>

## 🔎 중복 제거하며 배열을 유지하기

</br>

배열에서 중복을 제거하면서 배열을 유지하려면, 먼저 Set으로 중복을 제거한 후, 다시 배열로 변환하면 됩니다. 또는 전개 연산자 ...를 사용할 수도 있습니다.

</br>

```js
const myArr = [1, 2, 3, 3];
const mySet = new Set(myArr);
const myNewArr = Array.from(mySet);
console.log(myNewArr); // [1, 2, 3]

const myArr = [1, 2, 3, 3];
const mySet = new Set(myArr);
const myNewArr = [...mySet];
console.log(myNewArr); // [1, 2, 3]
```

</br>

# 📖 Set 객체의 forEach, 이터러블

</br>

## 🔎 Set.prototype.forEach와 Array.prototype.forEach 의 차이

</br>

두 메서드 모두 배열 또는 Set 요소를 순회하며 콜백함수를 실행합니다. 하지만 사용 방법과 변환 값 등에 차이가 있습니다.

</br>

> [Array.prototype.forEach()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

</br>

`Array.prototype.forEach`로처리할 요소의 범위는 최초 `callback` 호출 전에 설정됩니다. `forEach()` 호출을 시작한 뒤 배열에 추가한 요소는 `callback`이 방문하지 않습니다. 배열의 기존 요소값이 바뀐 경우, callback에 전달하는 값은 forEach()가 요소를 방문한 시점의 값을 사용합니다. 방문하기 전에 삭제한 요소는 방문하지 않습니다.이 메서드의 첫 번째 매개변수는 배열의 각 요소를 대상으로 실행할 함수이며, 두 번째 매개변수는 함수를 실행할 때 사용할 `this` 값입니다. 예를 들어 다음과 같이 사용할 수 있습니다.

</br>

```js
const myArr = [1, 2, 3];
myArr.forEach((item) => console.log(item));
//1
//2
//3
```

</br>

> [Set.prototype.forEach()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach)

</br>

반면에, `Set.prototype.forEach` 메서드는 주어진 `callback`을 `Set`에 존재하는 각 요소에 대해 한번씩 함수를 호출하고, 삭제된 값에 대해선 실행하지 않습니다. 그러나 값이 존재하되 `undefined`인 경우엔 실행합니다. 이 메서드의 첫 번째 매개변수는 Set의 각 요소를 대상으로 실행할 함수이며, 두 번째 매개변수는 함수를 실행할 때 실행할 `this` 값입니다. 예를 들어 다음과 같이 사용할 수 있습니다.

</br>

```js
const mySet = new Set([1, 2, 3]);
mySet.forEach((item) => console.log(item));
//1
//2
//3
```

</br>

## 🔎 Set 객체는 이터러블이므로 for...of, 스프레드 문법, 구조분해 할당이 가능하다.

</br>

> ### 🤚 Set 객체는 요소의 순서에 의미를 갖지 않지만 Set 객체를 순회하는 순서는 요소가 추가된 순서를 따른다. 이는 ECMAScript 사양에 규정되어 있지는 않지만 다른 이터러블의 순회와 호환성을 유지하기 위함이다

</br>

```js
const set = new Set([1, 2, 3]);
set.forEach((v, v2, set) => console.log(v, v2, set));
/*
1 1 Set(3) {1, 2, 3}
2 2 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/
```

</br>

```js
const set = new Set([1, 2, 3]);

//set 객체는 Set.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in set); //true

// 이터러블인 Set 객체는 for...of 문으로 순회할 수 있다.
for (const value of set) {
  console.log(value);
}
/*
1
2
3
*/
console.log([...set]); // [1, 2, 3]

// 이터러블인 Set 객체는 구조분해할당의 대상이 될 수 있다.
const [a, ...rest] = set;
console.log(a, rest); //1, [2, 3]
```

</br>

# 📖 Set을 이용한 교집합, 합집합, 차집합 계산

</br>

## 🔎 2개의 배열로 집합 연산

</br>

```js
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// 합집합
const union = new Set([...setA, ...setB]);
console.log(union); // Set(6) {1, 2, 3, 4, 5, 6}

// 교집합
const intersection = new Set([...setA].filter((x) => setB.has(x)));
console.log(intersection); // Set(2) {3, 4}

// 차집합
const difference = new Set([...setA].filter((x) => !setB.has(x)));
console.log(difference); // Set(2) {1, 2}
```

</br>

위의 예시에서 ... 연산자를 이용하여 Set 객체를 배열로 변환한 다음, 배열의 메서드를 활용하여 연산합니다. 합집합은 두 개의 Set 객체를 합쳐서 만들 수 있고, 교집합과 차집합은 filter() 메서드와 has() 메서드를 이용하여 구할 수 있습니다. 배열의 수가 증가해도 응용할 수 있습니다.

</br>

## 🔎 3개의 배열로 집합 연산

```js
const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);
const set3 = new Set([4, 5, 6, 7]);

// 합집합
const union = new Set([...set1, ...set2, ...set3]);
console.log(union); // Set(7) {1, 2, 3, 4, 5, 6, 7}

// 교집합
const intersection = new Set([...set1].filter((x) => set2.has(x) && set3.has(x)));
console.log(intersection); // Set(1) {4}

// 차집합
const difference = new Set([...set1].filter((x) => !set2.has(x) && !set3.has(x)));
console.log(difference); // Set(2) {1, 2}
```

</br>
</br>

# 🥊 실전문제

</br>

## 🎯 [폰켓몬] (https://school.programmers.co.kr/learn/courses/30/lessons/1845)

```js
function solution(nums) {
  //연구실에 있는 총 N 마리의 폰켓몬 중에서 N/2마리 max
  const max = nums.length / 2;

  // Set을 이용하여 중복된 요소들을 제거하여 남은 종류
  const duplicateMon = new Set(nums).size;

  //[3,1,2,3] 일때 max : 2 , duplicateMon : 3 => 2
  //[3,3,3,2,2,4]	max : 3 , duplicateMon  3 => 3
  //[3,3,3,2,2,2]	=> max : 3 , duplicateMon : 2 => 2
  return max < duplicateMon ? max : duplicateMon;
}
```

</br>

1. 배열(`nums`)을 인자로 받아서, 문제에서 제시한 2가지 조건에 따라 계산된 값을 반환해야하는 문제입니다.

2. `max` : 우선 배열의 길이를 2로 나눈 값을 최대로 남길 수 있는 폰켓몬의 수로 설정합니다. 그리고 `duplicateMon`: Set 객체를 이용하여 중복을 제거한 후, 제거한 폰켓몬 종류의 수를 계산합니다.
3. 그 다음으로, 남길 수 있는 폰켓몬의 수(max)와 제거한 폰켓몬 종류의 수(duplicateMon)를 비교합니다. 만약 max가 더 크면 모든 폰켓몬 종류를 다 선택할 수 없으므로 duplicateMon을 반환하고, 그렇지 않으면 max를 반환합니다.
4. 예를 들어, [3, 1, 2, 3]의 경우, 배열의 길이는 4이므로, 최대로 남길 수 있는 폰켓몬의 수(max)는 2입니다. 중복된 요소를 제거하면, [3, 1, 2]가 남게 되므로, 폰켓몬 종류의 수(duplicateMon)는 3입니다. 따라서, max와 duplicateMon을 비교해보면, max가 작기 때문에 2를 반환하게 됩니다.

</br>

# 📚 레퍼런스

> 이웅모. 모던 자바스크립트 Deep Dive : 자바스크립트의 기본 개념과 동작 원리 / 이웅모 지음 (2020). Print.

> 정재남. 코어 자바스크립트 = Core Javascript : 핵심 개념과 동작 원리로 이해하는 자바스크립트 프로그래밍 / 정재남 지음 (2019). Print.

> [Set](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)

> [Array.prototype.forEach()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

> [Set.prototype.forEach()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach)
