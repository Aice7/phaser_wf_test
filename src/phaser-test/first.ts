import { TestQuery } from "../ClientQuery";

export  function test():TestQuery {
  console.log('test')
  return {
    name: 'aaa',
    id:1
  }
}