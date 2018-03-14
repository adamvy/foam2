AC_INIT([foam2], [0.1])

AC_PROG_INSTALL
AC_PROG_SED

AC_PATH_PROG([JAVAC], [javac])
AC_PATH_PROG([JAR], [jar])
AC_PATH_PROG([JAVA], [java])
AC_PATH_PROG([BASH_REAL], [bash])
AC_PATH_PROG([NODE], [node])
AC_PATH_PROG([WGET], [wget])
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
