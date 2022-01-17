import { readFileSync } from 'fs';
// import path from 'path';
import _ from 'lodash';

/**
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Array}
 */
const compareObjects = (obj1, obj2) => {
  const mergedData = { ...obj2, ...obj1 };
  const diffArr = Object.entries(mergedData)
    .map((el) => {
      const diffResult = {
        data: el,
        removed: false,
        added: false,
        changed: false,
      };

      const [key, value] = el;

      if (!_.has(obj2, key)) {
        diffResult.removed = true;
      }

      if (!_.has(obj1, key)) {
        diffResult.added = true;
      }

      if (_.has(obj2, key) && obj2[key] !== value) {
        diffResult.changed = true;
        diffResult.newData = { key: obj2[key] };
      }

      return diffResult;
    });
  // console.log(obj1);
  // console.log(typeof obj2);
  console.log(diffArr);
  return diffArr;
};

// compareFiles(readFileSync(new URL('./fixtures/file1.json', import.meta.url)),
// readFileSync(new URL('./fixtures/file2.json', import.meta.url)));

// const file1 = readFileSync('../fixtures/file2.json');
// console.log(import.meta.url);
// const filepath1 = `${process.cwd()}/fixtures/file1.json`;
// const filepath2 = `${process.cwd()}/fixtures/file2.json`;
const filepath1 = './src/fixtures/file1.json';
const filepath2 = './src/fixtures/file2.json';
// const filepath1 = path.join
compareObjects(JSON.parse(readFileSync(filepath1, 'utf8')), JSON.parse(readFileSync(filepath2, 'utf8')));

// console.log(path.resolve());
// console.log(process.cwd());
// export default compareObjects;
