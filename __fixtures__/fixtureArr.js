const diffArr = [
  {
    key: 'common',
    values: [],
    children: [
      {
        key: 'follow',
        values: [false],
        meta: {
          added: true,
          removed: false,
          updated: false,
        },
      },
      {
        key: 'setting1',
        values: ['Value 1'],
        meta: {
          added: false,
          removed: false,
          updated: false,
        },
      },
      {
        key: 'setting2',
        values: [200],
        meta: {
          added: false,
          removed: true,
          updated: false,
        },
      },
      {
        key: 'setting3',
        values: [true, null],
        meta: {
          added: false,
          removed: false,
          updated: true,
        },
      },
      {
        key: 'setting4',
        values: ['blah blah'],
        meta: {
          added: true,
          removed: false,
          updated: false,
        },
      },
      {
        key: 'setting5',
        values: [
          {
            key5: 'value5',
          },
        ],
        meta: {
          added: true,
          removed: false,
          updated: false,
        },
      },
      {
        key: 'setting6',
        values: [],
        children: [
          {
            key: 'doge',
            values: [],
            children: [
              {
                key: 'wow',
                values: ['', 'so much'],
                meta: {
                  added: false,
                  removed: false,
                  updated: true,
                },
              },
            ],
            meta: {
              added: false,
              removed: false,
              updated: false,
            },
          },
          {
            key: 'key',
            values: ['value'],
            meta: {
              added: false,
              removed: false,
              updated: false,
            },
          },
          {
            key: 'ops',
            values: ['vops'],
            meta: {
              added: true,
              removed: false,
              updated: false,
            },
          },
        ],
        meta: {
          added: false,
          removed: false,
          updated: false,
        },
      },
    ],
    meta: {
      added: false,
      removed: false,
      updated: false,
    },
  },
  {
    key: 'group1',
    values: [],
    children: [
      {
        key: 'baz',
        values: ['bas', 'bars'],
        meta: {
          added: false,
          removed: false,
          updated: true,
        },
      },
      {
        key: 'foo',
        values: ['bar'],
        meta: {
          added: false,
          removed: false,
          updated: false,
        },
      },
      {
        key: 'nest',
        values: [
          {
            key: 'value',
          },
          'str',
        ],
        meta: {
          added: false,
          removed: false,
          updated: true,
        },
      },
    ],
    meta: {
      added: false,
      removed: false,
      updated: false,
    },
  },
  {
    key: 'group2',
    values: [
      {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
    ],
    meta: {
      added: false,
      removed: true,
      updated: false,
    },
  },
  {
    key: 'group3',
    values: [
      {
        deep: {
          id: {
            number: 45,
          },
        },
        fee: 100500,
      },
    ],
    meta: {
      added: true,
      removed: false,
      updated: false,
    },
  },
];

export default diffArr;
