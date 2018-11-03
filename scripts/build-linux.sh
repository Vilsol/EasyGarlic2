docker run --rm \
    --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS|APPVEYOR_|CSC_|_TOKEN|_KEY|AWS_|STRIP|BUILD_') \
    -v ${PWD}:/project \
    electronuserland/builder:wine \
    /bin/bash -c "yarn --link-duplicates --pure-lockfile && yarn run preelectron-pack && yarn run electron-pack-docker"