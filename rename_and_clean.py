import os

# Paths
wback_src = "media__1779814128059.png"
wback_dest = "wback.png"

# Rename the Swagger UI screenshot to wback.png
if os.path.exists(wback_src):
    if os.path.exists(wback_dest):
        os.remove(wback_dest)
    os.rename(wback_src, wback_dest)
    print(f"Renamed {wback_src} to {wback_dest}")

# Clean up other temporary files
to_delete = [
    "media__1779813891501.png",
    "media__1779814157567.png",
    "check_images.py",
    "copy_media.py"
]

for f in to_delete:
    if os.path.exists(f):
        os.remove(f)
        print(f"Deleted {f}")
