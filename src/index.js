module.exports = function check(str, bracketsConfig) {
    let stack = [];
    let brackets = {};

    bracketsConfig.forEach(item => {
        brackets[item[1]] = item[0];
    })


    function isClosedBrackets(cn) {
        let closedArrBrackets = [];
        bracketsConfig.forEach(item => {
            closedArrBrackets.push(item[1]);
        })
        return closedArrBrackets.indexOf(cn) > -1;
    }
    function isOpenedBrackets(cn) {
        let openedArrBrackets = [];
        bracketsConfig.forEach(item => {
            openedArrBrackets.push(item[0]);
        })
        return openedArrBrackets.indexOf(cn) > -1;
    }

    for (let i = 0; i < str.length; i++) {
        let current = str[i];
        if(isOpenedBrackets(current) === isClosedBrackets(current)) {
            if (stack.length) {
                let lastStack = stack.pop();
                if(lastStack !== current) {
                    if(stack.includes(current)) {
                        return false;
                    }
                    stack.push(lastStack);
                    stack.push(current);
                } else if (brackets[current] !== lastStack) {
                    return false
                }
            } else {
                stack.push(current);
            }
        } else  if (isClosedBrackets(current)) {
            if (stack.length) {
                // console.log('stack', stack)
                if (brackets[current] !== stack.pop()) {
                    return false
                }
            } else {
                return false;
            }
        } else {
            stack.push(current);
        }
    }
    return stack.length === 0;
}