foam.FILES([
  "foam/core/poly",
  "foam/core/lib",
  "foam/core/stdlib",
  "foam/core/Context",
  "foam/core/cps",
  "foam/core/Boot",
  "foam/core/FObject",
  "foam/core/Model",
  "foam/core/Property",
  "foam/core/Method",
  "foam/core/Boolean",
  "foam/core/AxiomArray",
  "foam/core/EndBoot",
  "foam/core/FObjectArray",
  "foam/core/Constant",
  "foam/core/Validation",
  "foam/pattern/Faceted",
  "foam/core/types",
  "foam/core/Topic",
  "foam/core/InnerClass",
  "foam/core/InnerEnum",
  "foam/core/Implements",
  "foam/core/ImportsExports",
  "foam/core/Listener",
  "foam/core/IDSupport",
  "foam/core/Requires",
  "foam/core/Slot",
  "foam/core/Proxy",
  "foam/core/Promised",
  "foam/core/Interface",
  "foam/core/Axiom",
  "foam/core/Exception",
  "foam/core/ContextMethod",
  "foam/core/Window",
  "foam/core/Argument",
  "foam/core/MultiMethod",
  "foam/core/debug",
  "foam/pattern/Singleton",
  "foam/pattern/Multiton",
  "foam/core/Enum",
  "foam/core/JSON",
  "foam/core/XML",
  "foam/lib/csv/CSV",
  "foam/lib/csv/CSVParser",
  "foam/parse/parse",
  "foam/parse/json",
  "foam/parsers/FON",
  "foam/core/templates",
  "foam/i18n/Messages",
  "foam/core/Action",
  "foam/core/Static",
  "foam/core/Reaction",
  "foam/core/Serializable",
  "foam/java/Validation",
  "foam/i18n/TranslationFormatStringParser",
  "foam/swift/Protocol",
  "foam/swift/Argument",
  "foam/swift/ProtocolArgument",
  "foam/swift/refines/Action",
  "foam/swift/refines/InnerClass",
  "foam/swift/refines/AbstractInterface",
  "foam/swift/refines/AbstractEnum",
  "foam/swift/refines/Argument",
  "foam/swift/refines/Property",
  "foam/swift/refines/FObject",
  "foam/swift/refines/Array",
  "foam/swift/refines/FObjectArray",
  "foam/swift/refines/Import",
  "foam/swift/refines/Constant",
  "foam/swift/refines/Message",
  "foam/swift/refines/Method",
  "foam/swift/refines/Listener",
  "foam/swift/refines/Proxy",
  "foam/swift/refines/InterfaceMethod",
  "foam/swift/ProtocolMethod",
  "foam/swift/refines/Model",
  "foam/swift/refines/Requires",
  "foam/swift/refines/IntProperty",
  "foam/swift/refines/String",
  "foam/swift/SwiftJava",
  "foam/swift/Field",
  "foam/swift/Method",


  "foam/java/Argument",
  "foam/java/Class",
  "foam/java/ClassInfo",
  "foam/java/Code",
  "foam/java/CodeProperty",
  "foam/java/Field",
  "foam/java/Interface",
  "foam/java/InterfaceMethod",
  "foam/java/Method",
  "foam/java/Constant",
  "foam/java/Enum",
  "foam/java/Outputter",
  "foam/java/PropertyInfo",
  "foam/java/Skeleton",
  "foam/java/JavaImport",
  "foam/java/Builder",
  "foam/java/refinements",

  "foam/json2/Outputter",
  "foam/json2/Deserializer",
  "foam/json2/Serializer",

  "foam/util/Timer",
  "foam/log/LogLevel",
  "foam/log/Logger",
  "foam/log/ConsoleLogger",
  "foam/memento/MementoMgr",
  "foam/web/DetachedURLState",
  "foam/web/URLState",
  "lib/input",
  "foam/u2/AttrSlot",
  "foam/u2/ViewSpec",
  "foam/u2/Visibility",
  "foam/u2/RowFormatter",
//  "foam/u2/AttrSlot",
  "foam/u2/WeakMap",
  "foam/u2/Element",
  "foam/u2/MNRowFormatter",
  "foam/u2/ProgressView",
  "foam/u2/ListCreateController",
  "foam/version/VersionTrait",
  "foam/version/VersionedClass",
  "foam/version/VersionedClassFactory",
  "foam/dao/Sink",
  "foam/dao/SinkJava",
  "foam/dao/DAO",
  "foam/dao/DAOJava",
  "foam/dao/daoUtils",
  "foam/dao/DAODecorator",
  "foam/dao/AbstractDAO",
  "foam/dao/DAOProperty",
  "foam/dao/SQLStatement",
  "foam/mlang/order/Comparator",
  "foam/mlang/mlang",
  "foam/mlang/mlangJava",
  "foam/swift/refines/MLang",
  "foam/swift/refines/Predicate",
  "foam/swift/refines/AbstractDAO",
  "foam/mlang/LabeledValue",
  "foam/dao/index/Plan",
  "foam/dao/index/Index",
  "foam/dao/index/ProxyIndex",
  "foam/dao/index/AltIndex",
  "foam/dao/index/ValueIndex",
  "foam/dao/index/AATree",
  "foam/dao/index/TreeIndex",
  "foam/dao/index/AutoIndex",
  "foam/dao/MDAO",
  "foam/dao/ArrayDAO",
  "foam/dao/TimestampDAO",
  "foam/dao/AdapterDAO",
  "foam/dao/GUIDDAO",
  "foam/dao/ReadOnlyDAO",
  "foam/dao/StoreAndForwardDAO",
  "foam/dao/JDAO",
  "foam/dao/Relationship",
  "foam/dao/RelationshipDAO",
  "foam/dao/ManyToManyRelationshipDAO",
  "foam/dao/grid/ManyToManyGridRecord",
  "foam/dao/grid/ManyToManyGridDAO",
  "foam/dao/LazyCacheDAO",
  "foam/dao/CachingDAO",
  "foam/dao/DeDupDAO",
  "foam/dao/LRUDAOManager",
  "foam/dao/SequenceNumberDAO",
  "foam/dao/ContextualizingDAO",
  "foam/dao/VersionNoDAO",
  "foam/dao/sync/SyncRecord",
  "foam/dao/SyncDAO",
  "foam/dao/EasyDAO",
  "foam/dao/NoSelectAllDAO",
  "foam/dao/NullDAO",
  "foam/dao/TimingDAO",
  "foam/dao/LoggingDAO",
  "foam/dao/IDBInternalException",
  "foam/dao/IDBDAO",
  "foam/dao/BatchMutationIDBDAO",
  "foam/dao/RestDAO",
  "foam/dao/EnabledAwareDAO",
  "foam/dao/LastModifiedAwareDAO",
  "foam/dao/ValidationDAODecorator",
  "foam/dao/SQL",
  "foam/dao/NoDisjunctionDAO",
  "foam/dao/NoNeqDAO",
  "foam/parse/QueryParser",
  "foam/physics/Physical",
  "foam/physics/Collider",
  "foam/physics/PhysicsEngine",
  "foam/blob/Blob",
  "foam/blob/Blob_node",
  "foam/blob/BlobJava",
  "lib/node/json_dao",
  "lib/utf8",
  "foam/net/NotConnectedException",
  "foam/net/ConnectionFailedException",
  "foam/net/web/WebSocket",
  "foam/net/web/WebSocketService",
  // foam.net.web: No 'web' flag, because some are base classes for
  // foam.net.node.
  "foam/net/web/HTTPResponse",
  "foam/net/web/HTTPRequest",
  "foam/net/web/BaseHTTPRequest",
  "foam/net/web/EventSource",
  "foam/net/web/XMLHTTPRequest",
  "foam/net/web/XMLHTTPResponse",
  "foam/net/web/SafariEventSource",
  "foam/messageport/MessagePortService",
  "foam/net/node/Frame",
  "foam/net/node/Socket",
  "foam/net/node/SocketService",
  "foam/net/node/WebSocket",
  "foam/net/node/HTTPRequest",
  "foam/net/node/BaseHTTPRequest",
  "foam/net/node/HTTPResponse",
  "foam/net/node/WebSocketService",
  "lib/firebase",
  "lib/fcm",
  "lib/Stub",
  "lib/StubJava",
  "foam/box/Box",
  "foam/box/AnonymousBox",
  "foam/box/RemoteException",
  "foam/box/Skeleton",
  "foam/box/PromisedBox",
  "foam/box/ProxyBox",
  "foam/box/Message",
  "foam/box/SubBoxMessage",
  "foam/box/HelloMessage",
  "foam/box/TimeoutBox",
  "foam/box/RetryBox",
  "foam/box/SubBox",
  "foam/box/NameAlreadyRegisteredException",
  "foam/box/NoSuchNameException",
  "foam/box/BoxRegistry",
  "foam/box/LocalBoxRegistry",
  "foam/box/BoxRegistryBox",
  "foam/box/ClientBoxRegistry",
  "foam/box/PromisedBoxRegistry",
  "foam/box/RegistrySelector",
  "foam/box/SelectorRegistry",
  "foam/box/BroadcastRegistry",
  "foam/box/LookupBox",
  "foam/box/NamedBox",
  "foam/box/ReplyBox",
  "foam/box/FunctionBox",
  "foam/box/RPCReturnMessage",
  "foam/box/RPCErrorMessage",
  "foam/box/SubscribeMessage",
  "foam/box/RPCReturnBox",
  "foam/box/RPCMessage",
  "foam/dao/BaseClientDAO",
  "foam/dao/MergeBox",
  "foam/dao/ClientDAO",
  "foam/dao/EventlessClientDAO",
  "foam/dao/PollingClientDAO",
  "foam/dao/StreamingClientDAO",
  "foam/dao/RequestResponseClientDAO",
  "foam/box/InvalidMessageException",
  "foam/box/EventMessage",
  "foam/box/EventDispatchBox",
  "foam/box/SkeletonBox",
  "foam/box/NullBox",
  "foam/box/SocketBox",
  "foam/box/SocketBox2",
  "foam/box/SocketConnectBox",
  "foam/box/RawSocketBox",
  "foam/box/SendFailedError",
  "foam/box/RegisterSelfMessage",
  "foam/box/RawWebSocketBox",
  "foam/box/ReturnBox",
  "foam/box/RawMessagePortBox",
  "foam/box/WebSocketBox",
  "foam/box/ClassWhitelistContext",
  "foam/box/LoggedLookupContext",
  "foam/box/Context",
  "foam/box/BoxContext",
  "foam/box/BoxService",
  "foam/box/HTTPReplyBox",
  "foam/box/AuthenticatedBox",
  "foam/box/CheckAuthenticationBox",
  "foam/box/HTTPBox",
  "foam/box/MessagePortBox",
  "foam/box/ForwardedMessage",
  "foam/box/ForwardBox",
  "foam/box/ForwardingBox",
  "foam/box/Remote",
  "foam/box/SessionClientBox",
  "lib/boxJava",

  "foam/swift/refines/Stub",
  "foam/swift/refines/Promised",
  "foam/swift/refines/Topic",
  "foam/swift/refines/Box",
  "foam/swift/refines/Remote",

  "foam/box/Runnable",
  "foam/box/LogBox",
  "foam/box/MultiDelegateBox",
  "foam/box/BroadcastBox",
  "foam/box/RoundRobinBox",
  "foam/box/pipeline/RunnableRPCBox",
  "foam/box/pipeline/PipelineNode",
  "foam/box/pipeline/PipelineManager",
  "foam/box/pipeline/PipelineBuilder",
  "foam/core/async",
  "foam/dao/ClientSink",
  "foam/u2/ViewFactory",
  "foam/u2/daos",
  "foam/u2/TableView",
  "foam/u2/TableSelection",
  "foam/u2/Scroller",
  "foam/u2/ActionView",
  "foam/u2/UnstyledActionView",
  "foam/u2/DetailPropertyView",
  "foam/u2/DetailView",
  "foam/u2/tag/Image",
  "foam/u2/tag/Input",
  "foam/u2/tag/TextArea",
  "foam/u2/TextField",
  "foam/u2/IntView",
  "foam/u2/FloatView",
  "foam/u2/CurrencyView",
  "foam/u2/CheckBox",
  "foam/u2/md/CheckBox",
  "foam/u2/CitationView",
  "foam/u2/PopupView",
  "foam/u2/DateView",
  "foam/u2/DateTimeView",
  "foam/u2/RangeView",
  "foam/u2/ReadWriteView",
  "foam/u2/HTMLElement",
  "foam/u2/tag/Select",
  "foam/u2/Tabs",
  "foam/u2/TimeView",
  "foam/u2/history/HistoryItemView",
  "foam/u2/history/HistoryView",
  "foam/u2/view/FObjectView",
  "foam/u2/view/FObjectArrayView",
  "foam/u2/view/ChoiceView",
  "foam/u2/view/RadioView",
  "foam/u2/view/TextField",
  "foam/u2/view/TreeView",
  "foam/u2/view/AltView",
  "foam/u2/view/DualView",
  "foam/u2/view/ColorPicker",
  "foam/u2/view/PasswordView",
  "foam/u2/view/ChipView",
  "foam/u2/view/TableView",
  "foam/u2/view/EditColumnsView",
  "foam/u2/md/OverlayDropdown",
  "foam/u2/view/ScrollTableView",
  "foam/u2/view/ScrollDAOView",
  "foam/u2/view/BlobView",
  "foam/u2/view/FileView",
  "foam/u2/view/ImageBlobView",
  "foam/u2/view/StringArrayView",
  "foam/u2/view/ImageView",
  "foam/u2/EnumView",
  "foam/u2/ClassView",
  "foam/u2/view/ReferenceView",
  "foam/u2/tag/Card",
  "foam/u2/dialog/Popup",
  "foam/u2/dialog/NotificationMessage",
  "foam/u2/Autocompleter",
  "foam/u2/search/FilterController",
  "foam/u2/search/GroupCompleter",
  "foam/u2/search/GroupAutocompleteSearchView",
  "foam/u2/search/GroupBySearchView",
  "foam/u2/search/SearchManager",
  "foam/u2/search/TextSearchView",
  "foam/u2/stack/Stack",
  "foam/u2/stack/StackView",
  "foam/u2/FoamTagLoader",
  "foam/graphics/CView",
  "foam/graphics/ScrollCView",
  "foam/physics/PhysicalCircle",
  "foam/comics/DAOController",
  "foam/comics/DAOControllerView",
  "foam/comics/InlineDAOControllerView",
  "foam/comics/DAOCreateController",
  "foam/comics/DAOCreateControllerView",
  "foam/comics/DAOUpdateController",
  "foam/comics/DAOUpdateControllerView",
  "foam/comics/BrowserView",
  "foam/comics/InlineBrowserView",
  "foam/comics/RelationshipView",
  "foam/u2/view/ReciprocalSearch",
  "lib/node/box",
  "foam/box/node/ForkBox",
  "foam/net/HTTPMethod",
  "lib/net",
  "foam/net/RetryHTTPRequest",
  "foam/net/auth/TokenBearerCredential",
  "foam/net/auth/AuthAwareHTTPRequest",
  "foam/net/auth/TokenBearerHTTPRequest",
  "foam/net/auth/AuthAgent",
  "foam/doc/DocBrowser",
  "foam/doc/ModelBrowser",
  "com/google/net/node/Google2LOAuthAgent",
  "com/google/cloud/datastore/types",
  "com/google/cloud/datastore/mlang",
  "com/google/cloud/datastore/DatastoreDAO",
  "com/google/cloud/datastore/BatchMutationDatastoreDAO",
  "com/google/firebase/DefaultFirestoreDocumentID",
  "com/google/firebase/DefaultFirestoreData",
  "com/google/firebase/DefaultFObject",
  "com/google/firebase/AwaitAuthenticationDAO",
  "com/google/firebase/FirestoreDAO",
  "foam/net/node/EntityEncoding",
  "foam/net/node/Route",
  "foam/net/node/PathnamePrefixRoute",
  "foam/net/node/PathnameRoute",
  "foam/net/node/Handler",
  "foam/net/node/RouteBinding",
  "foam/net/node/Router",
  "foam/net/node/BaseHandler",
  "foam/net/node/ErrorHandler",
  "foam/net/node/PathnamePrefixHandler",
  "foam/net/node/PathnameHandler",
  "foam/net/node/SimpleRouter",
  "foam/net/node/PathnameRouter",
  "foam/net/node/RequestIdentifier",
  "foam/net/node/CacheHandler",
  "foam/net/node/FileHandler",
  "foam/net/node/DirTreeHandler",
  "foam/net/node/RestDAOHandler",
  "foam/net/node/ServerRequest",
  "foam/net/node/ServerResponse",
  "foam/net/node/SimpleServerResponse",
  "foam/net/node/CachedResponse",
  "foam/net/node/CachingResponse",
  "foam/net/node/Server",
  "foam/parsers/html/lib",
  "foam/parsers/html/Attribute",
  "foam/parsers/html/TagType",
  "foam/parsers/html/Tag",
  "foam/parsers/html/HTMLLexer",
  "foam/core/ContextAware",
  "foam/dao/history/PropertyUpdate",
  "foam/dao/history/HistoryRecord",
  "foam/mop/MOP",
  "foam/mop/MOPJava",
  "foam/dao/pg/ConnectionPool",
  "foam/lib/json/OutputterMode",
  "foam/lib/parse/Parser",
  "foam/lib/parse/PStream",
  "foam/crypto/hash/Hasher",
  "foam/crypto/hash/Hashable",
  "foam/crypto/sign/Signer",
  "foam/crypto/sign/Signable",
  "foam/crypto/sign/SignedFObject",
  "foam/build/java/Build"
]);
