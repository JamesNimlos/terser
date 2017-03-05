do_screw: {
    options = { screw_ie8: true };
    beautify = {
        screw_ie8: true,
        ascii_only: true
    };

    input: f("\v");
    expect_exact: 'f("\\v");';
}

dont_screw: {
    options = { screw_ie8: false };
    beautify = { screw_ie8: false, ascii_only: true };

    input: f("\v");
    expect_exact: 'f("\\x0B");';
}

do_screw_constants: {
    options = {
        screw_ie8: true,
    }
    input: {
        f(undefined, Infinity);
    }
    expect_exact: "f(void 0,1/0);"
}

dont_screw_constants: {
    options = {
        screw_ie8: false,
    }
    input: {
        f(undefined, Infinity);
    }
    expect_exact: "f(undefined,Infinity);"
}

do_screw_try_catch: {
    options = { screw_ie8: true };
    mangle = { screw_ie8: true };
    beautify = { screw_ie8: true };
    input: {
        good = function(e){
            return function(error){
                try{
                    e()
                } catch(e) {
                    error(e)
                }
            }
        };
    }
    expect: {
        good = function(n){
            return function(t){
                try{
                    n()
                } catch(n) {
                    t(n)
                }
            }
        };
    }
}

dont_screw_try_catch: {
    options = { screw_ie8: false };
    mangle = { screw_ie8: false };
    beautify = { screw_ie8: false };
    input: {
        bad = function(e){
            return function(error){
                try{
                    e()
                } catch(e) {
                    error(e)
                }
            }
        };
    }
    expect: {
        bad = function(n){
            return function(t){
                try{
                    n()
                } catch(n) {
                    t(n)
                }
            }
        };
    }
}

do_screw_try_catch_undefined: {
    options = { screw_ie8: true };
    mangle = { screw_ie8: true };
    beautify = { screw_ie8: true };
    input: {
        function a(b){
            try {
                throw 'Stuff';
            } catch (undefined) {
                console.log('caught: ' + undefined);
            }
            console.log('undefined is ' + undefined);
            return b === undefined;
        };
    }
    expect: {
        function a(o){
            try{
                throw "Stuff"
            } catch (o) {
                console.log("caught: "+o)
            }
            console.log("undefined is " + void 0);
            return void 0===o
        }
    }
}

dont_screw_try_catch_undefined: {
    options = { screw_ie8: false };
    mangle = { screw_ie8: false };
    beautify = { screw_ie8: false };
    input: {
        function a(b){
            try {
                throw 'Stuff';
            } catch (undefined) {
                console.log('caught: ' + undefined);
            }
            console.log('undefined is ' + undefined);
            return b === undefined;
        };
    }
    expect: {
        function a(n){
            try{
                throw "Stuff"
            } catch (undefined) {
                console.log("caught: " + undefined)
            }
            console.log("undefined is " + undefined);
            return n === undefined
        }
    }
}
