#!/usr/bin/env bash
# Transcodes the source gym clips into web-ready, muted, looping assets.
#
# For each clip we emit:
#   <name>-1280.mp4 / .webm   desktop
#   <name>-720.mp4  / .webm   mobile + reduced-data
#   <name>-poster.jpg         first-frame poster (also the lazy-load placeholder)
#
# Audio is stripped: these are ambient background loops that autoplay, which
# browsers only permit while muted. Dropping the track also saves ~15% bytes.
set -euo pipefail

SRC="C:/Users/Dhanraz/Downloads"
OUT="public/media"
mkdir -p "$OUT"

transcode() {
  local src="$1" name="$2" start="$3" dur="$4"

  for w in 1280 720; do
    # -movflags +faststart puts the moov atom first so playback can begin
    # before the whole file lands.
    ffmpeg -y -loglevel error -ss "$start" -t "$dur" -i "$src" \
      -an -vf "scale=${w}:-2:flags=lanczos" \
      -c:v libx264 -profile:v high -preset slow -crf 26 -pix_fmt yuv420p \
      -movflags +faststart "$OUT/${name}-${w}.mp4"

    ffmpeg -y -loglevel error -ss "$start" -t "$dur" -i "$src" \
      -an -vf "scale=${w}:-2:flags=lanczos" \
      -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
      "$OUT/${name}-${w}.webm"
  done

  ffmpeg -y -loglevel error -ss "$start" -i "$src" -frames:v 1 \
    -vf "scale=1280:-2:flags=lanczos" -q:v 6 "$OUT/${name}-poster.jpg"

  echo "  done: $name"
}

echo "transcoding..."
transcode "$SRC/Man_working_out_leg_press_202608021204.mp4"    strength 0   3.6
transcode "$SRC/Man_using_weight_machine_gym_202608021203.mp4" machines 0.5 9.0
transcode "$SRC/People_in_dance_class_studio_202608021203.mp4" classes  0.5 9.0

echo "--- output ---"
ls -la "$OUT"
