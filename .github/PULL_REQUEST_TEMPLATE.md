**Before submitting a pull request,** please make sure the following is done:

1. Fork the repository and create your branch from master.

2. Run pnpm run in the repository root.

3. If you've fixed a bug or added code that should be tested, add tests!

4. Ensure the test suite passes (pnpm run test). Tip: pnpm run test --watch TestName is helpful in development.

5. Run pnpm run test-prod to test in the production environment. It supports the same options as pnpm run test.

6. If you need a debugger, run pnpm run debug-test --watch TestName, open chrome://inspect, and press "Inspect".

7. Format your code with prettier (pnpm run prettier).

8. Make sure your code lints (pnpm run lint). Tip: pnpm run linc to only check changed files.

9. If you haven't already, complete the CLA.
