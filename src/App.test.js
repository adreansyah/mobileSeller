import { Services } from "./service";

const getUser = user => Services('http://172.18.186.31:27172').post(`/api/authenticate`, {
    Params: user
});

describe('#getUser() using async/await', () => {
    it('should load user data', async () => {
        console.log('hello')
        const data = await getUser({
            "username": "stg.is@elevenia.co.id",
            "password": "elevenia123",
            "clientId": "fcmToken",
            "rememberMe": true

        });
        console.log(data);
        expect(data).toBeDefined()
        // expect(data.entity.name).toEqual('Koen van Gilst')
    })
})