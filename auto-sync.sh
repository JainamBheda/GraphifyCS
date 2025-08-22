while true
do
  git add .
  git commit -m "Auto-commit at $(date) by Jainam Bheda"
  git push origin main
  sleep 60   # wait 1 min
done