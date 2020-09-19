function chart(method) {
    let res = null;
    switch(method) {
        case "GET":
            res = [20, 40, 4, 51, 11, 78]
            break;
        default: 
            res = null;
    }
    return res;
}

module.exports = chart