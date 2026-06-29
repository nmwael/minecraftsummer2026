#!/usr/bin/env bash
set -euo pipefail

JAR="neoforge-26.1.2.74.jar"
MEMORY="${1:-4G}"

if [ ! -f "$JAR" ]; then
  echo "Server jar not found. Run setup-server.sh first."
  exit 1
fi

exec java -Xms"$MEMORY" -Xmx"$MEMORY" \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -jar "$JAR" --nogui