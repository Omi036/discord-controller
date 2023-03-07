#!/bin/bash
npm run start &
npm run dev --prefix "./web"
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT