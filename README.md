# socket-io-tutorial
socket.io로 구현한 채팅 어플리케이션 튜토리얼입니다.

서버나 클라이언트의 접속이 끊길 시 대화를 이어갈 수 있게 구현되어 있습니다.

node-cluster와 socket.io의 어댑터를 이용해 cpu의 코어수 만큼 scale out 환경의 서버를 띄우고 통신할 수 있습니다.

https://socket.io/docs/v4/tutorial/introduction

## Stack
### Server
- typescript
- socket.io
- sqlite
### client
- html
- socket.io
