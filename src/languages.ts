import { Language, LanguageSupport, StreamLanguage } from "@codemirror/language";

import { cpp } from "@codemirror/lang-cpp";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { sql, MariaSQL, Cassandra, MSSQL, MySQL, PostgreSQL, PLSQL, StandardSQL, SQLite } from "@codemirror/lang-sql";
import { wast } from "@codemirror/lang-wast";
import { xml } from "@codemirror/lang-xml";

import { apl } from "@codemirror/legacy-modes/mode/apl";
import { asciiArmor } from "@codemirror/legacy-modes/mode/asciiarmor";
import { asn1 } from "@codemirror/legacy-modes/mode/asn1";
import { asterisk } from "@codemirror/legacy-modes/mode/asterisk";
import { brainfuck } from "@codemirror/legacy-modes/mode/brainfuck";
import {
  c,
  csharp,
  dart,
  kotlin,
  objectiveC,
  objectiveCpp,
  scala,
  squirrel,
} from "@codemirror/legacy-modes/mode/clike";
import { clojure } from "@codemirror/legacy-modes/mode/clojure";
import { cmake } from "@codemirror/legacy-modes/mode/cmake";
import { cobol } from "@codemirror/legacy-modes/mode/cobol";
import { coffeeScript } from "@codemirror/legacy-modes/mode/coffeescript";
import { commonLisp } from "@codemirror/legacy-modes/mode/commonlisp";
import { crystal } from "@codemirror/legacy-modes/mode/crystal";
import { cypher } from "@codemirror/legacy-modes/mode/cypher";
import { d } from "@codemirror/legacy-modes/mode/d";
import { diff } from "@codemirror/legacy-modes/mode/diff";
import { dockerFile } from "@codemirror/legacy-modes/mode/dockerfile";
import { dtd } from "@codemirror/legacy-modes/mode/dtd";
import { dylan } from "@codemirror/legacy-modes/mode/dylan";
import { ebnf } from "@codemirror/legacy-modes/mode/ebnf";
import { ecl } from "@codemirror/legacy-modes/mode/ecl";
import { eiffel } from "@codemirror/legacy-modes/mode/eiffel";
import { elm } from "@codemirror/legacy-modes/mode/elm";
import { erlang } from "@codemirror/legacy-modes/mode/erlang";
import { factor } from "@codemirror/legacy-modes/mode/factor";
import { fcl } from "@codemirror/legacy-modes/mode/fcl";
import { forth } from "@codemirror/legacy-modes/mode/forth";
import { fortran } from "@codemirror/legacy-modes/mode/fortran";
import { fSharp, oCaml, sml } from "@codemirror/legacy-modes/mode/mllike";
import { gas } from "@codemirror/legacy-modes/mode/gas";
import { gherkin } from "@codemirror/legacy-modes/mode/gherkin";
import { go } from "@codemirror/legacy-modes/mode/go";
import { groovy } from "@codemirror/legacy-modes/mode/groovy";
import { haskell } from "@codemirror/legacy-modes/mode/haskell";
import { haxe } from "@codemirror/legacy-modes/mode/haxe";
import { http } from "@codemirror/legacy-modes/mode/http";
import { idl } from "@codemirror/legacy-modes/mode/idl";
import { jinja2 } from "@codemirror/legacy-modes/mode/jinja2";
import { jsonld } from "@codemirror/legacy-modes/mode/javascript";
import { julia } from "@codemirror/legacy-modes/mode/julia";
import { esper } from "@codemirror/legacy-modes/mode/sql";
import { less, sCSS } from "@codemirror/legacy-modes/mode/css";
import { liveScript } from "@codemirror/legacy-modes/mode/livescript";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import { mathematica } from "@codemirror/legacy-modes/mode/mathematica";
import { mbox } from "@codemirror/legacy-modes/mode/mbox";
import { mirc } from "@codemirror/legacy-modes/mode/mirc";
import { modelica } from "@codemirror/legacy-modes/mode/modelica";
import { mscgen, msgenny, xu } from "@codemirror/legacy-modes/mode/mscgen";
import { mumps } from "@codemirror/legacy-modes/mode/mumps";
import { nginx } from "@codemirror/legacy-modes/mode/nginx";
import { nsis } from "@codemirror/legacy-modes/mode/nsis";
import { ntriples } from "@codemirror/legacy-modes/mode/ntriples";
import { octave } from "@codemirror/legacy-modes/mode/octave";
import { oz } from "@codemirror/legacy-modes/mode/oz";
import { pascal } from "@codemirror/legacy-modes/mode/pascal";
import { pegjs } from "@codemirror/legacy-modes/mode/pegjs";
import { perl } from "@codemirror/legacy-modes/mode/perl";
import { pig } from "@codemirror/legacy-modes/mode/pig";
import { powerShell } from "@codemirror/legacy-modes/mode/powershell";
import { properties } from "@codemirror/legacy-modes/mode/properties";
import { protobuf } from "@codemirror/legacy-modes/mode/protobuf";
import { puppet } from "@codemirror/legacy-modes/mode/puppet";
import { q } from "@codemirror/legacy-modes/mode/q";
import { r } from "@codemirror/legacy-modes/mode/r";
import { rpmChanges, rpmSpec } from "@codemirror/legacy-modes/mode/rpm";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { sas } from "@codemirror/legacy-modes/mode/sas";
import { sass } from "@codemirror/legacy-modes/mode/sass";
import { scheme } from "@codemirror/legacy-modes/mode/scheme";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { sieve } from "@codemirror/legacy-modes/mode/sieve";
import { smalltalk } from "@codemirror/legacy-modes/mode/smalltalk";
import { solr } from "@codemirror/legacy-modes/mode/solr";
import { sparql } from "@codemirror/legacy-modes/mode/sparql";
import { spreadsheet } from "@codemirror/legacy-modes/mode/spreadsheet";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import { stylus } from "@codemirror/legacy-modes/mode/stylus";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { tcl } from "@codemirror/legacy-modes/mode/tcl";
import { textile } from "@codemirror/legacy-modes/mode/textile";
import { tiddlyWiki } from "@codemirror/legacy-modes/mode/tiddlywiki";
import { tiki } from "@codemirror/legacy-modes/mode/tiki";
import { toml } from "@codemirror/legacy-modes/mode/toml";
import { troff } from "@codemirror/legacy-modes/mode/troff";
import { ttcn } from "@codemirror/legacy-modes/mode/ttcn";
import { ttcnCfg } from "@codemirror/legacy-modes/mode/ttcn-cfg";
import { turtle } from "@codemirror/legacy-modes/mode/turtle";
import { vb } from "@codemirror/legacy-modes/mode/vb";
import { vbScript, vbScriptASP } from "@codemirror/legacy-modes/mode/vbscript";
import { velocity } from "@codemirror/legacy-modes/mode/velocity";
import { verilog } from "@codemirror/legacy-modes/mode/verilog";
import { vhdl } from "@codemirror/legacy-modes/mode/vhdl";
import { webIDL } from "@codemirror/legacy-modes/mode/webidl";
import { xQuery } from "@codemirror/legacy-modes/mode/xquery";
import { yacas } from "@codemirror/legacy-modes/mode/yacas";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";
import { z80 } from "@codemirror/legacy-modes/mode/z80";

export interface LanguageData {
  name: string;
  mode: LanguageSupport | Language | null;
  mimeTypes: string[];
  extensions?: string[];
  aliases?: string[];
  file?: RegExp;
}

export const languages: LanguageData[] = [
  {
    name: "APL",
    mimeTypes: ["text/apl"],
    mode: StreamLanguage.define(apl),
    extensions: ["dyalog", "apl"],
  },
  {
    name: "ASN.1",
    mimeTypes: ["text/x-ttcn-asn"],
    mode: StreamLanguage.define(asn1({})),
    extensions: ["asn", "asn1"],
  },
  {
    name: "ASP.NET",
    mimeTypes: ["application/x-aspx"],
    mode: StreamLanguage.define(vbScriptASP),
    extensions: ["aspx"],
    aliases: ["asp", "aspx"],
  },
  {
    name: "Asterisk",
    mimeTypes: ["text/x-asterisk"],
    mode: StreamLanguage.define(asterisk),
    file: /^extensions\.conf$/i,
  },
  {
    name: "Brainfuck",
    mimeTypes: ["text/x-brainfuck"],
    mode: StreamLanguage.define(brainfuck),
    extensions: ["b", "bf"],
  },
  {
    name: "C",
    mimeTypes: ["text/x-csrc"],
    mode: StreamLanguage.define(c),
    extensions: ["c", "h", "ino"],
  },
  {
    name: "C#",
    mimeTypes: ["text/x-csharp"],
    mode: StreamLanguage.define(csharp),
    extensions: ["cs"],
    aliases: ["csharp", "cs"],
  },
  {
    name: "C++",
    mimeTypes: ["text/x-c++src"],
    mode: cpp(),
    extensions: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"],
    aliases: ["cpp"],
  },
  {
    name: "Clojure",
    mimeTypes: ["text/x-clojure"],
    mode: StreamLanguage.define(clojure),
    extensions: ["clj", "cljc", "cljx"],
  },
  {
    name: "ClojureScript",
    mimeTypes: ["text/x-clojurescript"],
    mode: StreamLanguage.define(clojure),
    extensions: ["cljs"],
  },
  // {
  //   name: "Closure Stylesheets (GSS)",
  //   mimeTypes: ["text/x-gss"],
  //   extensions: ["gss"],
  // },
  {
    name: "CMake",
    mimeTypes: ["text/x-cmake"],
    mode: StreamLanguage.define(cmake),
    extensions: ["cmake", "cmake.in"],
    file: /^CMakeLists\.txt$/,
  },
  {
    name: "Cobol",
    mimeTypes: ["text/x-cobol"],
    mode: StreamLanguage.define(cobol),
    extensions: ["cob", "cpy", "cbl"],
  },
  {
    name: "CoffeeScript",
    mimeTypes: ["application/vnd.coffeescript", "text/coffeescript", "text/x-coffeescript"],
    mode: StreamLanguage.define(coffeeScript),
    extensions: ["coffee"],
    aliases: ["coffee", "coffee-script"],
  },
  {
    name: "Common Lisp",
    mimeTypes: ["text/x-common-lisp"],
    mode: StreamLanguage.define(commonLisp),
    extensions: ["cl", "lisp", "el"],
    aliases: ["lisp"],
  },
  {
    name: "CQL",
    mimeTypes: ["text/x-cassandra"],
    mode: sql({ dialect: Cassandra }),
    extensions: ["cql"],
  },
  {
    name: "Crystal",
    mimeTypes: ["text/x-crystal"],
    mode: StreamLanguage.define(crystal),
    extensions: ["cr"],
  },
  {
    name: "CSS",
    mimeTypes: ["text/css"],
    mode: css(),
    extensions: ["css"],
  },
  {
    name: "Cypher",
    mimeTypes: ["application/x-cypher-query"],
    mode: StreamLanguage.define(cypher),
    extensions: ["cyp", "cypher"],
  },
  {
    name: "Cython",
    mimeTypes: ["text/x-cython"],
    mode: python(),
    extensions: ["pyx", "pxd", "pxi"],
  },
  {
    name: "D",
    mimeTypes: ["text/x-d"],
    mode: StreamLanguage.define(d),
    extensions: ["d"],
  },
  {
    name: "Dart",
    mimeTypes: ["application/dart", "text/x-dart"],
    mode: StreamLanguage.define(dart),
    extensions: ["dart"],
  },
  {
    name: "diff",
    mimeTypes: ["text/x-diff"],
    mode: StreamLanguage.define(diff),
    extensions: ["diff", "patch"],
  },
  // {
  //   name: "Django",
  //   mimeTypes: ["text/x-django"],
  // },
  {
    name: "Dockerfile",
    mimeTypes: ["text/x-dockerfile"],
    mode: StreamLanguage.define(dockerFile),
    file: /^Dockerfile$/,
  },
  {
    name: "DTD",
    mimeTypes: ["application/xml-dtd"],
    mode: StreamLanguage.define(dtd),
    extensions: ["dtd"],
  },
  {
    name: "Dylan",
    mimeTypes: ["text/x-dylan"],
    mode: StreamLanguage.define(dylan),
    extensions: ["dylan", "dyl", "intr"],
  },
  {
    name: "EBNF",
    mimeTypes: ["text/x-ebnf"],
    mode: StreamLanguage.define(ebnf),
  },
  {
    name: "ECL",
    mimeTypes: ["text/x-ecl"],
    mode: StreamLanguage.define(ecl),
    extensions: ["ecl"],
  },
  // {
  //   name: "edn",
  //   mimeTypes: ["application/edn"],
  //   extensions: ["edn"],
  // },
  {
    name: "Eiffel",
    mimeTypes: ["text/x-eiffel"],
    mode: StreamLanguage.define(eiffel),
    extensions: ["e"],
  },
  {
    name: "Elm",
    mimeTypes: ["text/x-elm"],
    mode: StreamLanguage.define(elm),
    extensions: ["elm"],
  },
  // {
  //   name: "Embedded JavaScript",
  //   mimeTypes: ["application/x-ejs"],
  //   extensions: ["ejs"],
  // },
  // {
  //   name: "Embedded Ruby",
  //   mimeTypes: ["application/x-erb"],
  //   extensions: ["erb"],
  // },
  {
    name: "Erlang",
    mimeTypes: ["text/x-erlang"],
    mode: StreamLanguage.define(erlang),
    extensions: ["erl"],
  },
  {
    name: "Esper",
    mimeTypes: ["text/x-esper"],
    mode: StreamLanguage.define(esper),
  },
  {
    name: "F#",
    mimeTypes: ["text/x-fsharp"],
    mode: StreamLanguage.define(fSharp),
    extensions: ["fs"],
    aliases: ["fsharp"],
  },
  {
    name: "Factor",
    mimeTypes: ["text/x-factor"],
    mode: StreamLanguage.define(factor),
    extensions: ["factor"],
  },
  {
    name: "FCL",
    mimeTypes: ["text/x-fcl"],
    mode: StreamLanguage.define(fcl),
  },
  {
    name: "Forth",
    mimeTypes: ["text/x-forth"],
    mode: StreamLanguage.define(forth),
    extensions: ["forth", "fth", "4th"],
  },
  {
    name: "Fortran",
    mimeTypes: ["text/x-fortran"],
    mode: StreamLanguage.define(fortran),
    extensions: ["f", "for", "f77", "f90", "f95"],
  },
  {
    name: "Gas",
    mimeTypes: ["text/x-gas"],
    mode: StreamLanguage.define(gas),
    extensions: ["s"],
  },
  {
    name: "Gherkin",
    mimeTypes: ["text/x-feature"],
    mode: StreamLanguage.define(gherkin),
    extensions: ["feature"],
  },
  {
    name: "GitHub Flavored Markdown",
    mimeTypes: ["text/x-gfm"],
    mode: markdown({ base: markdownLanguage }),
    file: /^(readme|contributing|history)\.md$/i,
  },
  {
    name: "Go",
    mimeTypes: ["text/x-go"],
    mode: StreamLanguage.define(go),
    extensions: ["go"],
  },
  {
    name: "Groovy",
    mimeTypes: ["text/x-groovy"],
    mode: StreamLanguage.define(groovy),
    extensions: ["groovy", "gradle"],
    file: /^Jenkinsfile$/,
  },
  // {
  //   name: "HAML",
  //   mimeTypes: ["text/x-haml"],
  //   extensions: ["haml"],
  // },
  {
    name: "Haskell (Literate)",
    mimeTypes: ["text/x-literate-haskell"],
    mode: StreamLanguage.define(haskell),
    extensions: ["lhs"],
  },
  {
    name: "Haskell",
    mimeTypes: ["text/x-haskell"],
    mode: StreamLanguage.define(haskell),
    extensions: ["hs"],
  },
  {
    name: "Haxe",
    mimeTypes: ["text/x-haxe"],
    mode: StreamLanguage.define(haxe),
    extensions: ["hx"],
  },
  {
    name: "HTML",
    mimeTypes: ["text/html"],
    mode: html(),
    extensions: ["html", "htm", "handlebars", "hbs"],
    aliases: ["xhtml"],
  },
  {
    name: "HTTP",
    mimeTypes: ["message/http"],
    mode: StreamLanguage.define(http),
  },
  {
    name: "HXML",
    mimeTypes: ["text/x-hxml"],
    mode: StreamLanguage.define(haxe),
    extensions: ["hxml"],
  },
  {
    name: "IDL",
    mimeTypes: ["text/x-idl"],
    mode: StreamLanguage.define(idl),
    extensions: ["pro"],
  },
  // {
  //   name: "Java Server Pages",
  //   mimeTypes: ["application/x-jsp"],
  //   extensions: ["jsp"],
  //   aliases: ["jsp"],
  // },
  {
    name: "Java",
    mimeTypes: ["text/x-java"],
    mode: java(),
    extensions: ["java"],
  },
  {
    name: "JavaScript",
    mimeTypes: [
      "text/javascript",
      "text/ecmascript",
      "application/javascript",
      "application/x-javascript",
      "application/ecmascript",
    ],
    mode: javascript(),
    extensions: ["js"],
    aliases: ["ecmascript", "js", "node"],
  },
  {
    name: "Jinja2",
    mimeTypes: ["text/jinja2"],
    mode: StreamLanguage.define(jinja2),
    extensions: ["j2", "jinja", "jinja2"],
  },
  {
    name: "JSON-LD",
    mimeTypes: ["application/ld+json"],
    mode: StreamLanguage.define(jsonld),
    extensions: ["jsonld"],
    aliases: ["jsonld"],
  },
  {
    name: "JSON",
    mimeTypes: ["application/json", "application/x-json"],
    mode: json(),
    extensions: ["json", "map"],
    aliases: ["json5"],
  },
  {
    name: "JSX",
    mimeTypes: ["text/jsx"],
    mode: javascript({ jsx: true }),
    extensions: ["jsx"],
  },
  {
    name: "Julia",
    mimeTypes: ["text/x-julia"],
    mode: StreamLanguage.define(julia),
    extensions: ["jl"],
    aliases: ["jl"],
  },
  {
    name: "Kotlin",
    mimeTypes: ["text/x-kotlin"],
    mode: StreamLanguage.define(kotlin),
    extensions: ["kt"],
  },
  {
    name: "LaTeX",
    mimeTypes: ["text/x-latex"],
    mode: StreamLanguage.define(stex),
    extensions: ["text", "ltx", "tex"],
    aliases: ["tex"],
  },
  {
    name: "LESS",
    mimeTypes: ["text/x-less"],
    mode: StreamLanguage.define(less),
    extensions: ["less"],
  },
  {
    name: "LiveScript",
    mimeTypes: ["text/x-livescript"],
    mode: StreamLanguage.define(liveScript),
    extensions: ["ls"],
    aliases: ["ls"],
  },
  {
    name: "Lua",
    mimeTypes: ["text/x-lua"],
    mode: StreamLanguage.define(lua),
    extensions: ["lua"],
  },
  {
    name: "MariaDB SQL",
    mimeTypes: ["text/x-mariadb"],
    mode: sql({ dialect: MariaSQL }),
  },
  {
    name: "Markdown",
    mimeTypes: ["text/x-markdown"],
    mode: markdown(),
    extensions: ["markdown", "md", "mkd"],
  },
  {
    name: "Mathematica",
    mimeTypes: ["text/x-mathematica"],
    mode: StreamLanguage.define(mathematica),
    extensions: ["m", "nb", "wl", "wls"],
  },
  {
    name: "mbox",
    mimeTypes: ["application/mbox"],
    mode: StreamLanguage.define(mbox),
    extensions: ["mbox"],
  },
  {
    name: "mIRC",
    mimeTypes: ["text/mirc"],
    mode: StreamLanguage.define(mirc),
  },
  {
    name: "Modelica",
    mimeTypes: ["text/x-modelica"],
    mode: StreamLanguage.define(modelica),
    extensions: ["mo"],
  },
  {
    name: "MS SQL",
    mimeTypes: ["text/x-mssql"],
    mode: sql({ dialect: MSSQL }),
  },
  {
    name: "mscgen",
    mimeTypes: ["text/x-mscgen"],
    mode: StreamLanguage.define(mscgen),
    extensions: ["mscgen", "mscin", "msc"],
  },
  {
    name: "msgenny",
    mimeTypes: ["text/x-msgenny"],
    mode: StreamLanguage.define(msgenny),
    extensions: ["msgenny"],
  },
  {
    name: "MUMPS",
    mimeTypes: ["text/x-mumps"],
    mode: StreamLanguage.define(mumps),
    extensions: ["mps"],
  },
  {
    name: "MySQL",
    mimeTypes: ["text/x-mysql"],
    mode: sql({ dialect: MySQL }),
  },
  {
    name: "Nginx",
    mimeTypes: ["text/x-nginx-conf"],
    mode: StreamLanguage.define(nginx),
    file: /nginx.*\.conf$/i,
  },
  {
    name: "NSIS",
    mimeTypes: ["text/x-nsis"],
    mode: StreamLanguage.define(nsis),
    extensions: ["nsh", "nsi"],
  },
  {
    name: "NTriples",
    mimeTypes: ["application/n-triples", "application/n-quads", "text/n-triples"],
    mode: StreamLanguage.define(ntriples),
    extensions: ["nt", "nq"],
  },
  {
    name: "Objective-C",
    mimeTypes: ["text/x-objectivec"],
    mode: StreamLanguage.define(objectiveC),
    extensions: ["m"],
    aliases: ["objective-c", "objc"],
  },
  {
    name: "Objective-C++",
    mimeTypes: ["text/x-objectivec++"],
    mode: StreamLanguage.define(objectiveCpp),
    extensions: ["mm"],
    aliases: ["objective-c++", "objc++"],
  },
  {
    name: "OCaml",
    mimeTypes: ["text/x-ocaml"],
    mode: StreamLanguage.define(oCaml),
    extensions: ["ml", "mli", "mll", "mly"],
  },
  {
    name: "Octave",
    mimeTypes: ["text/x-octave"],
    mode: StreamLanguage.define(octave),
    extensions: ["m"],
  },
  {
    name: "Oz",
    mimeTypes: ["text/x-oz"],
    mode: StreamLanguage.define(oz),
    extensions: ["oz"],
  },
  {
    name: "Pascal",
    mimeTypes: ["text/x-pascal"],
    mode: StreamLanguage.define(pascal),
    extensions: ["p", "pas"],
  },
  {
    name: "PEG.js",
    mimeTypes: [],
    mode: StreamLanguage.define(pegjs),
    extensions: ["jsonld"],
  },
  {
    name: "Perl",
    mimeTypes: ["text/x-perl"],
    mode: StreamLanguage.define(perl),
    extensions: ["pl", "pm"],
  },
  {
    name: "PGP",
    mimeTypes: ["application/pgp", "application/pgp-encrypted", "application/pgp-keys", "application/pgp-signature"],
    mode: StreamLanguage.define(asciiArmor),
    extensions: ["asc", "pgp", "sig"],
  },
  {
    name: "PHP",
    mimeTypes: ["text/x-php", "application/x-httpd-php", "application/x-httpd-php-open"],
    mode: php(),
    extensions: ["php", "php3", "php4", "php5", "php7", "phtml"],
  },
  {
    name: "Pig",
    mimeTypes: ["text/x-pig"],
    mode: StreamLanguage.define(pig),
    extensions: ["pig"],
  },
  {
    name: "Plain Text",
    mimeTypes: ["text/plain"],
    mode: null,
    extensions: ["txt", "text", "conf", "def", "list", "log"],
  },
  {
    name: "PLSQL",
    mimeTypes: ["text/x-plsql"],
    mode: sql({ dialect: PLSQL }),
    extensions: ["pls"],
  },
  {
    name: "PostgreSQL",
    mimeTypes: ["text/x-pgsql"],
    mode: sql({ dialect: PostgreSQL }),
  },
  {
    name: "PowerShell",
    mimeTypes: ["application/x-powershell"],
    mode: StreamLanguage.define(powerShell),
    extensions: ["ps1", "psd1", "psm1"],
  },
  {
    name: "Properties files",
    mimeTypes: ["text/x-properties"],
    mode: StreamLanguage.define(properties),
    extensions: ["properties", "ini", "in"],
    aliases: ["ini", "properties"],
  },
  {
    name: "ProtoBuf",
    mimeTypes: ["text/x-protobuf"],
    mode: StreamLanguage.define(protobuf),
    extensions: ["proto"],
  },
  // {
  //   name: "Pug",
  //   mimeTypes: ["text/x-pug"],
  //   extensions: ["jade", "pug"],
  //   aliases: ["jade"],
  // },
  {
    name: "Puppet",
    mimeTypes: ["text/x-puppet"],
    mode: StreamLanguage.define(puppet),
    extensions: ["pp"],
  },
  {
    name: "Python",
    mimeTypes: ["text/x-python"],
    mode: python(),
    extensions: ["BUILD", "bzl", "py", "pyw"],
    file: /^(BUCK|BUILD)$/,
  },
  {
    name: "Q",
    mimeTypes: ["text/x-q"],
    mode: StreamLanguage.define(q),
    extensions: ["q"],
  },
  {
    name: "R",
    mimeTypes: ["text/x-rsrc"],
    mode: StreamLanguage.define(r),
    extensions: ["r", "R"],
    aliases: ["rscript"],
  },
  // {
  //   name: "reStructuredText",
  //   mimeTypes: ["text/x-rst"],
  //   extensions: ["rst"],
  //   aliases: ["rst"],
  // },
  {
    name: "RPM Changes",
    mimeTypes: ["text/x-rpm-changes"],
    mode: StreamLanguage.define(rpmChanges),
  },
  {
    name: "RPM Spec",
    mimeTypes: ["text/x-rpm-spec"],
    mode: StreamLanguage.define(rpmSpec),
    extensions: ["spec"],
  },
  {
    name: "Ruby",
    mimeTypes: ["text/x-ruby"],
    mode: StreamLanguage.define(ruby),
    extensions: ["rb"],
    aliases: ["jruby", "macruby", "rake", "rb", "rbx"],
  },
  {
    name: "Rust",
    mimeTypes: ["text/x-rustsrc"],
    mode: rust(),
    extensions: ["rs"],
  },
  {
    name: "SAS",
    mimeTypes: ["text/x-sas"],
    mode: StreamLanguage.define(sas),
    extensions: ["sas"],
  },
  {
    name: "Sass",
    mimeTypes: ["text/x-sass"],
    mode: StreamLanguage.define(sass),
    extensions: ["sass"],
  },
  {
    name: "Scala",
    mimeTypes: ["text/x-scala"],
    mode: StreamLanguage.define(scala),
    extensions: ["scala"],
  },
  {
    name: "Scheme",
    mimeTypes: ["text/x-scheme"],
    mode: StreamLanguage.define(scheme),
    extensions: ["scm", "ss"],
  },
  {
    name: "SCSS",
    mimeTypes: ["text/x-scss"],
    mode: StreamLanguage.define(sCSS),
    extensions: ["scss"],
  },
  {
    name: "Shell",
    mimeTypes: ["text/x-sh", "application/x-sh"],
    mode: StreamLanguage.define(shell),
    extensions: ["sh", "ksh", "bash"],
    aliases: ["bash", "sh", "zsh"],
    file: /^PKGBUILD$/,
  },
  {
    name: "Sieve",
    mimeTypes: ["application/sieve"],
    mode: StreamLanguage.define(sieve),
    extensions: ["siv", "sieve"],
  },
  // {
  //   name: "Slim",
  //   mimeTypes: ["text/x-slim", "application/x-slim"],
  //   extensions: ["slim"],
  // },
  {
    name: "Smalltalk",
    mimeTypes: ["text/x-stsrc"],
    mode: StreamLanguage.define(smalltalk),
    extensions: ["st"],
  },
  // {
  //   name: "Smarty",
  //   mimeTypes: ["text/x-smarty"],
  //   extensions: ["tpl"],
  // },
  {
    name: "SML",
    mimeTypes: ["text/x-sml"],
    mode: StreamLanguage.define(sml),
    extensions: ["sml", "sig", "fun", "smackspec"],
  },
  {
    name: "Solr",
    mimeTypes: ["text/x-solr"],
    mode: StreamLanguage.define(solr),
  },
  // {
  //   name: "Soy",
  //   mimeTypes: ["text/x-soy"],
  //   extensions: ["soy"],
  //   aliases: ["closure template"],
  // },
  {
    name: "SPARQL",
    mimeTypes: ["application/sparql-query"],
    mode: StreamLanguage.define(sparql),
    extensions: ["rq", "sparql"],
    aliases: ["sparul"],
  },
  {
    name: "Spreadsheet",
    mimeTypes: ["text/x-spreadsheet"],
    mode: StreamLanguage.define(spreadsheet),
    aliases: ["excel", "formula"],
  },
  {
    name: "SQL",
    mimeTypes: ["text/x-sql"],
    mode: sql({ dialect: StandardSQL }),
    extensions: ["sql"],
  },
  {
    name: "SQLite",
    mimeTypes: ["text/x-sqlite"],
    mode: sql({ dialect: SQLite }),
  },
  {
    name: "Squirrel",
    mimeTypes: ["text/x-squirrel"],
    mode: StreamLanguage.define(squirrel),
    extensions: ["nut"],
  },
  {
    name: "sTeX",
    mimeTypes: ["text/x-stex"],
    mode: StreamLanguage.define(stex),
  },
  {
    name: "Stylus",
    mimeTypes: ["text/x-styl"],
    mode: StreamLanguage.define(stylus),
    extensions: ["styl"],
  },
  {
    name: "Swift",
    mimeTypes: ["text/x-swift"],
    mode: StreamLanguage.define(swift),
    extensions: ["swift"],
  },
  {
    name: "SystemVerilog",
    mimeTypes: ["text/x-systemverilog"],
    mode: StreamLanguage.define(verilog),
    extensions: ["v", "sv", "svh"],
  },
  {
    name: "Tcl",
    mimeTypes: ["text/x-tcl"],
    mode: StreamLanguage.define(tcl),
    extensions: ["tcl"],
  },
  {
    name: "Textile",
    mimeTypes: ["text/x-textile"],
    mode: StreamLanguage.define(textile),
    extensions: ["textile"],
  },
  {
    name: "TiddlyWiki",
    mimeTypes: ["text/x-tiddlywiki"],
    mode: StreamLanguage.define(tiddlyWiki),
  },
  {
    name: "Tiki wiki",
    mimeTypes: ["text/tiki"],
    mode: StreamLanguage.define(tiki),
  },
  {
    name: "TOML",
    mimeTypes: ["text/x-toml"],
    mode: StreamLanguage.define(toml),
    extensions: ["toml"],
  },
  // {
  //   name: "Tornado",
  //   mimeTypes: ["text/x-tornado"],
  // },
  {
    name: "troff",
    mimeTypes: ["text/troff"],
    mode: StreamLanguage.define(troff),
    extensions: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  },
  {
    name: "TTCN_CFG",
    mimeTypes: ["text/x-ttcn-cfg"],
    mode: StreamLanguage.define(ttcnCfg),
    extensions: ["cfg"],
  },
  {
    name: "TTCN",
    mimeTypes: ["text/x-ttcn"],
    mode: StreamLanguage.define(ttcn),
    extensions: ["ttcn", "ttcn3", "ttcnpp"],
  },
  {
    name: "Turtle",
    mimeTypes: ["text/turtle"],
    mode: StreamLanguage.define(turtle),
    extensions: ["ttl"],
  },
  // {
  //   name: "Twig",
  //   mimeTypes: ["text/x-twig"],
  // },
  {
    name: "TypeScript-JSX",
    mimeTypes: ["text/typescript-jsx"],
    mode: javascript({ typescript: true, jsx: true }),
    extensions: ["tsx"],
    aliases: ["tsx"],
  },
  {
    name: "TypeScript",
    mimeTypes: ["application/typescript"],
    mode: javascript({ typescript: true }),
    extensions: ["ts"],
    aliases: ["ts"],
  },
  {
    name: "VB.NET",
    mimeTypes: ["text/x-vb"],
    mode: StreamLanguage.define(vb),
    extensions: ["vb"],
  },
  {
    name: "VBScript",
    mimeTypes: ["text/vbscript"],
    mode: StreamLanguage.define(vbScript),
    extensions: ["vbs"],
  },
  {
    name: "Velocity",
    mimeTypes: ["text/velocity"],
    mode: StreamLanguage.define(velocity),
    extensions: ["vtl"],
  },
  {
    name: "Verilog",
    mimeTypes: ["text/x-verilog"],
    mode: StreamLanguage.define(verilog),
    extensions: ["v"],
  },
  {
    name: "VHDL",
    mimeTypes: ["text/x-vhdl"],
    mode: StreamLanguage.define(vhdl),
    extensions: ["vhd", "vhdl"],
  },
  // {
  //   name: "Vue.js Component",
  //   mimeTypes: ["script/x-vue", "text/x-vue"],
  //   extensions: ["vue"],
  // },
  {
    name: "Web IDL",
    mimeTypes: ["text/x-webidl"],
    mode: StreamLanguage.define(webIDL),
    extensions: ["webidl"],
  },
  {
    name: "WebAssembly",
    mimeTypes: ["text/webassembly"],
    mode: wast(),
    extensions: ["wat", "wast"],
  },
  {
    name: "XML",
    mimeTypes: ["application/xml", "text/xml"],
    mode: xml(),
    extensions: ["xml", "xsl", "xsd", "svg"],
    aliases: ["rss", "wsdl", "xsd"],
  },
  {
    name: "XQuery",
    mimeTypes: ["application/xquery"],
    mode: StreamLanguage.define(xQuery),
    extensions: ["xy", "xquery"],
  },
  {
    name: "xu",
    mimeTypes: ["text/x-xu"],
    mode: StreamLanguage.define(xu),
    extensions: ["xu"],
  },
  {
    name: "Yacas",
    mimeTypes: ["text/x-yacas"],
    mode: StreamLanguage.define(yacas),
    extensions: ["ys"],
  },
  {
    name: "YAML",
    mimeTypes: ["text/x-yaml", "text/yaml"],
    mode: StreamLanguage.define(yaml),
    extensions: ["yaml", "yml"],
    aliases: ["yml"],
  },
  {
    name: "Z80",
    mimeTypes: ["text/x-z80"],
    mode: StreamLanguage.define(z80),
    extensions: ["z80"],
  },
];

export const languagesByName = Object.fromEntries(languages.map((language) => [language.name, language]));
