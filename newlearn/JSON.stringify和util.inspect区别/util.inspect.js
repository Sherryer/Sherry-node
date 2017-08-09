/**
 * Created by sherryer on 2017/3/28.
 */
const util = require('util');

var obj = {
    "a":"a",
    "b":{
        "c":"c",
        "d":{
            "e":"e",
            "f":{
                "g":"g",
                "h":{
                    "i":"i"
                }
            }
        }
    }
};

var string1 = JSON.stringify(obj);
console.log(string1);

var string2 = util.inspect(obj);
console.log(string2);