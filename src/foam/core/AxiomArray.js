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
  name: 'AxiomArray',
  extends: 'Property',

  documentation: 'An Array of Axioms (used by Model).',

  axioms_: [
    {
      class: 'Property',
      name: 'of',
      required: true
    },
    {
      class: 'Property',
      name: 'adapt',
      value: function(_, a, prop) {
        if ( ! Array.isArray(a) ) return a;

        var copy;
        for ( var i = 0 ; i < a.length ; i++ ) {
          var b = prop.adaptArrayElement.call(this, a[i], prop);
          if ( b !== a[i] ) {
            if ( ! copy ) copy = a.slice();
            copy[i] = b;
          }
        }

        return copy || a;
      }
    },
    {
      class: 'Property',
      name: 'assertValue',
      value: function(v, prop) {
        foam.assert(Array.isArray(v),
            'Tried to set', prop.name, 'to non array value');

        var of = this.lookup(prop.of, true);
        foam.assert(
            of,
            'Unknown "of" Model in AxiomArray: property=',
            prop.name,
            ' of=',
            prop.of);
        for ( var i = 0 ; i < v.length ; i++ ) {
          foam.assert(of.isInstance(v[i]),
              'Element', i, 'of', prop.name, 'is not an instance of',
              prop.of);
        }
      }
    },
    {
      class: 'Property',
      name: 'adaptArrayElement',
      value: function(a, prop) {
        var of = this.lookup(prop.of);
        return of.isInstance(a) ? a : of.create(a, this);
      }
    },
    {
      class: 'Property',
      name: 'setter',
      value: function(value, prop) {
        var of = foam.lookup(prop.of);

        value = prop.adapt.call(this, null, value, prop);

        prop.assertValue.call(this, value, prop);

        this.axioms_ = this.axioms_.filter(function(a) { return ! of.isInstance(a); }).concat(value);

        return value;
      }
    },
    {
      class: 'Property',
      name: 'getter',
      value: function(prop) {
        var of = foam.lookup(prop.of);
        return this.axioms_.filter(function(a) { return of.isInstance(a); });
      }
    }
  ]
});
