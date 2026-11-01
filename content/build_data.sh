#!/bin/bash
# Build all course banks into $1 (default web/public/data).
set -e
cd "$(dirname "$0")"
OUT=${1:-web/public/data}; TMP=$(mktemp -d)
node gen4.js $TMP --dump
python3 pinyin.py $TMP/M_zh.json >/dev/null && python3 -c "import json,sys; json.dump(json.load(open('$TMP/M_zh.json'))['py'],open('x/py_zh.json','w'),ensure_ascii=False)"
[ -f $TMP/M_ja.json ] && python3 romaji.py $TMP/M_ja.json
rm -rf $TMP
node gen4.js $OUT
