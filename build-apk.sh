#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
if [ -z "${ANDROID_HOME:-}" ]; then
  if [ -d "$HOME/android-sdk" ]; then export ANDROID_HOME="$HOME/android-sdk"; fi
fi
if [ -z "${ANDROID_HOME:-}" ] || [ ! -f "$ANDROID_HOME/platforms/android-36/android.jar" ]; then
  echo "HATA: Android SDK 36 bulunamadı. ANDROID_HOME yolunu kontrol et." >&2
  exit 1
fi
if [ -d "$PREFIX/lib/jvm/java-17-openjdk" ]; then
  export JAVA_HOME="$PREFIX/lib/jvm/java-17-openjdk"
  export PATH="$JAVA_HOME/bin:$PATH"
fi
hash -r
gradle --no-daemon assembleDebug
APK="app/build/outputs/apk/debug/app-debug.apk"
if [ ! -f "$APK" ]; then echo "HATA: APK oluşmadı." >&2; exit 2; fi
mkdir -p "$HOME/storage/downloads"
cp "$APK" "$HOME/storage/downloads/BlokUstasi.apk"
echo "APK HAZIR: İndirilenler/BlokUstasi.apk"
