const promoteFunction = require('../lib/request-reply-promoter');

describe('erroring function promoter =>', () => {

    describe('when called with functions with invalid hooks => ', () => {
        it('rejects invalid init hook', () => {
            try {
                const someFunction = require('./helpers/hooks/invalid-init-hook-request-reply-function');
                promoteFunction(someFunction);
                fail('should fail')
            } catch (err) {
                expect(err.type).toEqual('error-promoting-function');
                expect(err.cause).toEqual('Request-reply function init hook must be a function. Found: number')
            }
        });

        it('rejects invalid destroy hook', () => {
            try {
                const someFunction = require('./helpers/hooks/invalid-destroy-hook-request-reply-function');
                promoteFunction(someFunction);
                fail('should fail')
            } catch (err) {
                expect(err.type).toEqual('error-promoting-function');
                expect(err.cause).toEqual('Request-reply function destroy hook must be a function. Found: object')
            }
        });
    });
});
