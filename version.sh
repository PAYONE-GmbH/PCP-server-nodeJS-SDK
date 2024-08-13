SERVER_META_INFO_PATH='./src/utils/ServerMetaInfo.ts'
SERVER_META_INFO_TEST_PATH='./src/utils/ServerMetaInfo.test.ts'
EXAMPLE_APP_PACKAGE_JSON_PATH='./example-app/package.json'
EXAMPLE_APP_PACKAGE_JSON_LOCK_PATH='./example-app/package-lock.json'
NEW_VERSION=$npm_package_version

if [ -n "$NEW_VERSION" ]; then
    if [ -f $SERVER_META_INFO_PATH ]; then
        sed -i '' "s/NodeServerSDK\/v[0-9]*\.[0-9]*\.[0-9]*/NodeServerSDK\/v$NEW_VERSION/g" ${SERVER_META_INFO_PATH}
        sed -i '' "s/NodeServerSDK\/v[0-9]*\.[0-9]*\.[0-9]*/NodeServerSDK\/v$NEW_VERSION/g" ${SERVER_META_INFO_TEST_PATH}
        sed -i '' "s/\"pcp-server-nodejs-sdk\": \"[0-9]*\.[0-9]*\.[0-9]*\"/\"pcp-server-nodejs-sdk\": \"$NEW_VERSION\"/g" ${EXAMPLE_APP_PACKAGE_JSON_PATH}
        sed -i '' "s/\"pcp-server-nodejs-sdk\": \"[0-9]*\.[0-9]*\.[0-9]*\"/\"pcp-server-nodejs-sdk\": \"$NEW_VERSION\"/g" ${EXAMPLE_APP_PACKAGE_JSON_LOCK_PATH}

        git add $SERVER_META_INFO_PATH
        echo "Updated $SERVER_META_INFO_PATH with version $NEW_VERSION"
        git add $SERVER_META_INFO_TEST_PATH
        echo "Updated $SERVER_META_INFO_TEST_PATH with version $NEW_VERSION"
        git add $EXAMPLE_APP_PACKAGE_JSON_PATH
        echo "Updated $EXAMPLE_APP_PACKAGE_JSON_PATH with version $NEW_VERSION"
        git add $EXAMPLE_APP_PACKAGE_JSON_LOCK_PATH
        echo "Updated $EXAMPLE_APP_PACKAGE_JSON_LOCK_PATH with version $NEW_VERSION"

    else
        echo "Could not find $SERVER_META_INFO_PATH"
        exit 1
    fi
    npm run changelog
    git add CHANGELOG.md
    echo "Updated CHANGELOG.md"

else
    echo "Script can only be run as npm version hook"
fi
