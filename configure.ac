AC_INIT([foam2], [0.1])

AC_CONFIG_AUX_DIR([build-aux])

AC_PROG_INSTALL
AC_PROG_SED

m4_define([FOAM2_PROG_REQUIRED],
  [AC_PATH_PROG([$1], [$2], [no], [m4_default([$3], [$PATH])])
   AS_IF([test "x$$1" = xno], [AC_MSG_ERROR([$2 is required.])])])

AS_IF([test "x$JAVA_HOME" != x], [java_search_path=$PATH$PATH_SEPARATOR$JAVA_HOME/bin], [java_search_path=$PATH])

FOAM2_PROG_REQUIRED([JAVAC], [javac], [$java_search_path])
FOAM2_PROG_REQUIRED([JAR], [jar], [$java_search_path])
FOAM2_PROG_REQUIRED([JAVA], [java], [$java_search_path])

FOAM2_PROG_REQUIRED([BASH_REAL], [bash])
FOAM2_PROG_REQUIRED([NODEJS], [node nodejs js])
FOAM2_PROG_REQUIRED([WGET], [wget])

AC_PROG_MKDIR_P

AC_SUBST([AVAILABLE_SHA1SUM])

AC_PATH_PROG([WGET], [wget])

AS_IF([test x"$enable_BUNDLE_DEPENDENCIES" != xno],
[

  AC_CHECK_PROG([SHA1SUM], [sha1sum], [sha1sum], [no])
  AS_IF([test x"$SHA1SUM" != xno], [AVAILABLE_SHA1SUM=$SHA1SUM], [
    AC_CHECK_PROG([SHASUM], [shasum], [shasum], [no])
    AS_IF([test x"$SHASUM" != xno], [AVAILABLE_SHA1SUM=$SHASUM], [
      AC_CHECK_PROG([SHA1], [sha1], [sha1], [no])
      AS_IF([test x"$SHA1" != xno], [AVAILABLE_SHA1SUM=$SHA1], [
        AC_CHECK_PROG([OPENSSL], [openssl], [openssl], [no])
        AS_IF([test x"$OPENSSL" != xno], [AVAILABLE_SHA1SUM=$OPENSSL], [
          AC_MSG_ERROR([No means of checking sha1 checksums found, will be unable to verify deps.])
        ])
      ])
    ])
  ])
])

AC_CONFIG_FILES([
  Makefile
])

AC_OUTPUT
