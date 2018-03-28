/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

foam.CLASS({
  package: 'foam.core',
  name: 'Argument',

  documentation: 'Describes one argument of a function or method.',

  properties: [
    {
      name: 'name'
    },
    {
      name: 'of'
    }
  ]
});

foam.CLASS({
  refines: 'foam.core.Method',
  properties: [
    {
      class: 'FObjectArray',
      of: 'foam.core.Argument',
      name: 'args',
      adaptArrayElement: function(e, obj) {
        var of = e.class || this.of;
        var cls = (obj.__subContext__ || foam).lookup(of);

        return cls.isInstance(e) ? e :
          foam.String.isInstance(e) ? cls.create({ name: e }) :
          cls.create(e, obj);
      }
    }
  ]
});
