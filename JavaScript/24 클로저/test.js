const funcs = [];

for (let i = 0; i < 3; i++) {
    funcs[i] = function () { return i; };
}

for (let j = 0; j < funcs.length; j++) {
    console.log(funcs[j]());
}