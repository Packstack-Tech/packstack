#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
shift
cmd="$@"

while ! nc -z $host 5432; do sleep 10; done;

>&2 echo "Postgres is up - executing command"
exec $cmd