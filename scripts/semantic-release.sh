#!/bin/bash

sudo chown -R travis:travis /home/travis/
git config --replace-all remote.origin.fetch +refs/heads/*:refs/remotes/origin/*
git fetch --tags
yarn install
yarn run semantic-release