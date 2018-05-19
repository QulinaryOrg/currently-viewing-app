import { includesIp, appendToList, removeFromList } from '../ipDataList'

test('includesIp returns a boolean stating if a list contains that ip', () => {
  expect(includesIp([], '127.0.0.1')).toBe(false)
  expect(
    includesIp(
      [
        {
          ip: '127.0.0.1',
        },
      ],
      '127.0.0.1'
    )
  ).toBe(true)
})

test('appendToList appends to list without mutating', () => {
  const empty = []
  const list1 = appendToList([], { ip: '127.0.0.1' })
  const list2 = appendToList(list1, { ip: '127.0.0.1' })
  const list3 = appendToList(list1, { ip: '127.0.0.2' })
  expect(empty).toEqual([])
  expect(list1).toEqual([{ ip: '127.0.0.1' }])
  expect(list2).toEqual(list1)
  expect(list3).toEqual([...list1, { ip: '127.0.0.2' }])
})

test('removeFromList removes from list without mutating', () => {
  const list1 = [{ ip: '127.0.0.1' }]
  const list2 = removeFromList([{ ip: '127.0.0.1' }], '127.0.0.1')
  const list3 = removeFromList([], { ip: '127.0.0.1' })
  const list4 = removeFromList([{ ip: '192.168.1.1' }], { ip: '127.0.0.1' })
  expect(list1).toEqual([{ ip: '127.0.0.1' }])
  expect(list2).toEqual([])
  expect(list3).toEqual([])
  expect(list4).toEqual([{ ip: '192.168.1.1' }])
})
