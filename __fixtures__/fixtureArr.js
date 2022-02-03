const diffArr = [
  {
    key: 'common',
    meta: { isNested: true, wasAdded: false, wasRemoved: false, wasUpdated: false },
    values: [
      {
        key: 'follow',
        meta: { isNested: false, wasAdded: true, wasRemoved: false, wasUpdated: false },
        values: [false],
      },
      {
        key: 'setting1',
        meta: { isNested: false, wasAdded: false, wasRemoved: false, wasUpdated: false },
        values: ['Value 1'],
      },
      {
        key: 'setting2',
        meta: { isNested: false, wasAdded: false, wasRemoved: true, wasUpdated: false },
        values: [200],
      },
      {
        key: 'setting3',
        meta: { isNested: false, wasAdded: false, wasRemoved: false, wasUpdated: true },
        values: [true, null],
      },
      {
        key: 'setting4',
        meta: { isNested: false, wasAdded: true, wasRemoved: false, wasUpdated: false },
        values: ['blah blah'],
      },
      {
        key: 'setting5',
        meta: { isNested: false, wasAdded: true, wasRemoved: false, wasUpdated: false },
        values: [{ key5: 'value5' }],
      },
      {
        key: 'setting6',
        meta: { isNested: true, wasAdded: false, wasRemoved: false, wasUpdated: false },
        values: [
          {
            key: 'doge',
            meta: { isNested: true, wasAdded: false, wasRemoved: false, wasUpdated: false },
            values: [
              {
                key: 'wow',
                meta: { isNested: false, wasAdded: false, wasRemoved: false, wasUpdated: true },
                values: ['', 'so much'],
              },
            ],
          },
          {
            key: 'key',
            meta: { isNested: false, wasAdded: false, wasRemoved: false, wasUpdated: false },
            values: ['value'],
          },
          {
            key: 'ops',
            meta: { isNested: false, wasAdded: true, wasRemoved: false, wasUpdated: false },
            values: ['vops'],
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    meta: { isNested: true, wasAdded: false, wasRemoved: false, wasUpdated: false },
    values: [
      {
        key: 'baz',
        meta: { isNested: false, wasAdded: false, wasRemoved: false, wasUpdated: true },
        values: ['bas', 'bars'],
      },
      { key: 'foo', meta: { isNested: false, wasAdded: false, wasRemoved: false, wasUpdated: false }, values: ['bar'] },
      {
        key: 'nest',
        meta: { isNested: false, wasAdded: false, wasRemoved: false, wasUpdated: true },
        values: [{ key: 'value' }, 'str'],
      },
    ],
  },
  {
    key: 'group2',
    meta: { isNested: false, wasAdded: false, wasRemoved: true, wasUpdated: false },
    values: [{ abc: 12345, deep: { id: 45 } }],
  },
  {
    key: 'group3',
    meta: { isNested: false, wasAdded: true, wasRemoved: false, wasUpdated: false },
    values: [{ deep: { id: { number: 45 } }, fee: 100500 }],
  },
];

export default diffArr;
