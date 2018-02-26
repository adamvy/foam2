foam.CLASS({
  package: 'foam.build',
  name: 'File',
  ids: ['path'],
  properties: [
    {
      class: 'String',
      name: 'path'
    },
    {
      // TOOD: this should be a blob, but we don't want that
      // to be too painful to use.
      class: 'String',
      name: 'contents'
    }
  ]
});

// TODO: Drop path and use parent child relationship if we can
// make that interface reasonable.

// foam.RELATIONSHIP({
//   cardinality: '1:*',
//   sourceModel: 'File',
//   targetModel: 'File',
//   forwardName: 'children',
//   reverseName: 'parent'
// });
