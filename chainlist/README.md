# ChainList Application

This application was created via unboxing a new project via `truffle unbox chainskills/chainskills-box`.

# Setup

Upload the contracts to ganache:

    > truffle migrate --reset --compile-all --network ganache

Run the local `liteserver` development server via `yarn dev` for front-end hot reloading. This starts a local
server on on http://localhost:3000. (Smart contract changes must be manually recompiled and migrated.)
