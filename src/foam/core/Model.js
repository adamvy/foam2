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

/** Class/Prototype description. */
foam.CLASS({
  package: 'foam.core',
  name: 'Model',

  documentation: 'A Class Model (description).',

  axioms_: [
    {
      class: 'Property',
      name: 'id',
      hidden: true,
      transient: true,
      getter: function() {
        return this.package ? this.package + '.' + this.name : this.name;
      }
    },
    {
      class: 'Property',
      name: 'package'
    },
    {
      class: 'Property',
      name: 'abstract'
    },
    {
      class: 'Property',
      name: 'name'
    },
    {
      class: 'Property',
      name: 'axioms_',
      documentation: 'At their core, models are mostly just a collection of axioms.',
      factory: function() { return []; }
    },
    {
      class: 'Property',
      name: 'flags',
      factory: function() { return []; }
    },
    {
      class: 'Property',
      name: 'label',
      expression: function(name) { return foam.String.labelize(name); }
    },
    {
      class: 'Property',
      name: 'extends',
      value: 'FObject'
    },
    {
      class: 'Property',
      name: 'refines'
    },
    {
      class: 'Property',
      name: 'documentation',
      adapt: function(_, d) { return typeof d === 'function' ? foam.String.multiline(d).trim() : d; }
    },
    {
      class: 'Method',
      name: 'buildClass',
      code: foam.boot.buildClass
    }
  ]
});
