const chai = require('chai')
const $ = require('jQuery')

const InputWords = require('./script')

chai.should()
chai.use(require('chai-as-promised'))

describe('inputWords View 테스트', () =>{
    let dom
    let testView

    before('inputWords', () =>{
        dom = $('<div>')
        testView = inputWords.create(dom);
    })

    it('getWords 실행시 단어들을 배열로 받아온다', () =>{
        // given
        let dom = $('<div>')
        let testView = inputWords.create(dom);

        // when
        

        // then
    })

    it('getWords 실행시 단어들을 배열로 받아온다', () =>{
        // given
        let dom = $('<div>')
        let testView = inputWords.create(dom);

        // when
        

        // then
    })
})
