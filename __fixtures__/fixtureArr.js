const diffArr = [
  {
    key: 'common',
    values: [],
    children: [
      {
        key: 'follow',
        values: [
          false,
        ],
        type: 'added',
      },
      {
        key: 'setting1',
        values: [
          'Value 1',
        ],
        type: '',
      },
      {
        key: 'setting2',
        values: [
          200,
        ],
        type: 'removed',
      },
      {
        key: 'setting3',
        values: [
          true,
          null,
        ],
        type: 'updated',
      },
      {
        key: 'setting4',
        values: [
          'blah blah',
        ],
        type: 'added',
      },
      {
        key: 'setting5',
        values: [
          {
            key5: 'value5',
          },
        ],
        type: 'added',
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
                values: [
                  '',
                  'so much',
                ],
                type: 'updated',
              },
            ],
            type: '',
          },
          {
            key: 'key',
            values: [
              'value',
            ],
            type: '',
          },
          {
            key: 'ops',
            values: [
              'vops',
            ],
            type: 'added',
          },
        ],
        type: '',
      },
    ],
    type: '',
  },
  {
    key: 'group1',
    values: [],
    children: [
      {
        key: 'baz',
        values: [
          'bas',
          'bars',
        ],
        type: 'updated',
      },
      {
        key: 'foo',
        values: [
          'bar',
        ],
        type: '',
      },
      {
        key: 'nest',
        values: [
          {
            key: 'value',
          },
          'str',
        ],
        type: 'updated',
      },
    ],
    type: '',
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
    type: 'removed',
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
    type: 'added',
  },
];

export default diffArr;
