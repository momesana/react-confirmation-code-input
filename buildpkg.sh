#!/usr/bin/env bash

set -eux

rm -rf ./es ./lib 
pnpm i
pnpm build
pnpm build-esm
pnpm generate-types
pnpm pack --pack-destination /tmp/

