## 3.0.1
## General
- Added new keywords

## 3.0.0
## General
- Changed errors to return input's type instead of static `value` label
- Possibility to set property as optional (i.e. value can be `undefined` but not `null`)
- Errors are now always returned as `string[]` instead of previous `string` or `string[]`. If there are no errors, array is just empty (instead of previous `null`)
- Rewritten all resolvers to be 100% class-based
- Made all resolvers immutable (`nullable`, `optional`, `defaultsTo` and `constraint` options)
- Added `CHANGELOG.md` file


## Bugfixes
- Tuple now returns error if given input tuple has less or more places than expected
- Fixed `ITupleDefinition` type
- Fixed Tuple to return basic safe-valued tuple if provided input is not an array (previously it provided Result objects in all places where should be exact value)
- Fixed NumberResolver to return NaN if not-nullable get `null` input (previously it was converting `null` to `0`)

## Refactor
- Added TSLint
- Added unit tests of nullable and optional flags
- Merged JS and TS unit tests
- Nullable and Optional methods are now inherited from abstract `NullableResolver` and `OptionalResolver` classes
- `AnyResolver` now extending `Resolver` to keep correct type definition
- Removed `mergeErrors` utility
- Bumped TypeScript, Webpack and other dev dependencies versions
- Changed name of `ResolvingStructure` to `definition`
- Changed name of `ITupleResolver` to `ITupleDefinition`
- Changed name of `IObjectResolver` to `IObjectDefinition`
- Removed `ResolverFunction` type
- Fixed and updated unit tests

---

## 2.7.1
### Bugfixes
- Fixed returning null on nullable option when at least one property of some object was incorrect

---

## 2.7.0
### General
- Added `PartialResolver`

## Bugfixes
- Fixed `DateResolver` unit tests to be independent of timezone

---

## 2.6.1
### General
- Added missing utility functions in TypeScript definition file

## Bugfixes
- Fixed example in `README.md` file

### Refactor
- Changed name of `SimpleTypeResolver` to `PrimitiveResolver`
- Removed unnecessary types from jsdoc comments

---

## 2.6.0
## General
- Added `TupleResolver`
- Updated package's description in `package.json` file

---

### 2.5.0
## General
- Added `isNull` and `isPrimitive` utility functions

## Bugfixes
- Fixed documentation of `isDef` utility function

---

### 2.4.1
## General
- Added resolving `default` value of constraint to not leave it without type validity

---

## 2.4.0
### General
- Implemented constraints for `StringResolver` and `NumberResolver`
- Updated `README.md` file

---

## 2.3.0
### General
- Added utility functions to bundle under `util` namespace (fail)
- Added `isDict` utility function
- Updated TypeScript definition file

## Bugfixes
- Fixed `isValidDate` utility function to check date validity more strictly

### Refactor
- Added unit tests for utilities

---

## 2.1.1
### General
- Added `isArrayLike`, `isValidDate` and `isFunction` utility methods
- Updated documentation
- Updated `README.md` file

### Refactor
- Moved `mergeErrors` utility function to the `ResolverUtil` class

---

## 2.1.0
### General
- Added `DateResolver`
- Added `isDateLike` method to utilities
- Added new keywords in `package.json` file
- Updated `README.md` file

### Refactor
- Updated `package.json`

---

## 2.0.0
### General
- Added generated documentation
- Added simple types resolvers classes
- Added `LICENSE` and `README.md` files
- Changed all variable-based resolvers to function-based (this was creating bug with one-instanced resolver for advanced types)
- Changed all errors to be `null` by default
- Updated TypeScript definition file

### Refactor
- Changed structure of all resolvers to be class-based
- Changed interfaces to be exportable instead of being global
- Changed `Result` error variable to be required instead of optional
- Removed old code

---

## 1.1.2
### General
- Updated TypeScript definition file

### Bugfixes
- Fixed resolvers' aliases im main
- Fixed ArrayResolver with returning inverted array
- Fixed `EnumResolver` with setting default value in both JavaScript `enum` representations
- Fixed `NumberResolver` to not accept `Infinity` or `NaN`
- Fixed `ObjectResolver`'s generic type
- Fixed improperly working `OneOfResolver`

### Refactor
- Added TypeScript unit tests
- Added unit tests for `AnyResolver` and `OneOfResolver`
- Changed testing environment from TypeScript source to built JavaScript bundle
- Changed name of `ResolverType` to `ResolverFunction`
- Updated all iterations method with `for` loop
- Fixed `SafeUtils.makeSafeNumber` method to accept non-integer numbers
- Refactored `Dictionary` types into `IDictionary` interface
- Removed `ResolverType` from bundle
- Removed `index` word from arrays' error description

---

## 1.0.1
## Bugfixes
- Fixed TypeScript definition file

---

## 1.0.0
## General
- Changed name of `DynamicObjectResolver` to `DictionaryResolver`

## Bugfixes
- Refactored unit tests