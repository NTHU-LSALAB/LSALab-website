kill -9 $(lsof -t -i:1337)
nohup yarn start > /dev/null 2>&1 &
