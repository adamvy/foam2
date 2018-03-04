MAVEN_BASE_URL=http://central.maven.org/maven2

JAVA_DEP_DIR ?= lib
JAVACFLAGS = -g

.DELETE_ON_ERROR:

empty :=
space := $(empty) $(empty)
#split <string> <separator>
split = $(subst $(2),$(space),$(1))

java_dep_version = $(word 3,$(call split,$(1),:))
java_dep_artifact = $(word 2,$(call split,$(1),:))
java_dep_group = $(word 1,$(call split,$(1),:))
java_dep_jar = $(call java_dep_artifact,$(1))-$(call java_dep_version,$(1)).jar
java_dep_sha1 = $(call java_dep_jar,$(1)).sha1
java_dep_jar_url = $(MAVEN_BASE_URL)/$(subst .,/,$(call java_dep_group,$(1)))/$(call java_dep_artifact,$(1))/$(call java_dep_version,$(1))/$(call java_dep_jar,$(1))
java_dep_sha1_url = $(MAVEN_BASE_URL)/$(subst .,/,$(call java_dep_group,$(1)))/$(call java_dep_artifact,$(1))/$(call java_dep_version,$(1))/$(call java_dep_sha1,$(1))

#foam_genjava = $(FOAM2_HOME)/bin/foam foam.build.java.Build
foam_genjava = $(NODE) $(FOAM2_HOME)/tools/genjava2.js

define JAVA_MAVEN_LIB_template
$(2)_JAVA_LIBS += $(JAVA_DEP_DIR)/$(call java_dep_jar,$(1))
$(JAVA_DEP_DIR)/$(call java_dep_jar,$(1)):
	@echo Downloading $(call java_dep_jar,$(1))
	$$(WGET) -O $(JAVA_DEP_DIR)/$(call java_dep_sha1,$(1)) $(call java_dep_sha1_url,$(1))
	$$(WGET) -O $$@ $(call java_dep_jar_url,$(1))
	@echo Verifying
	@if test "$$$$($$(SHA1SUM) $(JAVA_DEP_DIR)/$(call java_dep_jar,$(1)) | cut -d' ' -f1)" != "$$$$(cat $(JAVA_DEP_DIR)/$(call java_dep_sha1,$(1)))" ; then \
	  echo "ERROR: Download did not match sha1 checksum." ; \
	  exit 1 ; \
	fi


endef

all:

BUILD_DIR ?= build

$(BUILD_DIR):
	$(MKDIR_P) $@

define launcher_template
#!/bin/sh

DEBUG=n
SUSPEND=n
DEBUG_PORT=8000

function usage {
    echo "Usage: nanos [OPTIONS] [NANOS_OPTIONS]"
    echo ""
    echo "Options:"
    echo " -d Enable JPDA debugging"
    echo " -s When debugging is enabled, start with application suspended."
    echo " -a PORT Listen on PORT for debugger connections, default 8000"
    echo " -j JAR1:JAR2 Additional jars to add to the classpath."
    echo ""
    echo "Nanos Options:"
    # TODO: Let nanos output these itself.
    echo ""
    echo " --datadir DATADIR Look for data files in DATADIR rather than current"
    echo "   working directory."
    echo ""
}

while getopts ":da:shj:" opt; do
    case $$opt in
        d) DEBUG=y ;;
        s) SUSPEND=y ;;
        a) DEBUG_PORT=$$OPTARG ;;
        j) EXTRA_CP=":$$OPTARG" ;;
        h) usage ; exit 0 ;;
        ?) break ;;
    esac
done

DEBUG_ARGS=

if test "$$DEBUG" = y; then
    DEBUG_ARGS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=$${SUSPEND},address=$${DEBUG_PORT}"
fi

shift $$(($$OPTIND - 1))

java $$DEBUG_ARGS -cp $(1):$(2):$$EXTRA_CP foam.nanos.boot.Boot "$$@"

endef


define JAVA_JAR_template
$(1)_CLASSPATH = $$(subst $$(space),:,$$(foreach lib,$$($(1)_JAVA_LIBS),$$(abspath $$(lib))))
$(1)_CLASSPATH_TXT = $$(BUILD_DIR)/$(1).classpath.txt
$(1)_JAVA_SRCS ?= $$(shell find $$($(1)_SRC_DIR) -type f -iname '*.java')
$(1)_JS_SRCS ?= $$(shell find $$($(1)_SRC_DIR) -type f -iname '*.js')
$(1)_ALL_SRCS = $$($(1)_JAVA_SRCS) $$($(1)_JS_SRCS)
$(1)_GEN_SRC_DIR = .$(1)-gensrcs
$(1)_BUILD_DIR = .$(1)-build
$(1)_GEN_SRCS = $$(shell find $$($(1)_GEN_SRC_DIR) -type f -iname '*.java')
$(1)_JAR = $$(BUILD_DIR)/$(1).jar

.PHONY: $(1)-gensrcs $(1)-java-deps $(1)-list-deps

all: $(1)

$(1)-list-deps:
	$$(foreach dep,$$($(1)_JAVA_LIBS),$$(info $$(dep)))

$$($(1)_GEN_SRC_DIR):
	$$(MKDIR_P) $$@

$$($(1)_BUILD_DIR):
	$$(MKDIR_P) $$@

$(1)_SRC_HASH:=$$($(1)_GEN_SRC_DIR)/.srchash-$$(shell cat $$($(1)_JS_SRCS) $$($(1)_CLASSES) | $$(SHA256SUM) | cut -d" " -f1)

$$($(1)_JAR): $$($(1)_SRC_HASH)

$$($(1)_SRC_HASH): $$(FOAM2_HOME)/bin/foam | $$($(1)_GEN_SRC_DIR)
	find $$($(1)_GEN_SRC_DIR) -maxdepth 1 -type f -iname '.srchash-*' -delete
	find $$($(1)_GEN_SRC_DIR) -type f -iname '*.java' -delete
#	$$(foam_genjava) --classesFile $$($(1)_CLASSES) --targetDirectory $$($(1)_GEN_SRC_DIR)
	$$(foam_genjava) $$($(1)_CLASSES) $$($(1)_GEN_SRC_DIR) $$($(1)_SRC_DIR)
	touch $$@

clean-$(1)-gensrcs:
	-rm -rf $$($(1)_GEN_SRC_DIR)

clean-$(1):
	-rm -f $$($(1)_JAR)
	-rm -f $$($(1)_CLASSPATH_TXT)

clean: clean-$(1) clean-$(1)-gensrcs


$(1): $$($(1)_JAR) $$($(1)_CLASSPATH_TXT)
	@echo "Building launcher script..."
	$$(file >$$@,$$(call launcher_template,$$($(1)_JAR),$$($(1)_CLASSPATH)))
	chmod +x $$@

$$($(1)_CLASSPATH_TXT): $$($(1)_JAR)
	echo $$($(1)_CLASSPATH):$$(abspath $$($(1)_JAR)) > $$@

$(foreach dep,$($(1)_MAVEN_DEPS),$(call JAVA_MAVEN_LIB_template,$(dep),$(1)))

$(1)-java-deps: $$($(1)_JAVA_LIBS)

clean-$(1)-java-deps:
	-rm -f $$($(1)_JAVA_LIBS)

$$($(1)_JAR): $$($(1)_JAVA_SRCS) $$($(1)_JAVA_LIBS) | $$($(1)_BUILD_DIR) $$(BUILD_DIR)
	find $$($(1)_BUILD_DIR) -type f -iname '*.class' -delete
	@echo "Compiling..."
	@$$(JAVAC) $$(JAVACFLAGS) -d $$($(1)_BUILD_DIR) -cp $$($(1)_CLASSPATH) $$($(1)_JAVA_SRCS) $$($(1)_GEN_SRCS)
	@echo "Packaging..."
	$$(JAR) cvf $$@ -C $$($(1)_BUILD_DIR) .

.PHONY: run-$(1)

endef

$(foreach prog,$(java_JARS),$(eval $(call JAVA_JAR_template,$(prog))))
