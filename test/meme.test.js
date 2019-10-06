const meme = artifacts.require("meme");
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('meme',(accounts) => {
    let memee
    before(async () => {
        memee = await meme.deployed()
    })
    describe('deployment', async() => {
        it('deploys successfully', async()=>{
            // memee = await meme.deployed()
            const address = memee.address
            console.log(address)
            assert.notEqual(address,null)
            assert.notEqual(address,'0x0')
            assert.notEqual(address,'')
            assert.notEqual(address,undefined)
        })
    })

    describe('storage',async()=>{
        it('updates hash',async () => {
            let result = await memee.set('abcdef')
            let res = await memee.get()
            assert.equal(res,'abcdef')
        })
    })
})  