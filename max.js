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

