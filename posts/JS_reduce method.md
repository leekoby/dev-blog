---
title: JS reduce
slug: JS_reduce method
meta: 자바스크립트 reduce method에 대해 알아보기
---

# 📌들어가기에 앞서

> 해당 포스트는 자바스크립트를 학습한 내용을 일부 정리한 내용입니다. 모든 내용을 정리하기 보다는 간단히 개념을 정리하고 활용할 수 있는 방법을 위주로 작성하였습니다.  
>  아직 배우는 중으로 잘못된 부분이 있을 수 있습니다. 이에 대해서 무분별한 비난보다는 가르침을 부탁드리겠습니다.

<br/>

# 📖 reduce 메서드

<br/>

## 🔎 왜 reduce 메서드?

<br/>

`reduce` 메서드는 자바스크립트에서 유용한 함수 중에서 하나라고 생각합니다. `reduce`를 사용하는 것은 배열과 같은 데이터를 처리하는데 있어서 효율적으로 조작하고 코드를 간결하게 작성할 수 있다고 작성할 수 있습니다. 또한 함수형 프로그래밍을 작성하는데 있어서도 중요한 역할을 합니다. 그 동안 알고 있던 `reduce`는 단순히 **배열을 순회하며 하나의 결과 값을 만들어 반환한다.** 정도로 알고 있었습니다.

이번 기회에 `reduce` 메서드를 다양한 방식으로 사용할 수 있는지 알아보았습니다. 일부 예시들은 다른 메서드를 사용하는 것이 훨씬 간단하지만 `reduce` 메서드 만으로 또는 `reduce` 메서드와 다른 메서드들을 결합하여 활용하는 방법들은 어떤 것들이 있는지 참고로 봐주시면 감사하겠습니다.

<br/>

## 🔎 reduce 메서드란?

<br/>

> `reduce` 메서드는 배열의 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환합니다. | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

```js
arr.reduce(callback[, initialValue])

arr.reduce(함수(acc, cur, [index], [arr]), [초깃값] )
     // reduce 메서드의 기본적이 형식  초깃값은  [ ] 안은 생략 가능.
```

<br/>

`reduce` 메서드는 배열의 요소를 하나의 값으로 줄이는 기능을 수행합니다. 자신을 호출한 배열의 모든 요소들을 순회하며 이전 반복에서 반환된 결과값과 현재의 요소를 기반으로 계산합니다. 이전 반복에서 반환된 값을 이번 반복에서 초깃값으로 사용됩니다.

`reduce` 메서드의 동작 과정은 다음과 같습니다.

1. `초깃값`을 지정합니다. 초깃값이 없는 경우 배열의 `첫 번째 요소`를 `초깃값`으로 사용합니다.

2. 배열의 첫 번째 요소부터 마지막 요소까지 반복을 시작합니다.

3. 각 요소를 처리하고 이전 반복에서 반환된 값과 함께 `callback` 함수를 호출합니다.

4. `callback` 함수에서 반환된 값은 다음 반복에서 `accumulator`로 사용됩니다.

5. 마지막 요소까지 반복한 후, 최종 결과값을 반환합니다.

<br/>

예를 들어, 다음과 같은 배열이 있다고 가정해보겠습니다.

<br/>

```js
const numbers = [1, 2, 3, 4, 5];
```

<br/>

이 배열의 값을 모두 더하려면 다음과 같이 `reduce` 메서드를 사용할 수 있습니다.

<br/>

```js
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
console.log(sum); // 15
```

<br/>

이 코드는 다음과 같은 과정을 거칩니다.

1. 초기값은 없지만, 첫 번째 요소인 1이 `accumulator`로 사용됩니다.

2. `accumulator`와 `currentValue`를 더한 값인 3이 반환됩니다.

3. 반환된 값 3이 다음 반복에서 `accumulator`로 사용됩니다.

4. 3과 다음 요소인 3을 더한 값인 6이 반환됩니다.

5. 반환된 값 6이 다음 반복에서 `accumulator`로 사용됩니다.

6. 6과 다음 요소인 4를 더한 값인 10이 반환됩니다.

7. 반환된 값 10이 다음 반복에서 `accumulator`로 사용됩니다.

8. 10과 다음 요소인 5를 더한 값인 15가 최종 결과값으로 반환됩니다.

이처럼, `reduce` 메서드는 배열 요소를 하나의 값으로 줄이는 기능을 수행합니다. 이를 통해 배열 요소를 합산, 평균, 곱셈 등으로 계산할 수 있습니다. 또한, `reduce` 메서드는 초기값을 지정할 수 있고, 초기값을 지정하지 않으면 배열의 `첫 번째 요소`가 초기값으로 사용된다는걸 기억해주세요.

## 🚨 reduce 메서드를 사용할때는 초기값을 전달하는 것이 안전!

<br/>

`reduce` 메서드의 초기값을 전달하지 않으면 배열의 첫 번째 요소가 초기값으로 사용됩니다. 하지만 배열이 비어있는 경우, 초기값을 전달하지 않으면 TypeError가 발생합니다. 다음은 초기값을 전달하지 않을 때 발생하는 문제에 대한 예시입니다.

<br/>

```js
const arr = [];
const sum = arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
});
console.log(sum); // TypeError: Reduce of empty array with no initial value
```

위 코드에서, `reduce` 메서드에서 초기값을 전달하지 않았으며, 배열이 비어있습니다. 이 경우, TypeError가 발생합니다. TypeError 메시지는 "Reduce of empty array with no initial value"로, 초기값을 전달하지 않았을 때 발생하는 오류임을 알려줍니다.

<br/>

```js
const products = [
  { id: 1, price: 100 },
  { id: 2, price: 200 },
  { id: 3, price: 300 },
];

const priceSum = products.reduce((acc, cur) => acc.price + cur.price);
// 1번째 순회 시 acc는 { id : 1, price : 100 }, cur는 { id : 2, price : 200 }
// 2번째 순회 시 acc는 300, cur는 { id : 3, price : 300 } dlek
// 2번째 순회 시 acc의 함수에 객체가 아닌 숫자값이 전달된다. 이때 acc.price는 undefined다.
console.log(priceSum); // NaN
```

이러한 문제를 방지하기 위해, `reduce` 메서드를 사용할 때는 항상 초기값을 전달하는 것이 좋습니다. 초기값을 전달하는 것은 코드를 안전하고 예측 가능하게 만들어주며, 가독성과 유지보수성을 향상시킵니다.

<br/>

# 📖 reduce 메서드의 다양한 활용

<br/>

## 🔎 요소의 변환/누적/삭제

<br/>

### ✍ 변환

`reduce` 메서드를 사용하여 배열 요소를 변환할 수 있습니다. 이를 위해, 콜백 함수에서 반환된 값은 다음 요소에 대한 입력 값으로 사용됩니다.

```js
const arr = [1, 2, 3, 4, 5];

const transformedArr = arr.reduce((acc, cur) => {
  acc.push(cur * 2);
  return acc;
}, []);

console.log(transformedArr); // [2, 4, 6, 8, 10]
```

위 코드에서, `reduce` 메서드를 사용하여 배열 요소를 두 배로 변환합니다. 콜백 함수에서는 현재 요소에 2를 곱한 값을 acc 배열에 추가하고, acc 배열을 반환합니다. 이후, 반환된 배열이 다음 요소에 대한 acc로 사용됩니다.

<br/>

### ✍ 누적

`reduce` 메서드를 사용하여 배열 요소를 누적할 수 있습니다. 이를 위해, 콜백 함수에서는 acc 값과 cur 값이 결합되어 누적됩니다.

```js
const arr = [1, 2, 3, 4, 5];

const acce = arr.reduce((acc, cur) => {
  return acc + cur;
});

console.log(accumulatedValue); // 15
```

위 코드에서, `reduce` 메서드를 사용하여 배열 요소의 합계를 계산합니다. 콜백 함수에서는 acc와 cur를 더하여 누적된 값을 반환합니다.

<br/>

### ✍ 삭제

`reduce` 메서드를 사용하여 배열 요소를 삭제할 수 있습니다. 이를 위해, 콜백 함수에서는 요소를 삭제하는 조건을 정의하고, 조건에 부합하는 요소를 제외한 값들만 누적됩니다.

```js
const arr = [1, 2, 3, 4, 5];

const filteredArr = arr.reduce((acc, cur) => {
  if (cur % 2 === 0) {
    return acc;
  } else {
    acc.push(cur);
    return acc;
  }
}, []);

console.log(filteredArr); // [1, 3, 5]
```

위 코드에서, `reduce` 메서드를 사용하여 배열에서 홀수인 요소만 추출합니다. 콜백 함수에서는 현재 요소가 홀수인 경우, 현재 요소를 acc 배열에 추가하고 acc 배열을 반환합니다. 만약 현재 요소가 짝수인 경우, acc 배열을 그대로 반환합니다.

따라서, 최종적으로 acc에 저장된 값이 추출된 홀수인 요소들이 됩니다.

<br/>

## 🔎 평균/최대값/최소값 계산

<br/>

### ✍ 평균

```js
const numbers = [10, 20, 30, 40, 50];
const sum = numbers.reduce((acc, cur) => acc + cur);
const average = sum / numbers.length;
console.log(average); // 30
```

<br/>

### ✍ 최대값

🤚 Math.max 메서드를 사용하는 편이 좋습니다.

```js
const numbers = [10, 20, 30, 40, 50];
const max = numbers.reduce((acc, cur) => (acc > cur ? acc : cur));
console.log(max); // 50
```

<br/>

### ✍ 최소값

🤚 Math.min 메서드를 사용하는 편이 좋습니다.

```js
const numbers = [10, 20, 30, 40, 50];
const min = numbers.reduce((acc, cur) => (acc < cur ? acc : cur));
console.log(min); // 10
```

<br/>

## 🔎 객체(hash) 생성

<br/>

```js
const arr = ['apple', 'banana', 'orange', 'pear'];
const hash = arr.reduce((acc, cur) => {
  const key = cur.length;
  if (!acc[key]) {
    acc[key] = [cur];
  } else {
    acc[key].push(cur);
  }
  return acc;
}, {});
console.log(hash); // { 4 : ['pear'], 5 : ['apple'], 6: ['banana', 'orange']}
```

요소의 글자수를 key로 사용하여 같은 글자수끼리의 집합을 생성

<br/>

## 🔎 중복 횟수 구하기

<br/>

### ✍ 배열에서 중복 횟수 구하기

```js
const arr = [1, 2, 3, 4, 2, 3, 1, 1, 4, 4, 4];

const count = arr.reduce((acc, cur) => {
  if (cur === 1) {
    acc++;
  }
  return acc;
}, 0);
console.log(count); // 3
```

<br/>

### ✍ 배열을 객체로 변환하여 중복 횟수 구하기

```js
const arr = ['apple', 'banana', 'apple', 'orange', 'banana', 'pear', 'banana', 'apple'];

const count = arr.reduce((acc, cur) => {
  if (cur in acc) {
    acc[cur]++;
  } else {
    acc[cur] = 1;
  }
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 3, orange: 1, pear: 1 }
```

```js
const arr = ['apple', 'banana', 'apple', 'orange', 'banana', 'pear', 'banana', 'apple'];

const count = arr.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;

  return acc;
}, {});
console.log(count); // { apple: 3, banana: 3, orange: 1, pear: 1 }
```

<br/>

## 🔎 2차원 배열 평탄화

🤚 flat 메서드를 사용하는 편이 좋습니다.

<br/>

```js
const Arr = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flattenedArr = Arr.reduce((acc, cur) => {
  return acc.concat(cur);
}, []);
console.log(flattenedArr); // [1, 2, 3, 4, 5, 6]
```

<br/>

## 🔎 중복 제거

🤚 중복 요소를 제거할 때는 `filter` 메서드를 사용하거나 `Set` 을 사용하는 편이 좋습니다.

<br/>

```js
const arr = [1, 2, 2, 3, 4, 4, 5, 5, 5];
const result = arr.reduce(
  (unique, val, i, _arr) => (_arr.indexOf(val) === i ? [...unique, val] : unique),
  // 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 같다면 val은 처음 순회하는 요소
  // 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 다르다면 val은 중복된 요소
  // 처음 순회하는 요소만 초깃값 []가 전달된 unique 배열에 담아 반환하면 중복 요소는 제거
  []
);
console.log(result); // [1, 2, 3, 4, 5]
```

```js
const arr = [1, 2, 2, 3, 4, 4, 5, 5, 5];
const uniqueArr = arr.reduce((acc, cur) => {
  if (acc.indexOf(cur) === -1) {
    acc.push(cur);
  }
  return acc;
}, []);
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

```js
const arr = [1, 2, 2, 3, 4, 4, 5, 5, 5];
const uniqueArr = arr.reduce((acc, cur) => {
  if (!acc.includes(cur)) {
    acc.push(cur);
  }
  return acc;
}, []);
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

<br/>

## 🔎 특정 조건에 따른 배열 필터링

🤚 특정 조건에 따른 배열 필터링에는 filter 메서드를 사용하거나 map 메서드를 사용하는 편이 좋습니다.

<br/>

```js
const arr = [1, 2, 3, 4, 5, 6];

const filteredArr = arr.reduce((acc, cur) => {
  if (cur % 2 === 0) {
    acc.push(cur);
  }
  return acc;
}, []);

console.log(filteredArr); // [2, 4, 6]
```

위 코드에서, `reduce` 메서드를 사용하여 배열의 요소를 순회합니다. 콜백 함수에서 현재 요소가 특정 조건을 만족하는 경우, 결과 배열인 acc에 현재 요소를 추가합니다. 만약 현재 요소가 특정 조건을 만족하지 않으면 acc를 그대로 반환합니다.

초기값으로 빈 배열을 사용했으며, `reduce` 메서드가 순회하는 배열의 각 요소를 검사하여 필터링된 결과를 누적하였습니다. 따라서, 최종적으로 acc에 저장된 값이 필터링된 결과가 됩니다.

위 예시에서는, 배열에서 짝수인 요소만을 추출하였습니다. 이와 같은 방식으로, 배열에서 특정 조건을 만족하는 요소만을 추출할 수 있습니다.

<br/>

## 🔎 reduce를 사용한 재귀함수

<br/>

### ✍ reduce 메서드를 사용한 팩토리얼

```js
function factorial(num) {
  return Array.from({ length: num }, (_, i) => i + 1).reduce((acc, cur) => acc * cur, 1);
}

console.log(factorial(5)); // 120
```

위 코드에서는 `Array.from` 메서드를 사용하여 1부터 주어진 숫자까지의 배열을 만듭니다. 이후 reduce 메서드를 사용하여 배열의 요소를 곱하여 팩토리얼 값을 계산합니다.

reduce 메서드의 두 번째 매개변수로 초기값인 1을 전달했으므로, 배열의 첫 번째 요소부터 시작하여 계산을 진행합니다.

<br/>

### ✍ reduce 메서드를 사용한 제곱근 계산 재귀 함수

```js
function sqrt(num) {
  return Array.from({ length: num }, (_, i) => i + 1).reduce((accumulator, currentValue) => {
    if (accumulator ** 2 === num) {
      return accumulator;
    } else {
      return Math.sqrt(num);
    }
  });
}

console.log(sqrt(16)); // 4
```

위 코드에서는 `Array.from` 메서드를 사용하여 1부터 주어진 숫자까지의 배열을 만듭니다. 이후 `reduce` 메서드를 사용하여 배열의 요소를 차례대로 확인하며, 각 요소의 제곱값이 주어진 숫자와 같은지 검사합니다.

reduce 메서드의 초기값을 전달하지 않았으므로, 배열의 첫 번째 요소부터 시작하여 계산을 진행합니다. 초기값을 전달하지 않고 reduce 메서드를 사용하면, 배열의 첫 번째 요소가 초기값이 됩니다.

<br/>

# 🎁 좀 더 생각해볼 부분

<br/>

## ✍ reduce 와 map/filter/some/every 메서드의 차이점

<br/>

> [for, foreach, filter, map, reduce 기능 및 성능 비교](https://daesuni.github.io/Loop-performance/)

<br/>

## ✍ reduce 메서드와 성능 개선

<br/>

<br/>

# 🥊 실전문제

<br/>

## 🎯 [[level 1] [1차] 비밀지도 - 17681](https://school.programmers.co.kr/learn/courses/30/lessons/17681)

```js
function solution(n, arr1, arr2) {
  // 해시(hash) 생성
  const hash = arr1.reduce((acc, cur, i) => {
    const combined = cur | arr2[i]; // 비트 OR 연산
    acc.push(toBinary(combined, n)); // 2진수로 변환한 값을 배열에 추가
    return acc;
  }, []);

  // 2진수로 변환하는 함수
  function toBinary(num, len) {
    let bin = num.toString(2);
    while (bin.length < len) {
      bin = '0' + bin;
    }
    return bin;
  }

  // 비밀지도 해독
  const decodedMap = hash.map((line) =>
    line.replace(/1|0/g, (match) => (match === '1' ? '#' : ' '))
  );

  return decodedMap;
}
```

해당 코드는 두 개의 n x n 크기의 배열 arr1, arr2를 받아 각 요소를 비트 OR 연산한 결과를 2진수로 변환하여 주어진 규칙에 따라 해독하여, 이를 다시 n x n 크기의 배열로 반환하는 함수입니다.

우선, 첫 번째 reduce 메서드에서는 arr1과 arr2의 각 요소를 비트 OR 연산한 결과를 2진수로 변환하여, 이를 하나의 배열(hash)에 저장합니다. toBinary 함수는 이진수로 변환하는 함수입니다.

다음으로, hash 배열에 저장된 값을 가지고, 각 라인(line)에서 1과 0을 각각 '#'과 ' '으로 변환하여, 해독된 지도(decodedMap)를 생성합니다. 이 과정에서 map 메서드를 사용합니다.

마지막으로, 해독된 지도(decodedMap)를 반환합니다.

### 다른풀이

```js
function solution(n, arr1, arr2) {
  // 해시(hash) 생성
  const decodedMap = arr1.reduce((acc, cur, i) => {
    const combined = cur | arr2[i]; // 비트 OR 연산
    const binary = toBinary(combined, n); // 2진수로 변환
    const decodedLine = binary.replace(/1|0/g, (match) => (match === '1' ? '#' : ' ')); // 해독된 지도 한 줄
    return [...acc, decodedLine];
  }, []);

  // 2진수로 변환하는 함수
  function toBinary(num, len) {
    let bin = num.toString(2);
    while (bin.length < len) {
      bin = '0' + bin;
    }
    return bin;
  }

  return decodedMap;
}
```

<br/>

## 🎯[[level 2] 피보나치 수 - 12945](https://school.programmers.co.kr/learn/courses/30/lessons/12945)

```js
function solution(n) {
  // 1부터 n까지의 배열 생성
  const fibonacci = Array.from({ length: n }, (_, i) => i + 1)
    // reduce 메서드로 각 요소의 값을 계산
    .reduce((acc, cur) => {
      if (cur <= 2) {
        // 첫 번째와 두 번째 요소는 1로 초기화
        acc.push(1);
      } else {
        // 이전 두 개의 요소를 더해서 값을 계산
        const sum = (acc[cur - 2] + acc[cur - 3]) % 1234567;
        // 1234567로 나눈 나머지를 계산한 값을 배열에 추가
        acc.push(sum);
      }
      // 배열을 반환하면서 reduce 메서드를 계속 실행
      return acc;
    }, []);

  // n번째 요소를 반환
  return fibonacci[n - 1];
}
```

1. 첫 번째 주석에서는 Array.from 메서드를 사용하여 1부터 n까지의 배열을 만드는 코드입니다.

2. reduce 메서드에서는 각 요소의 값을 계산합니다.

3. if 문에서는 첫 번째와 두 번째 요소를 1로 초기화하는 코드를 설명합니다.

4. else 문에서는 이전 두 개의 요소를 더하여 값을 계산하는 코드와 1234567로 나눈 나머지를 계산한 값을 배열에 추가하는 코드를 설명합니다.

5. reduce 메서드에서는 배열을 반환하면서 계속해서 실행됩니다.

6. 마지막으로 n번째 요소를 반환하는 코드를 설명합니다.

<br/>

# 📚 레퍼런스

> 이웅모. 모던 자바스크립트 Deep Dive : 자바스크립트의 기본 개념과 동작 원리 / 이웅모 지음 (2020). Print.

> David Flanagan, and Han Seon- Yong. 자바스크립트 완벽 가이드. Insight, 2022. Web.

> 고경희. (Do It!) 모던 자바스크립트 프로그래밍의 정석 : 한권으로 끝내는 웹 개발 교과서 / 고경희 지음 (2022). Print.

> [Array.prototype.reduce() | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

> [map, reduce 활용하기 | 제로초블로그](https://www.zerocho.com/category/JavaScript/post/5acafb05f24445001b8d796d)
