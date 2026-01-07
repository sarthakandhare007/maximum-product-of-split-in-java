# maximum-product-of-split-in-java
This is **LeetCode 2438 – Range Product Queries of Powers**.
Let’s break it down cleanly and then give an **efficient Java solution**.

---

## 🔍 Key Observations

### 1️⃣ What is `powers`?

* `powers` is formed from the **binary representation of `n`**
* Each set bit in `n` contributes one power of 2
* This representation is **unique** and uses the **minimum number of powers**

Example

```
n = 15 (1111₂)
powers = [1, 2, 4, 8]
```

```
n = 10 (1010₂)
powers = [2, 8]
```

---

### 2️⃣ What does a query ask?

Each query `[l, r]` asks for:

```
powers[l] * powers[l+1] * ... * powers[r]
```

Since:

```
powers[i] = 2^(bit_position_i)
```

The product becomes:

```
2^(sum of selected bit positions)
```

So the problem reduces to:

> **Fast exponentiation with prefix sums**

---

## 🚀 Optimized Strategy

### Step 1: Extract powers of 2 from `n`

Traverse bits of `n`:

* If bit `i` is set → add `2^i` to `powers`

### Step 2: Build prefix sum of exponents

Instead of storing powers directly, store:

```
exp[i] = exponent of 2
```

Prefix sum:

```
prefix[i] = exp[0] + exp[1] + ... + exp[i]
```

### Step 3: Answer queries

For query `[l, r]`:

```
exponentSum = prefix[r] - prefix[l-1]
answer = 2^exponentSum % MOD
```

Use **fast modular exponentiation**.

---

## ⏱️ Complexity

* Building powers: **O(log n)** (≤ 30 bits)
* Queries: **O(q log MOD)**
* Space: **O(log n)**

Works easily within constraints.

---

## ✅ Java Solution (Clean & Efficient)

```java
class Solution {
    static final int MOD = 1_000_000_007;

    public int[] productQueries(int n, int[][] queries) {

        // Step 1: extract exponents of powers of 2
        List<Integer> exps = new ArrayList<>();
        int bit = 0;
        while (n > 0) {
            if ((n & 1) == 1) {
                exps.add(bit);
            }
            n >>= 1;
            bit++;
        }

        // Step 2: prefix sum of exponents
        int m = exps.size();
        long[] prefix = new long[m];
        prefix[0] = exps.get(0);
        for (int i = 1; i < m; i++) {
            prefix[i] = prefix[i - 1] + exps.get(i);
        }

        // Step 3: process queries
        int[] ans = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int l = queries[i][0];
            int r = queries[i][1];

            long expSum = prefix[r] - (l > 0 ? prefix[l - 1] : 0);
            ans[i] = (int) modPow(2, expSum);
        }

        return ans;
    }

    // Fast modular exponentiation
    private long modPow(long base, long exp) {
        long result = 1;
        base %= MOD;

        while (exp > 0) {
            if ((exp & 1) == 1) {
                result = (result * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return result;
    }
}
```

---

## 🧪 Example Walkthrough

### Input

```
n = 15
queries = [[0,1],[2,2],[0,3]]
```

### Binary

```
15 = 1111₂
powers = [1,2,4,8]
exponents = [0,1,2,3]
prefix = [0,1,3,6]
```

### Queries

* `[0,1] → 2^(1) = 2`
* `[2,2] → 2^(2) = 4`
* `[0,3] → 2^(6) = 64`

✅ Output: `[2,4,64]`

---


