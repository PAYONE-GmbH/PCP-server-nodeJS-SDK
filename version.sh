SERVER_META_INFO_PATH='./src/utils/ServerMetaInfo.ts'
SERVER_META_INFO_TEST_PATH='./src/utils/ServerMetaInfo.test.ts'
NEW_VERSION=$npm_package_version

if [ -n "$NEW_VERSION" ]; then
    if [ -f $SERVER_META_INFO_PATH ]; then
        sed -i '' "s/NodeServerSDK\/v[0-9]*\.[0-9]*\.[0-9]*/NodeServerSDK\/v$NEW_VERSION/g" ${SERVER_META_INFO_PATH}
        sed -i '' "s/NodeServerSDK\/v[0-9]*\.[0-9]*\.[0-9]*/NodeServerSDK\/v$NEW_VERSION/g" ${SERVER_META_INFO_TEST_PATH}
        git add $SERVER_META_INFO_PATH
        echo "Updated $SERVER_META_INFO_PATH with version $NEW_VERSION"
    else
        echo "Could not find $SERVER_META_INFO_PATH"
        exit 1
    fi

else
    echo "Script can only be run as npm version hook"
fi
