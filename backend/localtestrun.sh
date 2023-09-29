#!/usr/bin/env bash

set -e

export DATABASE_URL="mysql://root:pass@127.0.0.1:3306/test"

npx dbmate drop # drop the test database
npx dbmate --no-dump-schema up # run DB migrations
mysql -h 127.0.0.1 -u root -ppass test < ./db/testdata/file.sql # insert test data
npm run test # run tests
