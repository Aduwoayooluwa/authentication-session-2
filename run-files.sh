#!/bin/bash
echo "---- Starting Server ----"

cd server
npm run dev &
SERVER_PID=$!

echo "---- Starting frontend ----"

cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "Application started successfully"
echo "Press Ctrl+C to stop all processes"

trap "kill $SERVER_PID $FRONTEND_PID; exit" INT

# Wait forever
wait /,.mn