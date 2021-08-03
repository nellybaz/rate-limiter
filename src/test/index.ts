import { expect } from 'chai';
import 'mocha'
import dotenv from "dotenv"
dotenv.config()

describe('Test', ()=>{
  it('returns true', async () =>{
    expect(1).to.eq(1)
  })
})