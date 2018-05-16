var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Admin';
        var text = 'Hello';
        var response = generateMessage(from, text);

        expect(response).toBeTruthy();
        expect(response.from).toBe(from);
        expect(response.text).toBe(text);
        expect(response.createdAt).toBeTruthy();
        expect(typeof response.createdAt).toBe('number');
    });
});