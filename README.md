# Syntax
```
config "<name>" {
	<type> <name> <value>
}
```
# Example
`config.tc`:
```
config "main" {
	boolean yes true
    boolean no false
    number zero 0
    number one 1
    string test TEST
    string test1 TEST1
}
```
`index.js`:
```js
import { parse } from "https://deno.land/x/tconfig/index.ts"
const config = await Deno.readFile("./config.tc");
parse(config) // { name: "main", properties: { yes: true, no: false, zero: 0, one: 1, test: "TEST", test1: "TEST1"} }
```
# Types
the available types are string, number, boolean, json

# json
```
config "main" {
	json what {"yes":"yes","no":"no"}
}
```
# environment variables
you can access environment variables by using {NAME}

**example**
```
config "main" {
	string test The environment variable named lol is {lol}
}
```
