foam.CLASS({
  package: 'foam.java',
  name: 'Util',
  static: [
    function toJavaType(type) {
      switch (type) {
      case 'Context': return 'foam.core.X';
      case 'Integer': return 'int';
      case 'Long': return 'long';
      case 'Void': return 'void';
      case 'Any': return 'Object';
      case 'FObject': return 'foam.core.FObject';
      }
      return type;
    }
  ]
});

// TODO: WTF?
foam.java.Util;
