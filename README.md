## Peity-React

This is a fork of https://github.com/mustangostang/react-peity. Inital port credits to [mustangostang](https://github.com/mustangostang)

A React version of an excellent [peity](https://github.com/benpickles/peity) library for beautiful mini `<svg>` graphs.

Since `peity` is heavily dependent on jQuery, for 2016, a React version was badly needed.

See the examples at [peity](http://benpickles.github.io/peity/) page.

Currently supports `Line` and `Bar` widgets. Will add more in future as time permits.

Supports React >= v15.6.2

### Installation:

`npm install peity-react`

### Usage:

```
import { Line } from 'peity-react';
<Line values={ [5, 7, 12, 20] } height="16" min="0" max="100" />
```

### Line options (default)

```
delimiter: "," # You can use string as values as well
fill: "#c6d9fd"
height: 16
min: 0
max: -Infinity
stroke: "#4d89f9"
strokeWidth: 1
width: 32
```

### Bar options (default)


```
delimiter: ","
fill: ["#4D89F9"] # Use several fills, they will be cycled
height: 16
min: 0
max: -Infinity
padding: 0.1
width: 32
```
