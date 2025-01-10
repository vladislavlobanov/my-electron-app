#!/bin/bash

# Variables
APP_NAME="my-electron-app"
DMG_FILE="out/make/my-electron-app-1.0.0-arm64.dmg"
MOUNT_DIR="/Volumes/$APP_NAME"

# Step 2: Mount the DMG
echo "Mounting DMG..."
hdiutil attach $DMG_FILE -nobrowse -quiet

# Step 3: Copy the app to Applications
echo "Copying app to Applications..."
cp -R "$MOUNT_DIR/$APP_NAME.app" /Applications/

# Step 4: Unmount the DMG
echo "Unmounting DMG..."
hdiutil detach "$MOUNT_DIR" -quiet

# Step 5: Verify the app exists
if [ -d "/Applications/$APP_NAME.app" ]; then
  echo "$APP_NAME installed successfully!"
else
  echo "Installation failed!"
  exit 1
fi

# Step 6: Launch the app
echo "Launching $APP_NAME..."
open "/Applications/$APP_NAME.app"

echo "Done."
