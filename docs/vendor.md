# vendor

Re-exported utilities from best-in-opinion packages.

Note that:
- The export are hard-coded function names (so you cannot use override to force a newer version for more functions)
- Internal types are not re-exported

If you need to use internal types, install the package directly (the size won't increase because nowadays package managers like bun/pnpm will link the same packages)
