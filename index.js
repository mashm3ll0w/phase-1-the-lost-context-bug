const messageConfig = {
  frontContent: "Happy Birthday, Odin One-Eye!",
  insideContent: "From Asgard to Nifelheim, you're the best all-father ever.\n\nLove,",
  closing: {
      "Thor": "Admiration, respect, and love",
      "Loki": "Your son"
  },
  signatories: [
      "Thor",
      "Loki"
  ]
};

// Solution 1A -> Passing the thisArg as an argument to the forEach function
const printCard = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);

  this.signatories.forEach(function (signatory) {
    const message = `${this.closing[signatory]}, ${signatory}`
    console.log(message)
  }, this);
};

printCard.call(messageConfig);


// Solution 1B -> A slight variation of Solution 1 and invoke bind on the forEach function
const printACard = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);
  const contextBoundForEachExpr = function (signatory) {
    const message = `${this.closing[signatory]}, ${signatory}`;
    console.log(message);
  }.bind(this);

  this.signatories.forEach(contextBoundForEachExpr);
};

printACard.call(messageConfig);

// Solution 2 - Closure -> assign the context to a variable which will then be accessible via the scope chain
const printBCard = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);

  const outerContext = this;

  this.signatories.forEach(function (signatory) {
    const message = `${outerContext.closing[signatory]}, ${signatory}`;
    console.log(message);
  });
};

printBCard.call(messageConfig);


// Solution 3 - Arrow function -> create an arrow function that doesnt create its own context but instead inherits the context of the parent function
const printCCard = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);
  // Wow! Elegant! And notice the arrow function's `this` is the same `this`
  // that printCard has; specifically, the `thisArg` that was passed to it
  this.signatories.forEach(signatory =>
    console.log(`${this.closing[signatory]}, ${signatory}`)
  );
};

printCCard.call(messageConfig);