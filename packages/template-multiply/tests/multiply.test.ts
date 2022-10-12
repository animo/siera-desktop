import { multiply } from '../src'

describe('multiply', () => {
  test('should multiply 2 and 4', () => {
    expect(multiply(2, 4)).toStrictEqual(8)
  })

  test('should allow string values', () => {
    expect(multiply('2', '4')).toStrictEqual(8)
  })
})
