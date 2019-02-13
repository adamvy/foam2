/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.nanos.auth.token',
  name: 'TokenService',

  documentation: 'System that allows the generation of tokens as well as processing of said generated tokens',

  methods: [
    {
      name: 'generateToken',
      type: 'Boolean',
      async: true,
      args: [
        {
          name: 'user',
          type: 'foam.nanos.auth.User',
        }
      ]
    },
    {
      name: 'processToken',
      type: 'Boolean',
      async: true,
      args: [
        {
          name: 'user',
          javaType: 'foam.nanos.auth.User',
          swiftType: 'User'
        },
        {
          name: 'token',
          javaType: 'String',
          swiftType: 'String'
        }
      ]
    }
  ]
});
