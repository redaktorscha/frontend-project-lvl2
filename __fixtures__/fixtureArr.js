const diffArr = [
  {
    key: 'common',
    values: [],
    children: [
      {
        key: 'follow',
        values: [false],
        meta: {
          wasAdded: true,
          wasRemoved: false,
          wasUpdated: false,
        },
      },
      {
        key: 'setting1',
        values: ['Value 1'],
        meta: {
          wasAdded: false,
          wasRemoved: false,
          wasUpdated: false,
        },
      },
      {
        key: 'setting2',
        values: [200],
        meta: {
          wasAdded: false,
          wasRemoved: true,
          wasUpdated: false,
        },
      },
      {
        key: 'setting3',
        values: [true, null],
        meta: {
          wasAdded: false,
          wasRemoved: false,
          wasUpdated: true,
        },
      },
      {
        key: 'setting4',
        values: ['blah blah'],
        meta: {
          wasAdded: true,
          wasRemoved: false,
          wasUpdated: false,
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
          wasAdded: true,
          wasRemoved: false,
          wasUpdated: false,
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
                  wasAdded: false,
                  wasRemoved: false,
                  wasUpdated: true,
                },
              },
            ],
            meta: {
              wasAdded: false,
              wasRemoved: false,
              wasUpdated: false,
            },
          },
          {
            key: 'key',
            values: ['value'],
            meta: {
              wasAdded: false,
              wasRemoved: false,
              wasUpdated: false,
            },
          },
          {
            key: 'ops',
            values: ['vops'],
            meta: {
              wasAdded: true,
              wasRemoved: false,
              wasUpdated: false,
            },
          },
        ],
        meta: {
          wasAdded: false,
          wasRemoved: false,
          wasUpdated: false,
        },
      },
    ],
    meta: {
      wasAdded: false,
      wasRemoved: false,
      wasUpdated: false,
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
          wasAdded: false,
          wasRemoved: false,
          wasUpdated: true,
        },
      },
      {
        key: 'foo',
        values: ['bar'],
        meta: {
          wasAdded: false,
          wasRemoved: false,
          wasUpdated: false,
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
          wasAdded: false,
          wasRemoved: false,
          wasUpdated: true,
        },
      },
    ],
    meta: {
      wasAdded: false,
      wasRemoved: false,
      wasUpdated: false,
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
      wasAdded: false,
      wasRemoved: true,
      wasUpdated: false,
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
      wasAdded: true,
      wasRemoved: false,
      wasUpdated: false,
    },
  },
];

export default diffArr;
