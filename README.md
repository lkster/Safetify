# Safetify

Safetify is a tool for resolving received data from 3rd party applications (eg. API) to make data strongly-typed. Thanks to that we don't need to take care later on about unexpected `undefined` values or value type.

## Installation
To install Safetify simply use `npm`:

```
npm install safetify --save
```

# Introduction
Received from 3rd party applications data are never strongly-typed so we can get any value in place we expect specifically typed one. Not always something that fits data we made application for. As example we can take bug in API because of which we wouldn't receive specific value or even get empty result. We need to prevent of situations like that one simply by checking for `null`s, `undefined` values or by mapping data to validated model.

Say we would receive from API data like this:

```json
{
    "name": "John Doe",
    "age": 30,
    "isSingle": false
}
```

With Safetify we can resolve the data in that way:

```typescript
import * as Safetify from 'safetify';

let personResolver: Safetify.Object = Safetify.Object<IPerson>({
    name: Safetify.String(),
    age: Safetify.Number(),
    isSingle: Safetify.Boolean()
});

let person: IPerson = personResolver.resolve(data);
```

Or use alternative imports:

```typescript
import { ObjectResolver, StringResolver, NumberResolver, BooleanResolver } from 'safetify';

let personResolver: ObjectResolver = ObjectResolver<IPerson>({
    name: StringResolver(),
    age: NumberResolver(),
    isSingle: BooleanResolver()
});

let person: IPerson = personResolver.resolve(data);
```

And then data will always be the exact type no matter if we received correct data or not. It prevents of many cases of using methods dedicated to specific types of data. Say we got `undefined` value in `name` property and now we want to use `toUpperCase` method on that data. Basically it would look like that:

```ts
let name = person.name; // it's undefined

name.toUpperCase();
```

This would throw us a `TypeError` exception. Safetify in that case will convert failed data to empty `string` so in result we will always be operating on string:

```ts
let name = person.name; // now it's empty string

name.toUpperCase();
```

This won't throw any exception of course.

# Usage

Safetify works both with TypeScript and JavaScript. Look on [unit tests](https://github.com/ThaFog/Safetify/tree/master/spec) or [documentation](https://thafog.github.io/Safetify/index.html) to get more familiar with.

Simple types have no arguments to pass, ie. we can use resolvers:
- `StringResolver`
- `NumberResolver`
- `BooleanResolver`

just like `StringResolver().resolve(<anyString>)`.

In case of advanced types like `object` we need to pass structure or values (as we did it in example above).

Additional functionality is a possibility to set nullable and default value (default is available only for simple types and enum).

```ts
let personResolver: ObjectResolver = ObjectResolver<IPerson>({
    name: StringResolver.defaultsTo('Johnny'),
    age: NumberResolver,
    isSingle: BooleanResolver.nullable()
});
```

After resolving any type of data `resolve` method will always return `Result` object which has 3 properties:
- `success` as `boolean`,
- `result` as resolved data type,
- `error` if success is false as `string` or `string[]` type. `Null` otherwise

If resolving was not succeeded then `error` property will always describe what went wrong (and which property in if resolved data was `object` or `array`)