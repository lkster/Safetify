## 2.6.0
- Added `TupleResolver`
- Updated package's description in `package.json` file

---

### 2.5.0
- Added `isNull` and `isPrimitive` utility functions
- Fixed documentation of `isDef` utility function

---

### 2.4.1
- Added resolving `default` value of constraint to not leave it without type validity


---

## 2.4.0
### General
- Implemented constraints for `StringResolver` and `NumberResolver`

### Technical
- Updated `README.md` file

---

## 2.3.0
### General
- Added utility functions to bundle under `util` namespace (fail)
- Added `isDict` utility function
- Fixed `isValidDate` utility function to check date validity more strictly
- Updated TypeScript definition file

### Technical
- Added unit tests for utilities


---

## 2.1.1
### General
- Added `isArrayLike`, `isValidDate` and `isFunction` utility methods
- Updated documentation
- Updated `README.md` file

### Technical
- Moved `mergeErrors` utility function to ne `ResolverUtil` class

---

## 2.1.0
### General
- Added `DateResolver`
- Added `isDateLike` method to utilities
- Added new keywords in `package.json` file
- Updated `README.md` file

### Technical
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

### Technical
- Changed structure of all resolvers to be class-based
- Changed interfaces to be exportable instead of being global
- Changed `Result` error variable to be required instead of optional
- Removed old code

---

## 1.1.2
### General
- Updated TypeScript definition file
- Removed `ResolverType` from bundle
- Removed `index` word from arrays' error description
- Fixed resolvers' aliases im main
- Fixed ArrayResolver with returning inverted array
- Fixed `EnumResolver` with setting default value in both JavaScript `enum` representations
- Fixed `NumberResolver` to not accept `Infinity` or `NaN`
- Fixed `ObjectResolver`'s generic type
- Fixed improperly working `OneOfResolver`

### Technical
- Added TypeScript unit tests
- Added unit tests for `AnyResolver` and `OneOfResolver`
- Changed testing environment from TypeScript source to built JavaScript bundle
- Changed name of `ResolverType` to `ResolverFunction`
- Updated all iterations method with `for` loop
- Fixed `SafeUtils.makeSafeNumber` method to accept non-integer numbers
- Refactored `Dictionary` types into `IDictionary` interface

---

## 1.0.1
- Fixed TypeScript definition file

---

## 1.0.0
- Changed name of `DynamicObjectResolver` to `DictionaryResolver`
- Refactored unit tests