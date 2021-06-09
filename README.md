# Much-Ado-About-Nothing
> **Seriously, nothin' going here. But hi though!**

## Usage

### As Node Module

* `yarn add @theorylabs/much-ado-about-nothing`
* Then, in your code:

js```
  const noop = require('@theorylabs/much-ado-about-nothing')

  noop()
  // Prints "Much ado about a whole lotta nuthin\" - TheoryLabs (https://TheoryLabs.dev)" to your console

  noop("Oh hi!")
  // Prints "Oh hi!" to your console

  noop({ willThrowError: "Only strings can be arguments!"})
  // Throws an Error

```

### CLI

* A cli is available
bash```
 * nuthin [String]

 Ex:
 nuthin "hello!"
 # Outputs "hello!" to your console

 nuthin
 # No arguments given (default run) outputs "Much ado about a whole lotta nuthin\" - TheoryLabs (https://TheoryLabs.dev)" to your console
```
