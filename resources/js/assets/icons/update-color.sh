#/bin/sh
COLOR=currentColor
sed -i -E 's/fill\="[^"]+"//g' *.svg
sed -i "s/<path/<path fill=\"$COLOR\"/g" *.svg
